import { type Document } from 'mongoose'

export interface IUser extends Document {
  userEmail: string
}

export interface JwtOtpVerificationResponse {
  userId: string
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
  token?: string
}

export interface IVerifyEmail {
  success: boolean
  statusCode: number
  msg: string
  userEmail?: string
  tokenApp?: string
  invalidOTP?: boolean
}
