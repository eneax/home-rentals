# Home Rentals

A full stack application built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), [NextAuth](https://next-auth.js.org), [Prisma](https://www.prisma.io) and [MongoDB](https://www.mongodb.com/atlas/database).

## Environment Variables

Create a `.env` file in your root directory:

```js
DATABASE_URL=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

## Getting Started

Run this project locally:

```bash
npm i

npx prisma db push

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
