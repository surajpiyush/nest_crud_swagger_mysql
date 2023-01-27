// import { Module } from '@nestjs/common';
// import { UserModule } from './user/user.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigService, ConfigModule } from '@nestjs/config';
// import { User } from './user/entities/user.entity';
// import { MulterModule } from '@nestjs/platform-express/multer';
// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'localhost',
//       //port: 3300,
//       username: 'root',
//       password: 'piyush9648@',
//       database: 'mydata',
//        entities: [User],
//       synchronize: true,
//       logging: true,

//     }),

//     UserModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { User } from './user/entities/user.entity';
import { AppController } from './app.controller';
import 'reflect-metadata'
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ MulterModule.register({
        dest: './uploads',
      }),
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.local.env',
          //envFilePath:'.prod.env',
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        // port:+configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNC'),
        entities: [__dirname + '/**/*.entity{.ts,.js}',User],
        logging: true,
        
      }),
      inject: [ConfigService],
      
    }),
   
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
