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
  data?: T
  error?: {
    status: HttpStatus
    message: string
  }
}

export interface IArticle {
  title: string
  content: string
  description: string
  id?: number
  deletedAt?: string
  createdAt?: string
  updatedAt?: string
}
