import { MenuItem } from './menu-item'

export type Restaurant = {
  name: string
  opening_hours: string
  latitude: number
  longitude: number
  id: number
  top_menu_items: MenuItem[]
}
