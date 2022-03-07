import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CommonResDto } from '../common/common-res.dto';
import { Session } from 'express-session';
import { SpinReqDto } from './dto/spin-req.dto';
import { GameHelper } from './helpers/game-helper';
import { SpinResDto } from './dto/spin-res.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
    private readonly gameHelper: GameHelper
  ) {}

  public async getSessionBalance(session: Session): Promise<number> {
    const balance = session['balance'];
    if (balance === undefined) {
      throw new HttpException(
        {
          success: false,
          message: 'No balance found',
        },
        HttpStatus.NOT_FOUND
      );
    }
    return balance;
  }

  public async setBalanceToSession(
    session: Session,
    balance: number
  ): Promise<CommonResDto> {
    session['balance'] = balance;

    const promiseExecutor = (resolve) => {
      session.save((err) => {
        if (err) resolve({ success: false, message: err.message });
        resolve({ success: true, message: 'Session saved' });
      });
    };

    return new Promise(promiseExecutor);
  }

  public async spin(session: Session, args: SpinReqDto): Promise<SpinResDto> {
    const { betInfo } = args;
    let balance = await this.getSessionBalance(session);
    const validBalance = this.gameHelper.validateBalance(balance, betInfo);

    if (!validBalance.success) {
      throw new HttpException(validBalance, HttpStatus.PAYMENT_REQUIRED);
    }
    balance = this.gameHelper.reduceBalance(balance, args.betInfo);

    const winNumber = this.gameHelper.getWinNumber();
    const winAmount = this.gameHelper.getWinAmount(winNumber, args.betInfo);

    balance = balance + winAmount;
    await this.setBalanceToSession(session, balance);

    return { winNumber, winAmount, balance };
  }

  public async deleteSession(session: Session): Promise<CommonResDto> {
    const promiseExecutor = (resolve) => {
      session.destroy((err) => {
        if (err) resolve({ success: false, message: err.message });
        resolve({ success: true, message: 'Session deleted' });
      });
    };

    const res: CommonResDto = await new Promise(promiseExecutor);
    if (!res.success) {
      throw new HttpException(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return res;
  }
}
