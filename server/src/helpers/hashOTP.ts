import bcrypt from 'bcryptjs'

// Function to generate a random salt and hash the OTP using the salt
export const generateHashOTP = (otp: string): string => {
  // Generate a salt with 10 rounds of complexity
  const salt = bcrypt.genSaltSync(10)
  // Create a hash of the OTP using the generated salt
  const hash = bcrypt.hashSync(otp, salt)
  // Reassign the OTP variable to the generated hash
  otp = hash
  return otp
}

// Function to compare the input OTP and OTP hash to check if they match
export const compareOTPWithItsHash = (
  input: string,
  otpHash: string
): boolean => {
  return bcrypt.compareSync(input, otpHash)
}
