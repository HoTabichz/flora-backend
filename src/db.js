const { Sequelize } = require('sequelize');

const dbUrl = process.env.DATABASE_URL || 'postgresql://flora_db_1o67_user:wqCtcsw4PFusRfnszifG0qQgpRJmepho@dpg-d95vufrtqb8s7385i1vg-a.frankfurt-postgres.render.com/flora_db_1o67';
const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };