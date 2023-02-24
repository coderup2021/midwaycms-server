import { IArticle } from 'src/interface'
import {
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@midwayjs/core'
import { ArticleService } from 'src/service/article'
import { Context } from 'egg'

@Controller('/api/article')
export class ArticleController {
  @Inject()
  ctx: Context
  @Inject()
  service: ArticleService

  @Get('/:id')
  async getArticle(@Param('id') id: number) {
    const article = await this.service.queryOneBy({ id })
    return { status: 0, data: article }
  }

  @Get('/')
  async getArticleList() {
    const list = await this.service.queryBy({})
    return { status: 0, data: list }
  }

  @Post('/')
  async createArticle(@Body() body: IArticle) {
    const { title, content, description } = body
    const { id } = await this.service.create({
      title,
      content,
      description,
    })
    return { status: 0, data: { id } }
  }

  @Put('/:id')
  async updateArticle(@Param('id') id: number, @Body() body: IArticle) {
    const { title, content, description } = body
    await this.service.update({
      title,
      content,
      description,
      id,
    })
    return { status: 0, data: { id } }
  }

  @Del('/:ids')
  async deleteArticle(@Param('ids') ids: string) {
    await this.service.delete(ids.split(',').map((id) => Number(id)))
    return { status: 0 }
  }
}
