import { UploadFile } from 'antd/lib/upload/interface'
import { FileUploadReq } from 'store/types/fileUpload'

export const toFilesUpload = (files: UploadFile[]): FileUploadReq[] =>
  files.map((file) => ({ images: file.originFileObj })) as FileUploadReq[]
