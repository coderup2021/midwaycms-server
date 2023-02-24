import { faker } from '@faker-js/faker'
import { createApp, close, createHttpRequest } from '@midwayjs/mock'
import { Framework } from '@midwayjs/web'
import { Application } from 'egg'
import { clearDB } from '../util/clearDBTable'

describe('test/controller/article.test.ts', () => {
  let app: Application

  beforeAll(async () => {
    await clearDB()
    app = await createApp<Framework>()
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
      editorType: 1,
    }
    result = await createHttpRequest(app)
      .post('/api/article')
      .send(articleContent)

    id = result.body.data.id
    expect(result.status).toBe(200)
    expect(result.body.data.id).toBeGreaterThan(0)
    expect(result.body.status).toBe(0)

    //getOne
    result = await createHttpRequest(app).get(`/api/article/${id}`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    expect(result.body.data).toMatchObject(articleContent)

    //getList
    result = await createHttpRequest(app).get(`/api/article`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    const data = result.body.data
    expect(data.length).toBeGreaterThan(0)
    const article = data[data.length - 1]
    expect(article).toMatchObject(articleContent)

    //put
    const articleContentUpdate = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      description: faker.lorem.paragraph(),
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
    expect(result.body.data).toMatchObject(articleContentUpdate)

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
