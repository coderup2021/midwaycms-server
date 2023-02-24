import { Catch } from '@midwayjs/core'
import { Context } from 'egg'
import { SystemResponse } from 'src/interface'

@Catch()
export class DefaultErrorHandler {
  async catch(err: any, ctx: Context) {
    return {
      status: -1,
      data: {},
      message: err.message,
    } as SystemResponse<any>
  }
}
