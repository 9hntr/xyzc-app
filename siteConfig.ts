export const siteConfig = {
  domain: process.env.NEXT_PUBLIC_DOMAIN as string,
  env: process.env.NODE_ENV as string,
  apiUrl: process.env.API as string,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
  appName: process.env.APP_NAME as string,
  exLinks: {
    githubProfile: "//github.com/kovltsx",
    sourceCode: "//github.com/kovltsx/minimalistic-crowdfunding-app",
  },
  testingCredentials: {
    email: process.env.NEXT_PUBLIC_TESTER_EMAIL,
    password: process.env.NEXT_PUBLIC_TESTER_PASSW,
  },
  nextAuth: {
    secret: process.env.NEXTAUTH_SECRET as string,
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  db: {
    supabase: {
      projectUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string,
      projectKey: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_KEY as string,
    },
  },
  storage: {
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
      apiKey: process.env.CLOUDINARY_API_KEY as string,
      apiSecret: process.env.CLOUDINARY_API_SECRET as string,
    },
  },
};
