import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core'

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1676681781130_6322',
    egg: {
      port: 7001,
    },
    // security: {
    //   csrf: false,
    // },
    typeorm: {
      dataSource: {
        default: {
          // ...
          entities: ['**/entity/*{.ts,.js}'],
          migrations: ['**/migration/*.ts'],
          type: 'mysql',
          driver: require('mysql2'),
          database: 'midway_cms',
          username: 'root',
          password: 'root',
          port: 3306,
        },
      },
    },
  } as MidwayConfig
}
