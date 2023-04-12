import jwt from 'jsonwebtoken'

const jwtOTPHash = async (otpHash: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const payload = { otpHash }
    jwt.sign(
      payload,
      process.env.SECRET_KEY_OTP_JWT as string,
      { expiresIn: 600 }, // esos son 600 segundos, 10 minutos
      (error, token) => {
        if (error != null) {
          reject(new Error('Error al generar token para el OTP'))
        } else if (token !== undefined) {
          resolve(token)
        } else {
          reject(new Error('El token es undefined'))
        }
      }
    )
  })
}

export { jwtOTPHash }
