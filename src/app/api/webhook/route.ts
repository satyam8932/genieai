// /api/stripe-webhook/route.ts

import { db } from '@/lib/db';
import { userSubcriptions } from '@/lib/db/schema';
import { stripe } from '@/lib/stripe';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Define the Stripe webhook signature secret
const STRIPE_WEBHOOK_SIGNING_SECRET = process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string;

export async function POST(req: NextRequest) {
    // Retrieve the request body and Stripe signature header
    const body = await req.text();
    const signature = req.headers.get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        // Verify the webhook signature and construct the event
        event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SIGNING_SECRET);
    } catch (error) {
        console.error('Webhook Error:', error);
        return new NextResponse('Webhook Error', { status: 400 });
    }

    // Extract the session from the event data
    const session = event.data.object as Stripe.Checkout.Session;

    try {
        if (event.type === 'checkout.session.completed') {
            // Handle the checkout.session.completed event
            if (!session.metadata?.userId) {
                console.error('No User Id in checkout session metadata');
                return new NextResponse('No User Id', { status: 400 });
            }

            // Retrieve the subscription from Stripe
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

            // Save the subscription details to the database
            await db.insert(userSubcriptions).values({
                userId: session.metadata.userId,
                stripeCustomerId: subscription.customer as string,
                stripeSubscriptionId: subscription.id,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            });

            console.log(`Subscription ${subscription.id} created for user ${session.metadata.userId}`);
        }

        if (event.type === 'invoice.payment_succeeded') {
            // Handle the invoice.payment_succeeded event
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

            // Update the subscription details in the database
            await db.update(userSubcriptions).set({
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            }).where(eq(userSubcriptions.stripeSubscriptionId, subscription.id));

            console.log(`Invoice payment succeeded for subscription ${subscription.id}`);
        }
    } catch (error) {
        console.error('Event handling error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }

    // Respond with a success status
    return new NextResponse('Success', { status: 200 });
}
