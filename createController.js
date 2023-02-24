#!/usr/bin/env node

const fs = require('fs')
const argv = process.argv.slice(2)
console.log(argv[0])
let filepath = argv[0]
if (fs.existsSync(filepath)) {
  console.log('file exist, please remove it at first')
  return
}
const arr = filepath.split('/')
const fileName = arr[arr.length - 1]

const sourceCode = `
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
  export class ${firstToUpperCase(fileName)}Controller {
    @Inject()
    ctx: Context
  
    @Get('/${fileName}/:id')
    async get${firstToUpperCase(fileName)}(@Param() id: number) {}
  
    @Get('/${fileName}')
    async get${firstToUpperCase(fileName)}List(@Param() id: number) {}
  
    @Post('/${fileName}')
    async create${firstToUpperCase(fileName)}(@Body() name: string) {}
  
    @Put('/${fileName}')
    async update${firstToUpperCase(fileName)}(@Body() name: string) {}
  
    @Del('/${fileName}/:ids')
    async Delete${firstToUpperCase(fileName)}(@Body() name: string) {}
  }
`

function firstToUpperCase(txt) {
  return txt[0].toUpperCase() + txt.substring(1)
}
filepath += '.ts'
fs.writeFileSync(filepath, sourceCode, { encoding: 'utf-8' })
