import Stripe from 'stripe';

// Initialize the Stripe client with your API key from environment variables
export const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
    // Define the API version to use; this ensures compatibility with Stripe's API
    apiVersion: '2024-06-20',
    // Optional: enable the latest features and ensure compatibility with new updates
    // This is recommended for production to maintain consistency with Stripe's latest API
    typescript: true,
});
