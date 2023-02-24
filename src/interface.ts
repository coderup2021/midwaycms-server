import { HttpStatus } from '@midwayjs/core'

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: string
}

export interface IGetUserResponse {
  success: boolean
  message: string
  data: IUserOptions
}

export interface SystemResponse<T> {
  status: 0 | -1
  data: T
  message: string
}

export interface IArticle {
  id?: number
  title: string
  content: string
  description: string
  editorType: number
  cateId: number
  cate?: ICate
  deletedAt?: string
  createdAt?: string
  updatedAt?: string
}

export interface ICate {
  id?: number
  name: string
  parentId: number
  path: string
  articles?: IArticle[]
}
