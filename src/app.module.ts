import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      // Otherwise, we need to add each entity to the TypeOrmModule.forFeature() array
      autoLoadEntities: true,
      // This feature is not recommended for production
      synchronize: true,
    }),
    UsersModule,
    ImagesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
