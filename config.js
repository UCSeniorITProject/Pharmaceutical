  
module.exports = {
  db: {
    host: process.env.dbHost || 'localhost',
    dialect: 'postgres',
    maxConnectionSockets: 10,
    minConnectionSockets: 5,
    connectionAcquisitionRate: 30000,
    databaseName: process.env.dbName || 'safemeds',
    username: process.env.adminUser || 'postgres',
    password: process.env.password || 'Sam42182@@',
    connectionIdleRate: 10000,
    port: 5432,
    //DO NOT TURN THIS TO TRUE YOU WILL DROP EVERY TABLE
    forceTableCreation: true,
    shouldLog: true,
	},
  shouldFastifyLog: true,
  serverHost:  process.env.serverAddress || '0.0.0.0' ,
  port: process.env.port || '3003',
};
