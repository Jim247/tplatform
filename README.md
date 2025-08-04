This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Prisma and Supabase Integration

This project uses Prisma as an ORM and Supabase as the database provider. Below are the steps to set up, use, and push changes to the database.

---

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed.
2. **Supabase Project**: Set up a Supabase project and get the `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the Supabase dashboard.
3. **Environment Variables**: Add the following to your `.env` file:

   ```env
   NEXT_PUBLIC_DATABASE_URL=your-database-url
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

---

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Prisma:

   ```bash
   npm install prisma --save-dev
   npm install @prisma/client
   ```

3. Install Supabase client:

   ```bash
   npm install @supabase/supabase-js
   ```

---

## Setting Up Prisma

1. Initialize Prisma:

   ```bash
   npx prisma init
   ```

   This will create a `prisma` folder with a `schema.prisma` file.

2. Update the `schema.prisma` file to use your Supabase database:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("NEXT_PUBLIC_DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }
   ```

3. Push the Prisma schema to the database:

   ```bash
   npx prisma db push
   ```

4. Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

---

## Using Prisma

You can use the Prisma client in your application by importing it. Example:

```typescript
import prisma from './src/lib/prismaClient';

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## Using Supabase

You can use the Supabase client in your application by importing it. Example:

```typescript
import supabase from './src/lib/supabaseClient';

async function fetchData() {
  const { data, error } = await supabase.from('your-table').select('*');
  if (error) console.error(error);
  else console.log(data);
}

fetchData();
```

---

## Pushing Changes to the Database

1. Update your `schema.prisma` file with the new models or changes.
2. Push the changes to the database:

   ```bash
   npx prisma db push
   ```

3. Generate the updated Prisma client:

   ```bash
   npx prisma generate
   ```

---

## Additional Commands

- **Open Prisma Studio**: View and edit your database in a visual interface:

  ```bash
  npx prisma studio
  ```

- **Reset the Database**: Drop and recreate the database (use with caution):

  ```bash
  npx prisma migrate reset
  ```

---

## Troubleshooting

- Ensure your `.env` file is correctly configured.
- Check the Supabase dashboard for database connection issues.
- Refer to the [Prisma documentation](https://www.prisma.io/docs) for advanced usage.
