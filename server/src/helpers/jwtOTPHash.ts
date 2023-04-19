import jwt from 'jsonwebtoken'

const jwtOTPHash = async (otpHash: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const payload = { otpHash }
    const secretKey = process.env.SECRET_KEY_OTP_JWT as string
    const expiresIn = '10m' // 10 minutos
    jwt.sign(payload, secretKey, { expiresIn }, (error, token) => {
      if (error != null) {
        reject(new Error('Error al generar token para el OTP'))
      } else if (token === undefined) {
        reject(new Error('El token es undefined'))
      } else {
        resolve(token)
      }
    })
  })
}

export { jwtOTPHash }
