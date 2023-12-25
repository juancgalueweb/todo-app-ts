import jwt from 'jsonwebtoken'
import { MSGS_RESPONSES } from '../constants/msgs'

/**
 * This function generates a JWT token for a given user ID and email address
 * @param {string} userId - The user ID
 * @returns {Promise<string>} - A Promise that resolves to a JWT token
 */
const jwtForApp = async (userId: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const payload = { userId }
    const secretKey = process?.env.SECRET_KEY_APP_USE_JWT as string

    jwt.sign(payload, secretKey, { expiresIn: '30d' }, (error, token) => {
      if (error != null) {
        reject(new Error(MSGS_RESPONSES.JWT_FOR_APP_ERROR1))
      } else if (token !== undefined) {
        resolve(token)
      } else {
        reject(new Error(MSGS_RESPONSES.JWT_FOR_APP_ERROR2))
      }
    })
  })
}

export { jwtForApp }
