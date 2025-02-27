import { createRoute } from 'honox/factory'
import { shops } from '../data.json'

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>ラーメン屋</h1>
      {shops.map((shop) => (
        <div>
          <h2>{shop.name}</h2>
          {shop.photos.map((photo) => (
            <img src={photo.url} alt={shop.name} height={100} />
          ))}
        </div>
      ))}
    </div>
  )
})
