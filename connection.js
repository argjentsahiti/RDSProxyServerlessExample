const sequelize = require('sequelize')

module.exports.database = new sequelize.Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        define: {
            charset: 'utf8',
            collate: 'utf8mb4_bin',
        },
        dialectOptions: {
            ssl: 'Amazon RDS'
        },
        pool: {
            max: 6,
            min: 0,
            idle: 20 * 1000, // 20 seconds
            acquire: Number(process.env.CONNECTION_ACQUIRE_TIME) * 1000,
        },
    },
);