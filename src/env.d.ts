declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    DATABASE_PROVIDER: 'sqlite' | 'postgresql' | 'mysql' | 'sqlserver'
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    STRIPE_SECRET_KEY?: string
    STRIPE_WEBHOOK_SECRET?: string
    CLOUDINARY_URL?: string
    RESEND_API_KEY?: string
    SENTRY_DSN?: string
    NEXT_PUBLIC_SENTRY_DSN?: string
  }
}


