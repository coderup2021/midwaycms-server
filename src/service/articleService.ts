import { Provide } from '@midwayjs/core'
import { InjectEntityModel } from '@midwayjs/typeorm'
import { Article } from 'src/entity/article.entity'
import { IArticle } from 'src/interface'
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm'

@Provide()
export class ArticleService {
  @InjectEntityModel(Article)
  model: Repository<Article>

  // save
  async create(param: IArticle) {
    const { content, title, description, editorType } = param
    const article = new Article()
    article.content = content
    article.title = title
    article.description = description
    article.editorType = editorType
    const { id } = await this.model.save(article)
    return { id }
  }

  async update(param: IArticle) {
    const article = await this.model.findOne({
      where: { id: param.id },
    })
    Object.keys(param).forEach((k) => {
      article[k] = param[k]
    })
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
    })
  }

  async queryBy(attrs: FindManyOptions<Article>) {
    return this.model.find(attrs)
  }
}
