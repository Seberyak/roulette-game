import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import { RedisModule, RedisService } from 'nestjs-redis';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/validation.pipe';
import { GameHelper } from './app/helpers/game-helper';

@Module({
  imports: [
    RedisModule.register({
      host: process.env.REDIS_HOST || 'localhost',
      port: +(process.env.REDIS_PORT || 6666),
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [
    AppService,
    GameHelper,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  constructor(private readonly redisService: RedisService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redisService.getClient(),
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: 'sup3rs3cr3t',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 600 * 1e3,
          },
        })
        // passport.initialize(),
        // passport.session()
      )
      .forRoutes('*');
  }
}
