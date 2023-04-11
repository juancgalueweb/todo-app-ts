import jwt from 'jsonwebtoken'

const jwtVerifyEmail = async (otpHash: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const payload = { otpHash }
    jwt.sign(
      payload,
      process.env.SECRET_KEY as string,
      { expiresIn: 600 }, // esos son 600 segundos, 10 minutos
      (error, token) => {
        if (error != null) {
          reject(new Error('Error verifying the otp token'))
        } else if (token !== undefined) {
          resolve(token)
        } else {
          reject(new Error('Token is undefined'))
        }
      }
    )
  })
}

export { jwtVerifyEmail }
