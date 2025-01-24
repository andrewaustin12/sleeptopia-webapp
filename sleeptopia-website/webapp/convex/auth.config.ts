/**
 * Authentication configuration for Clerk integration with Convex
 * 
 * To get these values:
 * 1. Go to your Clerk Dashboard (https://dashboard.clerk.dev)
 * 2. Select your application
 * 3. Go to "JWT Templates" in the sidebar
 * 4. Select the "convex" template
 * 5. Leave the Name as "convex"
 * 6. The domain shown here should match your "Issuer" URL from Clerk
 * 7. The applicationID should remain "convex" to work with Clerk's JWT template
 * 
 * For more details, see Clerk's documentation on Convex integration:
 * https://clerk.com/docs/integrations/databases/convex
 */
export default {
  providers: [
    {
      domain: "https://enjoyed-squid-59.clerk.accounts.dev",
      applicationID: "convex",
    },
  ]
};