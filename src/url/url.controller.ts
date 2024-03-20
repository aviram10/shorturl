import {
  BadRequestException,
  // BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { UrlService } from './url.service';

@Controller()
export class UrlController {
  constructor(private urlService: UrlService) {}
  @Post('shrink')
  //the parameters orginalUrl can injected with any type even when declare type
  async shrink(@Body('orginalUrl') orginalUrl: string) {
    if (
      !orginalUrl ||
      typeof orginalUrl !== 'string' ||
      !orginalUrl.startsWith('http://')
    )
      throw new BadRequestException();
    const shortUrl = await this.urlService.getShortUrl(orginalUrl);
    if (shortUrl) return shortUrl;
    return this.urlService.shrink(orginalUrl);
  }
  @Redirect('', 303)
  @Get(':id')
  async redirect(@Param('id') id: string) {
    const url = await this.urlService.getOrginalUrl(id);
    if (url === null) throw NotFoundException;
    this.urlService.count(id);
    return { url };
  }
}
