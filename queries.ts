import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());
/**
 *
 * This function queries your database as you typically would to retrieve a list of posts.
 * It then caches the result for 300 seconds with Accelerate.
 */
async function postsView(requestsCount: number) {
  for (let i = 0; i < requestsCount; i++) {
    const startTime = performance.now();
    const { info } = await prisma.post
      .findMany({
        cacheStrategy: {
          ttl: 300,
        },
      })
      .withAccelerateInfo();
    const duration = performance.now() - startTime;

    console.log(
      `Query ${i + 1}: ${duration.toFixed(2)}ms - Cache Status: ${
        info?.cacheStatus || "unknown"
      }`
    );
  }
}

async function main() {
  const requestsCount = 50; // Accelerate scales your database queries. 50 inidicates the number of requests to make to your database. You can change this number.

  console.log(`Querying your database with ${requestsCount} requests`);

  const startTime = Date.now();
  await postsView(requestsCount);
  const endTime = Date.now();

  console.log(`\nTotal execution time: ${endTime - startTime}ms`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
