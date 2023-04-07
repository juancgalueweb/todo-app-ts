import { type Request, type Response } from 'express'
import UserModel from '../models/user'
import { type IUser } from '../types/user'

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: IUser = req.body
    const userExists = await UserModel.findOne({
      userEmail: userData.userEmail
    })
    if (userExists != null) {
      res.status(409).json({ message: 'User already exists', success: false })
      return
    }
    const newUser = new UserModel(userData)
    await newUser.save()
    res.status(201).json({
      message: 'User created successfully',
      data: newUser,
      success: true
    })
  } catch (error) {
    res.status(500).json({ msg: 'Unable to create user', success: false })
  }
}

export { createUser }
