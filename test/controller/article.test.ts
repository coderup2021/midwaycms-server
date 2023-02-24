import { faker } from '@faker-js/faker'
import { createApp, close, createHttpRequest } from '@midwayjs/mock'
import { Framework } from '@midwayjs/web'
import { Application } from 'egg'
import { clearDB } from '../util/clearDBTable'

describe('test/controller/article.test.ts', () => {
  let app: Application
  let cateId: 0

  beforeAll(async () => {
    await clearDB()
    app = await createApp<Framework>()

    const name = faker.internet.userName()
    const parentId = 0
    result = await createHttpRequest(app).post('/api/cate').send({
      name,
      parentId,
      path: '/x/y/z/',
    })
    cateId = result.body.data.id
  })

  afterAll(async () => {
    await close(app)
  })

  let id = 0
  let result: any = null
  it('should POST /api/article', async () => {
    const articleContent = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      description: faker.lorem.paragraph(),
      cateId,
      editorType: 1,
    }
    result = await createHttpRequest(app)
      .post('/api/article')
      .send(articleContent)

    id = result.body.data.id
    expect(result.status).toBe(200)
    console.log('result.body', result.body)
    expect(result.body.data.id).toBeGreaterThan(0)
    expect(result.body.status).toBe(0)

    //getOne
    result = await createHttpRequest(app).get(`/api/article/${id}`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)

    const { title, content, description, editorType } = articleContent
    expect(result.body.data).toMatchObject({
      title,
      content,
      description,
      editorType,
    })

    //getList
    result = await createHttpRequest(app).get(`/api/article`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    const data = result.body.data
    expect(data.length).toBeGreaterThan(0)
    const article = data[data.length - 1]
    expect(article).toMatchObject({ title, content, description, editorType })

    //put
    const articleContentUpdate = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      description: faker.lorem.paragraph(),
      cateId,
      editorType: 1,
    }
    result = await createHttpRequest(app)
      .put(`/api/article/${id}`)
      .send(articleContentUpdate)

    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    expect(result.body.data).toMatchObject({
      id,
    })
    result = await createHttpRequest(app).get(`/api/article/${id}`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    const {
      title: titleUpdate,
      content: contentUpdate,
      description: descriptionUpdate,
      editorType: editorTypeUpdate,
    } = articleContentUpdate

    expect(result.body.data).toMatchObject({
      title: titleUpdate,
      content: contentUpdate,
      description: descriptionUpdate,
      editorType: editorTypeUpdate,
    })

    //delete
    result = await createHttpRequest(app).delete(`/api/article/${id}`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    result = await createHttpRequest(app).get(`/api/article/${id}`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    expect(result.body.data).toBeNull()
  })
})
