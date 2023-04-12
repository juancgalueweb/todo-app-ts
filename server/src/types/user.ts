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
