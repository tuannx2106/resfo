import { UploadFile } from 'antd/lib/upload/interface'
import { Property, PropertyFacilities, PropertyFurnitures } from 'globalTypes/property'

export type PropertyFormType = Pick<
  Property,
  | 'bathrooms'
  | 'bedrooms'
  | 'toilets'
  | 'floors'
  | 'description'
  | 'verifyType'
  | 'area'
  | 'listingType'
  | 'location'
  | 'housingType'
  | 'constructionStatus'
  | 'title'
> & {
  prices: number
  address: {
    province: string
    district: string
    ward: string
    street: string
  }
  galleries: {
    fileList: UploadFile[]
  }
  resources: string[]
  furnitures: PropertyFurnitures[]
  facilities: PropertyFacilities[]
}
