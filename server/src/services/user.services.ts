import Isemail from 'isemail'
import { HttpStatusCode } from '../constants/http'
import { MSGS_RESPONSES } from '../constants/msgs'
import { generateHashOTP } from '../helpers/hashOTP'
import { jwtOTPHash } from '../helpers/jwtOTPHash'
import {
  generateOTP,
  generateSendOTPTemplate,
  mailTransport
} from '../helpers/mailVerify'
import UserModel from '../models/user.model'
import type { ICreateUserService, IUser } from '../types/user.types'

export const createUserService = async (
  userData: IUser
): Promise<ICreateUserService> => {
  try {
    // Extract user data
    const { userEmail } = userData

    // Check email format
    if (!Isemail.validate(userEmail)) {
      return {
        success: false,
        msg: MSGS_RESPONSES.USER_EMAIL_NOT_VALID,
        statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY
      }
    }

    // Check if user already exists in the database
    const userExists = await UserModel.findOne({
      userEmail
    })
    if (userExists === null) {
      await UserModel.create({ userEmail })
    }

    // Get the user from the database
    const userFromDB = await UserModel.findOne({ userEmail })

    // Generate OTP and send it via email
    const OTP = generateOTP()
    mailTransport(
      MSGS_RESPONSES.USER_OTP_MAILTRANSPORT_MSG,
      userEmail,
      generateSendOTPTemplate(OTP)
    )

    // Generate a hash of the OTP and create a JWT containing the hash
    const hashOTP = generateHashOTP(OTP)
    const tokenOTP = await jwtOTPHash(hashOTP)

    return {
      success: true,
      statusCode: HttpStatusCode.CREATED,
      msg: MSGS_RESPONSES.USER_OTP_DELIVERED,
      userId: userFromDB?._id,
      token: tokenOTP
    }
  } catch (error) {
    return {
      success: false,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      msg: MSGS_RESPONSES.USER_ERROR
    }
  }
}
