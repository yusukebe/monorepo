import { Hono } from 'hono'

const app = new Hono<{
  Bindings: {
    DB: D1Database
  }
}>()

app.get('/', async (c) => {
  const id = c.req.query('id')
  await c.env.DB.prepare('DELETE FROM shops WHERE id = ?').bind(id).run()
  return c.redirect('/')
})

export default app
