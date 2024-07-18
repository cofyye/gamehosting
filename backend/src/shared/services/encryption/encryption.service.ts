import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  constructor(private readonly _configService: ConfigService) {}

  private algorithm = 'aes-256-ctr';
  private secretKey = this._configService.get<string>('ENCRYPTION_KEY');
  private iv = crypto.randomBytes(16);

  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.secretKey),
      this.iv,
    );
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return `${this.iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decrypt(hash: string): string {
    const [iv, content] = hash.split(':');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.secretKey),
      Buffer.from(iv, 'hex'),
    );
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(content, 'hex')),
      decipher.final(),
    ]);

    return decrypted.toString();
  }
}
