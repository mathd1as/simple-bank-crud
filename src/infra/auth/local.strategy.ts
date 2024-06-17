import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@application/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(taxId: string, password: string): Promise<any> {
    console.log('here');
    const authenticateInput = {
      taxId,
      password,
    };
    const user = await this.authService.validateUser(authenticateInput);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
