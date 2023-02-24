import {
  Body,
  Context,
  Controller,
  Del,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@midwayjs/core'

@Controller('/api')
export class AdministratorController {
  @Inject()
  ctx: Context

  @Get('/admin/:id')
  async getAdmin(@Param() id: number) {}

  @Get('/admin')
  async getAdminList(@Param() id: number) {}

  @Post('/admin')
  async createAdmin(@Body() name: string) {}

  @Put('/admin')
  async updateAdmin(@Body() name: string) {}

  @Del('/admin/:ids')
  async DeleteAdmin(@Body() name: string) {}
}
