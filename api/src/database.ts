import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config';

(async () => {
	try {
		const mongooseOptions: ConnectionOptions = {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		};
		const db = await mongoose.connect(
			`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.wslst.mongodb.net/${config.MONGO_DATABASE}`,
			mongooseOptions
		);

		console.log('Database is connected to:', db.connection.name);
	} catch (error) {
		console.error(error);
	}
})();
