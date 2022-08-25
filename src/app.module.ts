import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as mongoose from "mongoose";
import {Connection} from "mongoose";
import {LogSchema} from "./log.schema";
import {ConfigModule} from "@nestjs/config";


export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
       mongoose.connect(process.env.MONGODB_CONNECT)

  },
];

export const logsProviders = [
  {
    provide: 'LOG_MODEL',
    useFactory: (connection: Connection) => connection.model('Log', LogSchema),
    inject: ['DATABASE_CONNECTION'],
  }]

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
  controllers: [AppController],
  providers: [AppService,...databaseProviders,...logsProviders],
})
export class AppModule {}
