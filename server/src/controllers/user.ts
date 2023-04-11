import { type Request, type Response } from 'express'
import { generateHashToken } from '../helpers/hashToken'
import { jwtVerifyEmail } from '../helpers/jwtVerifyEmail'
import {
  generateOTP,
  generateSendOTPTemplate,
  mailTransport
} from '../helpers/mailVerify'
import UserModel from '../models/user'
import { type IUser } from '../types/user'

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: IUser = req.body
    const userExists = await UserModel.findOne({
      userEmail: userData.userEmail
    })
    if (userExists === null) {
      const newUser = new UserModel(userData)
      await newUser.save()
    }
    const OTP = generateOTP()
    mailTransport(
      'Necesita ingresar este OTP para usar la APP',
      userData.userEmail,
      generateSendOTPTemplate(OTP)
    )

    const hashOTP = generateHashToken(OTP)
    const jwtToken = await jwtVerifyEmail(hashOTP)

    res.status(201).json({
      message: 'User created successfully/OTP delivered',
      user: userData.userEmail,
      success: true,
      token: jwtToken
    })
  } catch (error) {
    res.status(500).json({ msg: 'Unable to create user', success: false })
  }
}

export { createUser }
