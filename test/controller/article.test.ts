import { createApp, close, createHttpRequest } from '@midwayjs/mock'
import { Framework } from '@midwayjs/web'
import { Application } from 'egg'

describe('test/controller/article.test.ts', () => {
  let app: Application

  beforeAll(async () => {
    app = await createApp<Framework>()
  })

  afterAll(async () => {
    await close(app)
  })

  let id = 0
  let result: any = null
  it('should POST /api/article', async () => {
    result = await createHttpRequest(app).post('/api/article').send({
      title: 'this is a title',
      content: 'this is a content',
      description: 'this is a description',
    })

    id = result.body.data.id
    expect(result.status).toBe(200)
    expect(result.body.data.id).toBeGreaterThan(0)
    expect(result.body.status).toBe(0)

    //getOne
    result = await createHttpRequest(app).get(`/api/article/${id}`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    expect(result.body.data).toMatchObject({
      title: 'this is a title',
      content: 'this is a content',
      description: 'this is a description',
    })

    //getList
    result = await createHttpRequest(app).get(`/api/article`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    const data = result.body.data
    expect(data.length).toBeGreaterThan(0)
    const article = data[data.length - 1]
    expect(article).toMatchObject({
      title: 'this is a title',
      content: 'this is a content',
      description: 'this is a description',
    })

    //put
    result = await createHttpRequest(app).put(`/api/article/${id}`).send({
      title: 'this is a title update',
      content: 'this is a content update',
      description: 'this is a description update',
    })

    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    expect(result.body.data).toMatchObject({
      id,
    })
    result = await createHttpRequest(app).get(`/api/article/${id}`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    expect(result.body.data).toMatchObject({
      title: 'this is a title update',
      content: 'this is a content update',
      description: 'this is a description update',
      id,
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
