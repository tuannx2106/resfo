import { DRAW_POLYGON_STYLES } from './constant'

type createFreehandDrawingLayerParams = {
  map: google.maps.Map
  onDrawDoneCb?: (polygons: google.maps.Polygon) => void
}

export const createFreehandDrawingLayer = ({ map, onDrawDoneCb }: createFreehandDrawingLayerParams) => {
  const mapDiv = map.getDiv() as HTMLDivElement

  class FreeHandDrawingLayer extends google.maps.OverlayView {
    onMouseDown: (() => void) | null

    onTouchStart: ((e: TouchEvent) => void) | null

    constructor() {
      super()
      this.onMouseDown = null
      this.onTouchStart = null
      this.setMap(map)
    }

    onAdd() {
      const startDrawing = (isTouchEvent: boolean) => {
        const polyline = new google.maps.Polyline({
          map,
          clickable: false,
          ...DRAW_POLYGON_STYLES.STROKE,
        })

        const move = (e: TouchEvent | MouseEvent) => {
          const clientX = isTouchEvent ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
          const clientY = isTouchEvent ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY
          const rect = (e.target as HTMLElement).getBoundingClientRect()
          const x = clientX - rect.left
          const y = clientY - rect.top

          const latlng = this.getProjection().fromContainerPixelToLatLng(new google.maps.Point(x, y))
          polyline.getPath().push(latlng)
        }

        mapDiv.addEventListener(isTouchEvent ? 'touchmove' : 'mousemove', move)

        mapDiv.addEventListener(
          isTouchEvent ? 'touchend' : 'mouseup',
          () => {
            mapDiv.removeEventListener(isTouchEvent ? 'touchmove' : 'mousemove', move)

            const paths: google.maps.LatLngLiteral[] = polyline
              .getPath()
              .getArray()
              .filter((_point, index: number) => index % 5 === 0)

            polyline.setMap(null)

            const polygon = new google.maps.Polygon({
              map,
              paths,
              ...DRAW_POLYGON_STYLES.STROKE,
              ...DRAW_POLYGON_STYLES.FILL,
            })

            if (onDrawDoneCb) onDrawDoneCb(polygon)
          },
          { once: true },
        )
      }

      this.onMouseDown = () => {
        startDrawing(false)
      }

      this.onTouchStart = (e: TouchEvent) => {
        e.preventDefault()
        startDrawing(true)
      }

      mapDiv.addEventListener('mousedown', this.onMouseDown)
      mapDiv.addEventListener('touchstart', this.onTouchStart)
    }

    onRemove() {
      if (this.onTouchStart) mapDiv.removeEventListener('touchstart', this.onTouchStart)
      if (this.onMouseDown) mapDiv.removeEventListener('mousedown', this.onMouseDown)
    }
  }

  return new FreeHandDrawingLayer()
}
