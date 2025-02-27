import { createRoute } from 'honox/factory'

export default createRoute(async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM shops ORDER BY name').run<{
    id: string
    name: string
    photo_url: string
  }>()
  return c.render(
    <div>
      <h1>Hello</h1>
      <pre>
        {results.map((shop) => {
          return (
            <div>
              <h2>
                {shop.name} : <a href={`/admin/delete?id=${shop.id}`}>Delete</a>
              </h2>
              <img src={shop.photo_url} alt={shop.name} height={100} />
            </div>
          )
        })}
      </pre>
    </div>
  )
})
