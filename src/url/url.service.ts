import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, urls } from '@prisma/client';
import * as uniqid from 'uniqid';

@Injectable()
export class UrlService {
  private prisma = new PrismaClient();
  private domain = 'http://localhost:3000/';

  async shrink(orginalUrl: string) {
    const shortUrl = uniqid();
    const data: urls = {
      orginalUrl,
      shortUrl,
      counter: 0,
    };
    try {
      await this.prisma.urls.create({ data });
      return this.domain + shortUrl;
    } catch (err) {
      switch (err.code) {
        case 'P2002':
          return this.shrink(orginalUrl);
        case 'P2000':
          throw new HttpException('url too long', HttpStatus.BAD_REQUEST);
        default:
          throw HttpException;
      }
    }
  }

  async getShortUrl(orginalUrl: string) {
    const url = await this.prisma.urls.findUnique({
      where: { orginalUrl },
    });
    if (url === null) return null;
    return this.domain + url.shortUrl;
  }

  async getOrginalUrl(shortUrl: string) {
    const url = await this.prisma.urls.findUnique({
      where: {
        shortUrl,
      },
    });
    if (url === null) return null;
    return url.orginalUrl;
  }

  async count(id: string) {
    await this.prisma.$queryRaw`INSERT INTO visitors (id, counter)
    VALUES (${id}, 1)
    ON CONFLICT (id) DO UPDATE
     SET counter = visitors.counter + 1`;
    return;
  }
}
