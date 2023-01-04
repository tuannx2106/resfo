export type ForgotPasswordFormType = {
  email: string
}

export enum VALIDATE_PASSWORD_TYPE {
  MIN = 'min',
  NUMBER = 'number',
  SPECIAL = 'special',
  UPPER = 'upper',
  LOWER = 'lower',
}

export type ValidatePassword = {
  type: VALIDATE_PASSWORD_TYPE
  label: string
}
