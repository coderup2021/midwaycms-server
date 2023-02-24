import { createApp, close, createHttpRequest } from '@midwayjs/mock'
import { Framework } from '@midwayjs/web'
import { Application } from 'egg'
import { faker } from '@faker-js/faker'
import { clearDB } from '../util/clearDBTable'

describe('test/controller/cate.test.ts', () => {
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
  it('should /api/cate', async () => {
    const name = faker.internet.userName()
    const parentId = 0
    result = await createHttpRequest(app).post('/api/cate').send({
      name,
      parentId,
      path: '/x/y/z/',
    })

    id = result.body.data.id
    expect(result.status).toBe(200)
    expect(result.body.data.id).toBeGreaterThan(0)
    expect(result.body.status).toBe(0)

    //getOne
    result = await createHttpRequest(app).get(`/api/cate/${id}`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    expect(result.body.data).toMatchObject({
      name,
      parentId,
      path: '/x/y/z/',
    })

    //getList
    result = await createHttpRequest(app).get(`/api/cate`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    const data = result.body.data
    expect(data.length).toBeGreaterThan(0)
    const cate = data[data.length - 1]
    expect(cate).toMatchObject({ name, parentId, path: '/x/y/z/' })

    //put
    result = await createHttpRequest(app).put(`/api/cate/${id}`).send({
      name: 'abc',
      parentId: 0,
      path: '/x/y/z/abc/',
    })

    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    expect(result.body.data).toMatchObject({
      id,
    })
    result = await createHttpRequest(app).get(`/api/cate/${id}`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    expect(result.body.data).toMatchObject({
      name: 'abc',
      parentId: 0,
    })

    //delete
    result = await createHttpRequest(app).delete(`/api/cate/${id}`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    result = await createHttpRequest(app).get(`/api/cate/${id}`)
    expect(result.status).toBe(200)
    expect(result.body.status).toBe(0)
    expect(result.body.data).toBeNull()
  })
})
