import dotenv from 'dotenv';
dotenv.config()

export default {
	PORT: process.env.PORT,
	MONGO_USER: process.env.MONGO_USER,
	MONGO_PASSWORD: process.env.MONGO_PASSWORD,
	MONGO_DATABASE: process.env.MONGO_DATABASE,
};
