import { Catch } from '@midwayjs/core'
import { Context } from 'egg'
import { SystemResponse } from 'src/interface'

@Catch()
export class DefaultErrorHandler {
  async catch(err: any, ctx: Context) {
    return {
      status: -1,
      error: {
        status: err.status ?? 500,
        message: err.message,
      },
    } as SystemResponse<any>
  }
}
