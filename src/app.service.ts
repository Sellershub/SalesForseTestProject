import {Inject, Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {LogInterface} from "./log.interface";

@Injectable()
export class AppService {
  constructor(
    @Inject('LOG_MODEL')
    private logModel: Model<LogInterface>,
  ) {
  }

  public async detectFibSequence(str: string){
    const arrOfNumbers = str.split(',').map(item => +item)
    const isCorrectSequence = this.checkCorrectSequence(arrOfNumbers)
    let reverseStr;
    if(isCorrectSequence){
      reverseStr = this.reverseString(arrOfNumbers)
    }
    await this.saveToDB(
      isCorrectSequence ? reverseStr : str,
      isCorrectSequence
    )

  }

  private checkCorrectSequence(arrOfNumbers: number[]): boolean{
    for(let i = 2; i < arrOfNumbers.length; i++){
      if(
        arrOfNumbers[i] == arrOfNumbers[i-1] + arrOfNumbers[i - 2]
      ) continue
      else return false
    }
    return true
  }

  private reverseString(arrOfNumbers: number[]): string  {
    let reverseStr = ''
    for(let i = arrOfNumbers.length - 1; i >= 0; i--){
      reverseStr += arrOfNumbers[i]
    }
    return reverseStr
  }

  private async saveToDB(string: string, isCorrectSequence: boolean): Promise<LogInterface>{
    const createdLog = new this.logModel({string, isCorrectSequence, date: Date.now()})
    console.log(createdLog, 'createdLog')
    return createdLog.save()
  }
    async getAllFibSequences(): Promise<LogInterface[]>{
      return this.logModel.find()
    }

    async getAllCorrectSequences(): Promise<LogInterface[]> {
      const allValues = await this.logModel.find()
      const positiveValues = allValues.filter(item => item.isCorrectSequence = true)
      return positiveValues
}
}
