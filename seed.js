require('dotenv').config();
const { connectDB } = require('./src/db');
const Bouquet = require('./src/models/Bouquet');
const data = require('./src/data/db.json');

const seed = async () => {
  await connectDB();

  const count = await Bouquet.count();
  if (count > 0) {
    console.log(`Database already has ${count} bouquets. Skipping seed.`);
    process.exit(0);
  }

  const bouquets = data.bouquets.map(b => ({
    title: b.title,
    description: b.description,
    price: b.price,
    photoURL: b.image,
    favorite: false,
  }));

  await Bouquet.bulkCreate(bouquets);
  console.log(`Seeded ${bouquets.length} bouquets`);
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});