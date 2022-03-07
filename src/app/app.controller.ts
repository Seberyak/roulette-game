import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { LoginReqDto } from '../auth/dto/login-req.dto';
import { LoginResDto } from '../auth/dto/login-res.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.decorator';
import { UserPayloadDto } from '../users/dto/user-payload.dto';
import { AppService } from './app.service';
import * as session from 'express-session';
import { CommonResDto } from '../common/common-res.dto';
import { SpinReqDto } from './dto/spin-req.dto';
import { SpinResDto } from './dto/spin-res.dto';
import { GetBalanceResDto } from './dto/get-balance-res.dto';

const accessToken = 'access-token';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService
  ) {}

  @Post('login')
  @ApiOkResponse({ type: LoginResDto })
  async login(@Body() args: LoginReqDto): Promise<LoginResDto> {
    const { username, password } = args;
    const user = await this.authService.validateUser(username, password);
    return this.authService.login(user);
  }

  @Post('create')
  @ApiBearerAuth(accessToken)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CommonResDto })
  async createGame(
    @User() user: UserPayloadDto,
    @Session() userSession: session.Session
  ): Promise<CommonResDto> {
    return this.appService.setBalanceToSession(userSession, user.balance);
  }

  @Post('spin')
  @ApiBearerAuth(accessToken)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SpinResDto })
  async spin(
    @Session() userSession: session.Session,
    @Body() args: SpinReqDto
  ): Promise<SpinResDto> {
    return this.appService.spin(userSession, args);
  }

  @ApiBearerAuth(accessToken)
  @UseGuards(JwtAuthGuard)
  @Post('end')
  async end(@Session() userSession: session.Session): Promise<CommonResDto> {
    return await this.appService.deleteSession(userSession);
  }

  @Get('balance')
  @ApiBearerAuth(accessToken)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: GetBalanceResDto })
  async getBalance(
    @Session() userSession: session.Session
  ): Promise<GetBalanceResDto> {
    const balance = await this.appService.getSessionBalance(userSession);
    return { balance };
  }

  @Get('jwt-payload')
  @ApiBearerAuth(accessToken)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserPayloadDto })
  async getProfile(@User() user: UserPayloadDto): Promise<UserPayloadDto> {
    return user;
  }
}
