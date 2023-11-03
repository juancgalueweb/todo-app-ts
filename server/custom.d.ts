declare namespace Express {
  export interface Request {
    otpHash?: string
    userId?: string
    userEmail?: string
    token?: string
  }
}
