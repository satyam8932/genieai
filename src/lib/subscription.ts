import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { userSubcriptions } from "./db/schema";
import { eq } from "drizzle-orm";

// Define one day in milliseconds
const DAY_IN_MS = 1000 * 60 * 60 * 24;

/**
 * Check if the current user has a valid subscription.
 * @returns A boolean indicating if the user's subscription is valid.
 */
export const checkSubscription = async (): Promise<boolean> => {
    // Retrieve the user ID from the authentication session
    const { userId } = await auth();
    if (!userId) {
        return false;  // Return false if the user is not authenticated
    }

    // Query the user's subscription data from the database
    const _userSubscriptions = await db
        .select()
        .from(userSubcriptions)
        .where(eq(userSubcriptions.userId, userId));

    if (!_userSubscriptions[0]) {
        return false;  // Return false if no subscription is found for the user
    }

    // Extract the subscription details from the query result
    const userSubscription = _userSubscriptions[0];

    // Check if the subscription is valid based on the current period end date
    const isValid =
        userSubscription.stripePriceId &&  // Ensure there is a Stripe price ID associated with the subscription
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >  // Check if the current period end date + 1 day is in the future
        Date.now();

    return !!isValid;  // Return true if the subscription is valid, otherwise false
};
