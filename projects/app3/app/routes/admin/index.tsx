import { createRoute } from 'honox/factory'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const schema = z.object({
  name: z.string().min(1),
  photo_url: z.string().url(),
})

export const POST = createRoute(zValidator('form', schema), async (c) => {
  const data = c.req.valid('form')

  const res = await c.env.DB.prepare('INSERT INTO shops (id, name, photo_url) VALUES (?, ?, ?)')
    .bind(crypto.randomUUID(), data.name, data.photo_url)
    .run()

  if (res.error) {
    return c.render(
      <div>
        <h1>Error</h1>
        <div>{res.error}</div>
      </div>
    )
  }

  return c.redirect('/admin')
})

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>Admin</h1>
      <div>
        <form method='post'>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input type='text' name='name' id='name' />
          </div>
          <div className='form-group'>
            <label htmlFor='photo_url'>Photo URL:</label>
            <input type='text' name='photo_url' id='photo_url' />
          </div>
          <div className='form-actions'>
            <button type='submit'>Create</button>
          </div>
        </form>
      </div>
    </div>
  )
})
