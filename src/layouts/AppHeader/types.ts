import { BasicLinkType } from 'globalTypes/link'

export type Menu = {
  title: string
  menu: BasicLinkType[]
  subMenu?: BasicLinkType[]
}

export type Nav = BasicLinkType & {
  key: string
  active?: boolean
  menus?: Menu[]
}

export enum LOCALE_OPTIONS {
  VI = 'vi',
  EN = 'en',
}
