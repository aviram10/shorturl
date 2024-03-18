import { Injectable } from '@nestjs/common';
import { PrismaClient, urls } from '@prisma/client';
import * as uniqid from 'uniqid';
@Injectable()
export class UrlService {
  private prisma = new PrismaClient();
  private domain = 'http://localhost:3000/';

  async shrink(orginalUrl: string) {
    const shortUrl: string = uniqid();
    const data: urls = {
      orginalUrl,
      shortUrl,
      counter: 0,
    };
    try {
      await this.prisma.urls.create({ data });
      return this.domain + shortUrl;
    } catch (err) {
      console.log(err);
    }
  }
  async getShortUrl(orginalUrl: string) {
    const url = await this.prisma.urls.findUnique({
      where: { orginalUrl },
    });
    if (!url) return null;
    return this.domain + url.shortUrl;
  }
  async getOrginalUrl(shortUrl: string) {
    const url = await this.prisma.urls.findUnique({
      where: {
        shortUrl,
      },
    });
    if (!url) return null;
    return url.orginalUrl;
  }
}
