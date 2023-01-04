import { RcFile } from 'antd/lib/upload'

export type FileUploadRes = {
  fileName: string
  sourceFileName: string
  results: string[]
}

export type FileUploadReq = {
  images: RcFile
}
