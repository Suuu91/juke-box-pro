const prisma = require ("../prisma")
const {faker} = require ("@faker-js/faker")

const seed = async(numTrack = 20) => {
  const tracks = Array.from({length: numTrack}, () => ({
    name: faker.music.songName(),
  }));
  await prisma.track.createMany({data: tracks});
};

seed()
  .then (async () => await prisma.$disconnect())
  .catch (async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });