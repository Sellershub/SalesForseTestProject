import {Controller, Get, Post, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {LogInterface} from "./log.interface";


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async detectFibSequence(
    @Query('string') query: string
  ) {
    await this.appService.detectFibSequence(query);
    return 'created a new object in database with query' + query
  }

  @Get('all')
  async getAllFibSequences(): Promise<LogInterface[]>{
    return  this.appService.getAllFibSequences()
    
  }

  @Get('correct')
async getAllCorrectSequences(): Promise<LogInterface[]>{
    return await this.appService.getAllCorrectSequences()
    
  }

}

