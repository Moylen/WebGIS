import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashService {
  async hashData(data: string): Promise<string> {
    return await argon2.hash(data);
  }

  async verifyData(hashed: string, data: string): Promise<boolean> {
    return await argon2.verify(hashed, data);
  }
}
