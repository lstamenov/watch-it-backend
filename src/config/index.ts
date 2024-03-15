import * as dotenv from 'dotenv';

dotenv.config();

const serverPort = process.env.SERVER_PORT;
const dbType = process.env.DB_TYPE;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;
const movieUrl = process.env.MOVIE_URL;
const showUrl = process.env.SHOW_URL;

export { serverPort, dbType, dbHost, dbPort, dbUsername, dbPassword, dbName, apiKey, apiUrl, movieUrl, showUrl };
