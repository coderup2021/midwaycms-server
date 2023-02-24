import { ICate } from 'src/interface'
import {
  Body,
  Controller,
  Del,
  Get,
  HttpStatus,
  Inject,
  MidwayHttpError,
  Param,
  Post,
  Put,
} from '@midwayjs/core'
import { CateService } from 'src/service/cateService'
import { Context } from 'egg'

@Controller('/api/cate')
export class CateController {
  @Inject()
  ctx: Context
  @Inject()
  service: CateService

  @Get('/:id')
  async detail(@Param('id') id: number) {
    const cate = await this.service.queryOneBy({ id })
    return { status: 0, data: cate }
  }

  @Get('/')
  async list() {
    const list = await this.service.queryManyBy({})
    return { status: 0, data: list }
  }

  @Post('/')
  async create(@Body() body: ICate) {
    const { name, parentId, path } = body
    if (!this.service.exists({ parentId })) {
      throw new MidwayHttpError('parentCateNotExist', HttpStatus.BAD_REQUEST)
      return
    }
    const { id } = await this.service.create({
      name,
      parentId,
      path,
    })
    return { status: 0, data: { id } }
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: ICate) {
    const { name, parentId, path } = body
    if (parentId !== 0 && !this.service.exists({ parentId })) {
      throw new MidwayHttpError('parentCateNotExist', HttpStatus.BAD_REQUEST)
      return
    }
    if (!this.service.exists({ id })) {
      throw new MidwayHttpError('CateNotExist', HttpStatus.BAD_REQUEST)
      return
    }
    await this.service.update({
      id,
      name,
      parentId,
      path,
    })
    return { status: 0, data: { id } }
  }

  @Del('/:ids')
  async delete(@Param('ids') ids: string) {
    await this.service.delete(ids.split(',').map((id) => Number(id)))
    return { status: 0 }
  }
}
