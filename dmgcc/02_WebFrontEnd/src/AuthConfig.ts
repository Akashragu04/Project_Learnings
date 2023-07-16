import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */

export const msalConfig = {
    auth: {
        clientId: "aa66c55a-6a4d-4c22-8127-78a3d787e58a",
        authority: "https://login.microsoftonline.com/0215db1e-bf65-4021-b57f-f5ef27387e0b",
        // redirectUri: "http://localhost:3000/",
        redirectUri: "https://dmg3c-dev.izserver8.in/",
        // redirectUri: "https://dmg3c-dev.landing-demo2.izserver8.in/dmcc-admin/",

        // clientId: "56bc36a2-1d6b-4b22-a3bf-d11351622624",
        // authority: "https://login.microsoftonline.com/c62b5b8d-4235-4aed-8119-c6716db47e1c",
        // redirectUri: "https://gcc-connect.daimlertruck.com/",
        // client_secret : "g2u8Q~mH1-LTAmAovQyatpGu5mLiE-IgdCA2GcD3"
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 ornpmco Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        // console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        // console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        // console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        // console.warn(message);		
                        return;		
                }	
            }	
        }	
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    // scopes: ["User.Read","openid","profile","offline_access","email"],
    // scopes: [ "https://tbdirstaging.net/access_as_user", "email", "profile", "openid"]
    scopes: [ "api://d6dc2c70-31ed-45ea-84ad-c95226375a29/access_as_user"]
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = { 
    graphMeEndpoint: "https://graph.microsoft.com/v1.0//me"
};
