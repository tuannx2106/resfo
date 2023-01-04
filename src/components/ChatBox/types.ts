export type Message = {
  message: string
  sender: string
  direction: Direction
  position: Position
  images?: string[]
  id: string
}

type Direction = 'incoming' | 'outgoing'

type Position = 'single' | 'normal'
