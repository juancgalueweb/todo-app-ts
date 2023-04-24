import jwt from 'jsonwebtoken'
import { MSGS_RESPONSES } from '../constants/msgs'

const jwtOTPHash = async (otpHash: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const payload = { otpHash }
    const secretKey = process.env.SECRET_KEY_OTP_JWT as string
    const expiresIn = '10m' // 10 minutos
    jwt.sign(payload, secretKey, { expiresIn }, (error, token) => {
      if (error != null) {
        reject(new Error(MSGS_RESPONSES.JWT_OTP_HASH_ERROR1))
      } else if (token === undefined) {
        reject(new Error(MSGS_RESPONSES.JWT_OTP_HASH_ERROR2))
      } else {
        resolve(token)
      }
    })
  })
}

export { jwtOTPHash }
