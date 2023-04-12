import bcrypt from 'bcryptjs'

const generateHashOTP = (otp: string): string => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(otp, salt)
  otp = hash
  return otp
}

const compareOTPWithItsHash = (input: string, otpHash: string): boolean => {
  return bcrypt.compareSync(input, otpHash)
}

export { generateHashOTP, compareOTPWithItsHash }
