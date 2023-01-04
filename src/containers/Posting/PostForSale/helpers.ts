import { UploadFile } from 'antd/lib/upload/interface'
import { Property } from 'globalTypes/property'
import { FileUploadReq, FileUploadRes } from 'store/types/fileUpload'
import { PropertyFormType } from './types'

export const toPropertyInfoReq = (property: PropertyFormType, galleries: FileUploadRes[] | []): Partial<Property> => {
  const {
    prices,
    address,
    furnitures,
    facilities,
    bathrooms,
    bedrooms,
    toilets,
    floors,
    description,
    verifyType,
    area,
    listingType,
    location,
    housingType,
    constructionStatus,
    title,
  } = property

  const priceReq = [
    {
      currencyCode: 'usd',
      price: prices,
    },
  ]

  const addressReq = `${address?.street || ''} ${address.ward || ''} ${address.district || ''} ${
    address.province || ''
  }`.trim()

  const furnitureReq =
    furnitures?.map((furniture) => ({
      name: 'grove',
      type: furniture,
    })) || []

  const facilityReq =
    facilities?.map((facility) => ({
      name: facility,
    })) || []

  const galleriesReq =
    galleries?.map((gallery) => ({
      id: `${gallery.sourceFileName.split('.')[0]}-${gallery.results[0].split('-')[1]}`,
      ext: `.${gallery.sourceFileName.split('.')[1]}`,
    })) || []

  return {
    prices: priceReq,
    address: addressReq,
    title,
    furnitures: furnitureReq,
    facilities: facilityReq,
    toilets,
    bathrooms: {
      ...bathrooms,
      noOfTubs: 0,
    },
    bedrooms,
    floors,
    description,
    verifyType,
    listingType,
    area,
    housingType,
    constructionStatus,
    location,
    galleries: galleriesReq,
  }
}

export const toFilesUpload = (files: UploadFile[]): FileUploadReq[] =>
  files.map((file) => ({ images: file.originFileObj })) as FileUploadReq[]
