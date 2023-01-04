export type User = {
  email?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  address1?: string
  city?: string
  state?: string
  zipCode?: string
  countryCode?: string
  role?: string
}

export type RegisterReq = User & {
  password: string
}

export type UserRes = User & {
  id: string
  address2: string
  status: string
  verified: boolean
}
