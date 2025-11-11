import { Module } from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

// @Module({
// 	imports: [
// 		MongooseModule.forRootAsync({
// 			useFactory: async () => ({
// 				uri: process.env.NODE_ENV === 'production' ? process.env.MONGO_PROD_URI : process.env.MONGO_DEV_URI,

// 			}),
// 		}),
// 	],
// 	exports: [MongooseModule],
// }) 
// export class DatabaseModule {
// 	constructor(@InjectConnection() private readonly connection: Connection) {
// 		if (connection.readyState === 1) {
// 			console.log(
// 				`MongoDB is connected into ${process.env.NODE_ENV === 'production' ? 'production' : 'development'} db`,
// 			);
// 		} else {
// 			console.log('Database is not connected');
// 		}
// 	}
// }

@Module({
	imports: [
		MongooseModule.forRootAsync({
			useFactory: async () => {
				const isProduction = process.env.NODE_ENV === 'production';
				const uri = isProduction ? process.env.MONGO_PROD_URI : process.env.MONGO_DEV_URI;

				console.log(`🔌 Connecting to MongoDB (${isProduction ? 'production' : 'development'})...`);

				return {
					uri,
					// CRITICAL: These options prevent undefined returns on Render
					retryAttempts: 5,
					retryDelay: 3000,
					
					// Connection factory with proper event handling
					connectionFactory: (connection: Connection) => {
						connection.on('connected', () => {
							console.log('✅ MongoDB connected successfully');
						});

						connection.on('error', (err) => {
							console.error('❌ MongoDB connection error:', err.message);
						});

						connection.on('disconnected', () => {
							console.warn('⚠️  MongoDB disconnected - attempting reconnect...');
						});

						connection.on('reconnected', () => {
							console.log('🔄 MongoDB reconnected');
						});

						return connection;
					},

					// Connection pool settings for production stability
					maxPoolSize: 10,
					minPoolSize: 2,
					
					// Timeout settings to prevent hanging queries
					socketTimeoutMS: 45000,
					serverSelectionTimeoutMS: 10000,
					connectTimeoutMS: 10000,
					
					// Keep connection alive
					heartbeatFrequencyMS: 2000,
					
					// Auto-reconnect
					autoCreate: true,
					autoIndex: isProduction ? false : true, // Disable in production for performance
					
					// Buffer commands until connection is established
					bufferCommands: true,
					bufferMaxEntries: 0,
				};
			},
		}),
	],
	exports: [MongooseModule],
})
export class DatabaseModule {
	constructor(@InjectConnection() private readonly connection: Connection) {
		// Wait for actual connection before logging
		this.connection.asPromise()
			.then(() => {
				const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
				console.log(`✅ MongoDB is ready (${env} db)`);
				console.log(`   ReadyState: ${this.getReadyStateMessage(this.connection.readyState)}`);
				console.log(`   Database: ${this.connection.db?.databaseName || 'unknown'}`);
			})
			.catch((err) => {
				console.error('❌ MongoDB connection failed:', err.message);
				// Don't exit - let retry logic handle it
			});
	}

	private getReadyStateMessage(state: number): string {
		const states = {
			0: '0 = disconnected',
			1: '1 = connected',
			2: '2 = connecting',
			3: '3 = disconnecting',
		};
		return states[state] || `unknown (${state})`;
	}
}
