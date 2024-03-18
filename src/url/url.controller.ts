import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { UrlService } from './url.service';

@Controller()
export class UrlController {
  constructor(private urlService: UrlService) {}
  @Post('shrink')
  async shrink(@Body('orginalUrl') orginalUrl: string) {
    const shortUrl = await this.urlService.getShortUrl(orginalUrl);
    if (shortUrl) return shortUrl;
    return this.urlService.shrink(orginalUrl);
  }
  @Redirect('', 303)
  @Get(':id')
  async redirect(@Param('id') id: string) {
    const url = await this.urlService.getOrginalUrl(id);
    if (!url) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return { url };
  }
}
