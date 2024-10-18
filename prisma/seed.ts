import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const postTitles = [
  "Accelerate helps developers build for global audiences at scale",
  "Introducing Prisma Nuxt: Simplifying Data Management for Nuxt Apps",
  "Organize Your Prisma Schema into Multiple Files in v5.15",
  "Saving Black Friday With Connection Pooling",
  "Join the Prisma Insider Program and Shape the Future of our Products",
  "Prisma Pulse: Introducing Delivery Guarantees for Database Change Events",
  "Speed and Savings: Caching Database Queries with Prisma Accelerate",
  "Bringing Prisma ORM to React Native and Expo",
  "Explore insights and improve app performance with Prisma Optimize",
  "Introducing our Build, Fortify, Grow (BFG) Framework",
  "Increase Database Security With Static IP Support in Prisma Accelerate",
  "Build Applications at the Edge with Prisma ORM & Cloudflare D1 (Preview)",
  "Prisma ORM Support for Edge Functions is Now in Preview",
  "Prisma Pulse now available in GA",
  "Introducing Platform Environments",
  "Prisma ORM Now Lets You Choose the Best Join Strategy (Preview)",
  "A Business Case for Extended ESOP Exercise Windows",
  "Data DX: The name for Prisma’s developer experience philosophy",
  "We Transitioned Prisma Accelerate to IPv6 Without Anyone Noticing",
  "Formbricks and Prisma Accelerate: Solving scalability together",
];

async function main() {
  const alice = await prisma.user.create({
    data: {
      email: "alice@prisma.io",
      name: "alice",
      posts: {
        createMany: {
          data: postTitles.map((title) => ({ title })),
        },
      },
    },
    include: {
      posts: true,
    },
  });

  console.log(`Created ${alice.name} with ${alice.posts.length} posts`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });