import * as dotenv from 'dotenv';

dotenv.config();

const serverPort = process.env.SERVER_PORT;

export { serverPort };
