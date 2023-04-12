import jwt from 'jsonwebtoken'

const jwtForApp = async (
  userId: string,
  userEmail: string
): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const payload = { userId, userEmail }
    jwt.sign(
      payload,
      process.env.SECRET_KEY_APP_USE_JWT as string,
      { expiresIn: '7 days' },
      (error, token) => {
        if (error != null) {
          reject(new Error('Error al generar token para la App'))
        } else if (token !== undefined) {
          resolve(token)
        } else {
          reject(new Error('El token es undefined'))
        }
      }
    )
  })
}

export { jwtForApp }
