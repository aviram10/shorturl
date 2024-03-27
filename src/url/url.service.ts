import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient, urls } from '@prisma/client';
import * as uniqid from 'uniqid';

@Injectable()
export class UrlService {
  private prisma = new PrismaClient();
  private domain = 'http://localhost:3000/';

  async shrink(originalUrl: string) {
    const shortUrl = uniqid();
    const data: urls = {
      originalUrl,
      shortUrl,
      counter: 0,
    };
    try {
      await this.prisma.urls.create({ data });
      return this.domain + shortUrl;
    } catch (err) {
      switch (err.code) {
        case 'P2002':
          return this.shrink(originalUrl);
        default:
          throw HttpException;
      }
    }
  }

  async getShortUrl(originalUrl: string) {
    const url = await this.prisma.urls.findUnique({
      where: { originalUrl },
    });
    if (url === null) return null;
    return this.domain + url.shortUrl;
  }

  async getOriginalUrl(shortUrl: string) {
    const url = await this.prisma.urls.findUnique({
      where: {
        shortUrl,
      },
    });
    if (url === null) return null;
    return url.originalUrl;
  }

  async count(id: string) {
    try {
      await this.prisma.urls.update({
        where: {
          shortUrl: id,
        },
        data: {
          counter: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
