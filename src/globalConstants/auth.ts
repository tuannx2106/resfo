import { ValidatePassword, VALIDATE_PASSWORD_TYPE } from 'globalTypes/auth'

export const VALIDATE_PASSWORD: ValidatePassword[] = [
  {
    type: VALIDATE_PASSWORD_TYPE.MIN,
    label: 'atLeastCharacters',
  },
  {
    type: VALIDATE_PASSWORD_TYPE.NUMBER,
    label: 'atLeast1Number',
  },
  {
    type: VALIDATE_PASSWORD_TYPE.SPECIAL,
    label: 'atLeastSpecialCharacter',
  },
  {
    type: VALIDATE_PASSWORD_TYPE.UPPER,
    label: 'atLeastUppercase',
  },
  {
    type: VALIDATE_PASSWORD_TYPE.LOWER,
    label: 'atLeastLowercase',
  },
]

export const CHECK_PASSWORD_TIME_DELAY = 600
