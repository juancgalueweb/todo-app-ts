import { type Document } from 'mongoose'

export interface IUser extends Document {
  userEmail: string
}

export interface JwtOtpVerificationResponse {
  otpHash: string
  iat: number
  exp: number
}

export interface JwtTokenAppVerificationResponse {
  userId: string
  userEmail: string
  iat: number
  exp: number
}

export interface ICreateUserService {
  success: boolean
  statusCode: number
  msg: string
  userId?: string
  token?: string
}

export interface VerifyEmailProps {
  userId: string
  otp: string
  token: string
}

export interface IVerifyEmail {
  success: boolean
  statusCode: number
  msg: string
  userEmail?: string
  token?: string
  invalidOTP?: boolean
}
