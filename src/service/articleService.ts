import { MidwayHttpError, Provide } from '@midwayjs/core'
import { InjectEntityModel } from '@midwayjs/typeorm'
import { Article } from 'src/entity/article.entity'
import { Cate } from 'src/entity/cate.entity'
import { IArticle } from 'src/interface'
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm'

@Provide()
export class ArticleService {
  @InjectEntityModel(Article)
  model: Repository<Article>

  @InjectEntityModel(Cate)
  cateModel: Repository<Cate>

  // save
  async create(param: IArticle) {
    const { content, title, description, editorType, cateId } = param
    const article = new Article()
    article.content = content
    article.title = title
    article.description = description
    article.editorType = editorType

    const cate = await this.cateModel.findOne({ where: { id: cateId } })
    if (!cate) {
      throw new MidwayHttpError('cateNotExsit', 400)
    }
    article.cate = cate

    const { id } = await this.model.save(article)
    return { id }
  }

  async update(param: IArticle) {
    const article = await this.model.findOne({
      where: { id: param.id },
      relations: ['cate'],
    })
    Object.keys(param).forEach((k) => {
      if (k !== 'cateId') article[k] = param[k]
    })
    if (article.cate.id !== param.cateId) {
      const cate = await this.cateModel.findOne({ where: { id: param.cateId } })

      if (!cate) {
        throw new MidwayHttpError('cateNotExsit', 400)
      }
      article.cate = cate
    }
    return await this.model.save(article)
  }

  async delete(ids: number[]) {
    return await this.model.delete(ids)
  }

  async queryOneBy(
    attrs: FindOptionsWhere<Article> | FindOptionsWhere<Article>[],
  ) {
    return this.model.findOne({
      where: attrs,
      relations: ['cate'],
    })
  }

  async queryManyBy(attrs: FindManyOptions<Article>) {
    return this.model.find({ ...attrs, relations: ['cate'] })
  }
}
