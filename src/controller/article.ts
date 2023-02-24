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
import { ArticleService } from 'src/service/articleService'
import { Context } from 'egg'

@Controller('/api/article')
export class ArticleController {
  @Inject()
  ctx: Context
  @Inject()
  service: ArticleService

  @Get('/:id')
  async detail(@Param('id') id: number) {
    const article = await this.service.queryOneBy({ id })
    return { status: 0, data: article }
  }

  @Get('/')
  async list() {
    const list = await this.service.queryManyBy({})
    return { status: 0, data: list }
  }

  @Post('/')
  async create(@Body() body: IArticle) {
    const { title, content, description, editorType, cateId } = body
    const { id } = await this.service.create({
      title,
      content,
      description,
      editorType,
      cateId,
    })
    return { status: 0, data: { id } }
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: IArticle) {
    const { editorType, title, content, description, cateId } = body
    await this.service.update({
      title,
      content,
      description,
      editorType,
      id,
      cateId,
    })
    return { status: 0, data: { id } }
  }

  @Del('/:ids')
  async delete(@Param('ids') ids: string) {
    await this.service.delete(ids.split(',').map((id) => Number(id)))
    return { status: 0 }
  }
}
