import type { Request } from 'express'

export interface AuthRequest extends Request {
  otpHash?: string
  userId?: string
  userEmail?: string
  token?: string
}
