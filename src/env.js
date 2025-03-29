// import { createEnv } from "@t3-oss/env-nextjs";
// import { z } from "zod";

// export const env = createEnv({
//   server: {
//     DATABASE_URL: z.string().default('your_database_url'),
//     NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
//     NEXTAUTH_SECRET: z.string().default('your_nextauth_secret'),
//     NEXTAUTH_URL: z.string().default('your_nextauth_url'),
//     DISCORD_CLIENT_ID: z.string().default('your_discord_client_id'),
//     DISCORD_CLIENT_SECRET: z.string().default('your_discord_client_secret'),
//   },
//   client: {
//     // Define client-side variables if needed
//   },
//   runtimeEnv: {
//     DATABASE_URL: process.env.DATABASE_URL ?? 'your_database_url',
//     NODE_ENV: process.env.NODE_ENV ?? 'development',
//     NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? 'your_nextauth_secret',
//     NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? 'your_nextauth_url',
//     DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID ?? 'your_discord_client_id',
//     DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET ?? 'your_discord_client_secret',
//   },
//   skipValidation: !!process.env.SKIP_ENV_VALIDATION,
//   emptyStringAsUndefined: true,
// });

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().default('your_database_url'),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEXTAUTH_SECRET: z.string().default('your_nextauth_secret'),
    NEXTAUTH_URL: z.string().default('your_nextauth_url'),
    DISCORD_CLIENT_ID: z.string().default('your_discord_client_id'),
    DISCORD_CLIENT_SECRET: z.string().default('your_discord_client_secret'),
    CLOUDINARY_CLOUD_NAME: z.string().default('your_cloudinary_cloud_name'),
    CLOUDINARY_API_KEY: z.string().default('your_cloudinary_api_key'),
    CLOUDINARY_API_SECRET: z.string().default('your_cloudinary_api_secret'),
    EMAIL_HOST: z.string().default('your_email_host'),
    EMAIL_PORT: z.number().default(587), // Default SMTP port
    EMAIL_USER: z.string().default('your_email_user'),
    EMAIL_PASS: z.string().default('your_email_password'),
  },
  client: {
    // Define client-side variables if needed
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL ?? 'your_database_url',
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? 'your_nextauth_secret',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? 'your_nextauth_url',
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID ?? 'your_discord_client_id',
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET ?? 'your_discord_client_secret',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? 'your_cloudinary_cloud_name',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ?? 'your_cloudinary_api_key',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ?? 'your_cloudinary_api_secret',
    EMAIL_HOST: process.env.EMAIL_HOST ?? 'your_email_host',
    EMAIL_PORT: Number(process.env.EMAIL_PORT) || 587, // Converts to number with default
    EMAIL_USER: process.env.EMAIL_USER ?? 'your_email_user',
    EMAIL_PASS: process.env.EMAIL_PASS ?? 'your_email_password',
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
