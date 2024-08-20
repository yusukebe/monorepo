import app from './index'

describe('Basic', () => {
  it('Should return 200 response', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
  })
})
