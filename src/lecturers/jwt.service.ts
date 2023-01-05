import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtService {
  private readonly jwtSecret: string;

  constructor() {
    this.jwtSecret = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3MjkyNDUxMSwiaWF0IjoxNjcyOTI0NTExfQ.e3QhlFTb2fBVB0EY3B5pSVGXe_hKO15eEx1N1nvVrwU';
  }

  async sign(payload: JwtPayload): Promise<string> {
    const expiresIn = 3600; // 1 hour
    const accessToken = jwt.sign(payload, this.jwtSecret, { expiresIn });
    return accessToken;
  }
}
