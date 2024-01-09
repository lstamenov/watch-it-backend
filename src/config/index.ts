import * as dotenv from 'dotenv';

dotenv.config();

const serverPort = process.env.SERVER_PORT;
const dbType = process.env.DB_TYPE;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

export { serverPort, dbType, dbHost, dbPort, dbUsername, dbPassword, dbName };
