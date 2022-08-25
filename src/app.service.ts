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

  private checkCorrectSequence(arrOfNumbers: number[]){
    for(let i = 2; i < arrOfNumbers.length; i++){
      if(
        arrOfNumbers[i] == arrOfNumbers[i-1] + arrOfNumbers[i - 2]
      ) continue
      else return false
    }
    return true
  }

  private reverseString(arrOfNumbers: number[]) {
    let reverseStr = ''
    for(let i = arrOfNumbers.length - 1; i >= 0; i--){
      reverseStr += arrOfNumbers[i]
    }
    console.log(reverseStr,'reverstr')
    return reverseStr
  }

  private async saveToDB(string: string, isCorrectSequence: boolean){
    const createLog = new this.logModel({string, isCorrectSequence, date: Date.now()})

   const createdLog = await createLog.save()
    console.log(createdLog, 'createLog')
  }

    async getAllFibSequences() {
      const allValues = await this.logModel.find()
      console.log(allValues)
      return allValues
    }

    async getAllCorrectSequences() {
      const allValues = await this.logModel.find()
      console.log(allValues)
      const positiveValues = allValues.filter(item => item.isCorrectSequence = true)
      return positiveValues
}
}
