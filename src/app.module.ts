import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [UserModule, AuthModule,ConfigModule.forRoot(
    {
      isGlobal: true,
      envFilePath: '.env',
    }
  ),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'boilerplate_test',
    entities: [
        User
    ],
    synchronize: true,
    logging: ['query', 'error', 'schema'], 
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
