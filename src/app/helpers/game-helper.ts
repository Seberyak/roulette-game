import { Injectable } from '@nestjs/common';
import { BetInfo } from '../dto/bet-info';
import { CommonResDto } from '../../common/common-res.dto';

@Injectable()
export class GameHelper {
  validateBalance(balance: number, bets: BetInfo[]): CommonResDto {
    if (balance === undefined) {
      return { success: false, message: 'Balance is undefined' };
    }
    const balanceIsEnough = this.checkIfBalanceIsEnough(balance, bets);
    if (!balanceIsEnough) {
      return { success: false, message: 'Balance is not enough' };
    }
    return { success: true, message: 'OK' };
  }

  public sumBets(bets: BetInfo[]): number {
    return bets.reduce((acc, cur) => {
      if (cur.betType === 'odd') return acc + 18 * cur.betAmount;
      if (cur.betType === 'even') return acc + 19 * cur.betAmount;
      return acc + cur.betAmount;
    }, 0);
  }

  reduceBalance(balance, bets: BetInfo[]): number {
    const betsSum = this.sumBets(bets);
    return balance - betsSum;
  }

  private checkIfBalanceIsEnough(balance: number, bets: BetInfo[]): boolean {
    const betsSum = this.sumBets(bets);
    return balance >= betsSum;
  }

  getWinNumber(): number {
    return this.getRandomInt(0, 37);
  }

  private getRandomInt(min: number, max?: number): number {
    if (max === undefined) {
      max = min;
      min = 0;
    }

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getWinAmount(winNumber: number, bets: BetInfo[]): number {
    const winBets = this.getWinBets(winNumber, bets);
    return winBets.reduce((acc, cur) => acc + cur.betAmount, 0);
  }

  private getWinBets(winNumber: number, bets: BetInfo[]): BetInfo[] {
    return bets.filter((bet) => {
      if (bet.betType === 'odd') return winNumber % 2 === 1;
      if (bet.betType === 'even') return winNumber % 2 === 0;
      return winNumber === bet.betType;
    });
  }
}
