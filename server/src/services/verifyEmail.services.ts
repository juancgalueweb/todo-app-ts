import { isValidObjectId } from 'mongoose'
import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'
import { compareOTPWithItsHash } from '../helpers/hashOTP'
import { jwtForApp } from '../helpers/jwtForApp'
import UserModel from '../models/user.model'
import type { IVerifyEmail } from '../types/user.types'

export const verifyEmailService = async (
  otp: string,
  userId: string,
  otpHash: string
): Promise<IVerifyEmail> => {
  try {
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

    // Validate the OTP using the token containing its hash
    const isMatched = compareOTPWithItsHash(otp, otpHash)
    if (!isMatched) {
      return {
        success: false,
        statusCode: HttpStatusCode.UNAUTHORIZED,
        msg: MSGS_RESPONSES.VERIFY_EMAIL_INVALID_OTP,
        invalidOTP: true
      }
    }

    // Generate a token for app access and return it with user ID
    const token = await jwtForApp(userId)

    return {
      success: true,
      statusCode: HttpStatusCode.CREATED,
      userEmail: user.userEmail,
      token,
      msg: MSGS_RESPONSES.VERIFY_EMAIL_OK
    }
  } catch (error) {
    // Return an error response if the verification of the email fails
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: MSGS_RESPONSES.VERIFY_EMAIL_ERROR
    }
  }
}
