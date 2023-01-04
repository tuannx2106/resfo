const minChar = (value: string, length: number) => String(value).length >= Number(length)

const minLowerCase = (value: string) => /^(?=.*?[a-z]).+$/.test(value)

const minUpperCase = (value: string) => /^(?=.*?[A-Z]).+$/.test(value)

const minNumber = (value: string) => /^(?=.*?[0-9]).+$/.test(value)

const minSpecial = (value: string) => !/^(?=.*?[~`!@#$%^&*()\-_+={}[]|;:"<>,.\/\?]).+$/.test(value)

export const checkError = (value: string) => ({
  min: minChar(value, 8),
  lower: minLowerCase(value),
  upper: minUpperCase(value),
  number: minNumber(value),
  special: minSpecial(value),
})
