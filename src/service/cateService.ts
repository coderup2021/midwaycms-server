import { Provide } from '@midwayjs/core'
import { InjectEntityModel } from '@midwayjs/typeorm'
import { Cate } from 'src/entity/cate.entity'
import { ICate } from 'src/interface'
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm'

@Provide()
export class CateService {
  @InjectEntityModel(Cate)
  model: Repository<Cate>

  exists: (
    attrs: FindOptionsWhere<Cate> | FindOptionsWhere<Cate>[],
  ) => Promise<Cate> | null

  constructor() {
    this.exists = this.queryOneBy
  }

  // save
  async create(param: ICate) {
    const { name, parentId, path } = param
    const cate = new Cate()
    cate.name = name
    cate.parentId = parentId
    cate.path = path
    const { id } = await this.model.save(cate)
    return { id }
  }

  async update(param: ICate) {
    const cate = await this.model.findOne({
      where: { id: param.id },
    })
    Object.keys(param).forEach((k) => {
      cate[k] = param[k]
    })
    return await this.model.save(cate)
  }

  async delete(ids: number[]) {
    return await this.model.delete(ids)
  }

  async queryOneBy(attrs: FindOptionsWhere<Cate> | FindOptionsWhere<Cate>[]) {
    return this.model.findOne({
      where: attrs,
    })
  }

  async queryManyBy(attrs?: FindManyOptions<Cate>) {
    return this.model.find(attrs || undefined)
  }

  async clear() {
    if (process.env.NODE_ENV === 'test') {
      return this.model.clear()
    }
  }
}
