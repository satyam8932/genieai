import { auth } from "@clerk/nextjs/server";

/**
 * Bypassed version of the checkSubscription function.
 * Always returns true, indicating the user has a valid subscription.
 * @returns A boolean indicating if the user's subscription is valid (always true).
 */
export const checkSubscription = async (): Promise<boolean> => {
    // Retrieve the user ID from the authentication session
    const { userId } = await auth();
    if (!userId) {
        return false;  // Return false if the user is not authenticated
    }

    // Bypass subscription check and always return true
    return true;
};
