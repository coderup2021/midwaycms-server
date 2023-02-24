import { EggAppConfig, PowerPartial } from 'egg'
import { MidwayConfig } from '@midwayjs/core'

export type DefaultConfig = PowerPartial<EggAppConfig>

export default {
  egg: {
    port: null,
  },
  security: {
    csrf: false,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        driver: require('mysql2'),
        database: 'midway_cms',
        host: 'localhost',
        username: 'root',
        password: 'Aa123456',
        port: 3310,
        entities: ['**/entity/*{.ts,.js}'],
        migrations: ['**/migration/*.ts'],
      },
    },
  },
} as MidwayConfig & DefaultConfig
