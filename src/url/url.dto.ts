import { IsNotEmpty, Length } from 'class-validator';

export class BaseURL {
  @IsNotEmpty()
  @Length(10, 30)
  originalUrl: string;
}

export class ExtendUrl extends BaseURL {
  @IsNotEmpty()
  shortUrl: string;
  counter: number;
}
