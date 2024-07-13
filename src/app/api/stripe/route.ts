// /api/stripe

import { db } from '@/lib/db';
import { userSubcriptions } from '@/lib/db/schema';
import { stripe } from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// Define the return URL after Stripe payment or services
const returnUrl = `${process.env.NEXT_BASE_URL}/`;

/**
 * Handle GET requests to manage Stripe subscriptions.
 * @returns A JSON response with the Stripe checkout or billing portal URL.
 */
export async function GET() {
  try {
    // Authenticate the user and extract userId
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Fetch the user's subscription data from the database
    const [userSubscription] = await db.select().from(userSubcriptions).where(eq(userSubcriptions.userId, userId));

    if (userSubscription && userSubscription.stripeCustomerId) {
      // If the user already has a subscription, redirect to the billing portal
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: returnUrl,  // Redirect to a specific page after managing the subscription
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    // If the user does not have a subscription, create a new checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: returnUrl,
      cancel_url: returnUrl,
      payment_method_types: ['card'],  // Payment methods accepted
      mode: 'subscription',  // Subscription payment mode
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'GenieAI',
              description: 'GenieAI Pro Version!',
            },
            unit_amount: 2000,  // $20 per month
            recurring: {
              interval: 'month',  // Subscription interval
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
