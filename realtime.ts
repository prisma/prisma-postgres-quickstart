import { PrismaClient } from "@prisma/client";
import { withPulse } from "@prisma/extension-pulse/node";

const prisma = new PrismaClient().$extends(
  withPulse({ apiKey: process.env.PULSE_API_KEY as string })
);

/**
 *
 * This function opens a stream on your database to capture any changes to the `User` table.
 * It then logs the event data to the console.
 */ 
async function subscribeToUsers() {
  const stream = await prisma.user.stream({ name: "user-stream" });

  for await (const event of stream) {
    console.log("just received an event:", event);
  }
}

async function main() {
  console.log(`Opening a stream on your database`);
  await subscribeToUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
