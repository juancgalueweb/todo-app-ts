import jwt from 'jsonwebtoken'

/**
 * This function generates a JWT token for a given user ID and email address
 * @param {string} userId - The user ID
 * @param {string} userEmail - The user's email address
 * @returns {Promise<string>} - A Promise that resolves to a JWT token
 */
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
