import {Controller, Get, Post, Query} from '@nestjs/common';
import { sequenceEqual } from 'rxjs';
import { AppService } from './app.service';

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
  async getAllFibSequences(){
    return  this.appService.getAllFibSequences()
    
  }

  @Get('correct')
async getAllCorrectSequences(){
    return await this.appService.getAllCorrectSequences()
    
  }

}

