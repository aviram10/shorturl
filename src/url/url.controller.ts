import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { BaseURL } from './url.dto';

@Controller()
export class UrlController {
  constructor(private urlService: UrlService) {}
  @Post('shrink')
  async shrink(@Body() { originalUrl }: BaseURL) {
    const shortUrl = await this.urlService.getShortUrl(originalUrl);
    if (shortUrl) return shortUrl;
    return this.urlService.shrink(originalUrl);
  }

  @Redirect('', 303)
  @Get(':id')
  async redirect(@Param('id') id: string) {
    const url = await this.urlService.getOriginalUrl(id);
    if (url === null) throw NotFoundException;
    this.urlService.count(id);
    return { url };
  }
}
