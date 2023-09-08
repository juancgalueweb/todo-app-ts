import jwt, { type JwtPayload } from 'jsonwebtoken'
import { isValidObjectId } from 'mongoose'
import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'
import { compareOTPWithItsHash } from '../helpers/hashOTP'
import { jwtForApp } from '../helpers/jwtForApp'
import UserModel from '../models/user.model'
import type {
  IVerifyEmail,
  JwtOtpVerificationResponse,
  VerifyEmailProps
} from '../types/user'

export const verifyEmailService = async (
  userData: VerifyEmailProps
): Promise<IVerifyEmail> => {
  try {
    const { userId, token, otp } = userData

    // Validate user ID and OTP
    if (userId === '' || otp.trim().length === 0) {
      return {
        success: false,
        statusCode: HttpStatusCode.UNAUTHORIZED,
        msg: MSGS_RESPONSES.VERIFY_EMAIL_INVALID_REQ
      }
    }

    // Check if userId is a valid mongoose id
    if (!isValidObjectId(userId)) {
      return {
        success: false,
        statusCode: HttpStatusCode.UNAUTHORIZED,
        msg: MSGS_RESPONSES.VERIFY_EMAIL_INVALID_USER
      }
    }

    // Check if user exists in the database
    const user = await UserModel.findById(userId)
    if (user === null) {
      return {
        success: false,
        statusCode: HttpStatusCode.UNAUTHORIZED,
        msg: MSGS_RESPONSES.VERIFY_EMAIL_USER_NOT_FOUND
      }
    }

    const secretKey = process?.env?.SECRET_KEY_OTP_JWT
    // Validate the OTP using the token containing its hash
    if (typeof secretKey === 'string') {
      const { otpHash } = jwt.verify(
        token,
        secretKey
      ) as JwtOtpVerificationResponse & JwtPayload
      const isMatched = compareOTPWithItsHash(otp, otpHash)
      if (!isMatched) {
        return {
          success: false,
          statusCode: HttpStatusCode.UNAUTHORIZED,
          msg: MSGS_RESPONSES.VERIFY_EMAIL_INVALID_OTP,
          invalidOTP: true
        }
      }
    }

    // Generate a token for app access and return it with user ID
    const appToken = await jwtForApp(userId)
    return {
      success: true,
      statusCode: HttpStatusCode.CREATED,
      userEmail: user.userEmail,
      token: appToken,
      msg: MSGS_RESPONSES.VERIFY_EMAIL_OK
    }
  } catch (error) {
    // If the token is not valid or missing, send an error response to the client
    if (error instanceof jwt.JsonWebTokenError) {
      return {
        success: false,
        statusCode: HttpStatusCode.UNAUTHORIZED,
        msg: MSGS_RESPONSES.VERIFY_EMAIL_JWT_ERROR
      }
    } else {
      // Return an error response if the verification of the email fails
      return {
        success: false,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        msg: MSGS_RESPONSES.VERIFY_EMAIL_ERROR
      }
    }
  }
}
