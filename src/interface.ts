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

export interface IArticle {
  title: string
  content: string
  description: string
  id?: number
  deletedAt?: string
  createdAt?: string
  updatedAt?: string
}
