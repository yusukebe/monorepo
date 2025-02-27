import { createRoute } from 'honox/factory'
import type { Shop } from '../types'
import { Suspense } from 'hono/jsx'

const url = 'https://ramen-api.dev/shops?pretty&page=1&perPage=3'

const Component = async () => {
  const res = await fetch(url)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const data = await res.json<{ shops: Shop[] }>()
  return (
    <div>
      {data.shops.map((shop) => (
        <div>
          <h2>{shop.name}</h2>
          {shop.photos.map((photo) => (
            <img src={photo.url} alt={shop.name} height={100} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default createRoute(async (c) => {
  return c.render(
    <div>
      <h1>ラーメン屋</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    </div>
  )
})
