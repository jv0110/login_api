import { Request, Response } from 'express'
import { users, postUser, editUser, createdUserReturn } from '../types'
import ValidateUser from '../helpers/validateUserData'
import hashPassword from '../helpers/hashPassword'
import UserModel from './users.model'

class UsersController {
  public rootRouter (req: Request, res: Response): Response {
    return res.status(200).json({
      message: 'Welcome!'
    })
  }

  public async getUser (req: Request, res: Response):Promise<Response<users[] | string>> {
    const userId = req.params.userId
    const user:users[] = await UserModel.getUser(userId)

    return !user.length ? res.status(404).send('No user found') : res.status(200).json(user)
  }

  public async getUsers (req: Request, res: Response):Promise<Response<users[] | string >> {
    const users:users[] = await UserModel.getUsers()
    return !users.length ? res.status(404).send('No users found') : res.status(200).json(users)
  }

  public async postUser (req: Request, res: Response):Promise<Response<createdUserReturn | string>> {
    const data: postUser = req.body

    if (Object.keys(data).length < 1) return res.status(400).send('No data was sent')

    switch (true) { // validations for user data
      case !ValidateUser.nameRequired(data.userName):
        return res.send('Name is required')
      case !ValidateUser.emailRequired(data.userEmail):
        return res.send('Email is required')
      case !ValidateUser.passworRequired(data.userPassword):
        return res.send('Password is required')
      case !ValidateUser.validateEmail(data.userEmail):
        return res.send('Invalid email')
      case await ValidateUser.emailExists(data.userEmail):
        return res.send('Email already exists')
    }
    const hash:string = hashPassword(data.userPassword)
    if (!hash) return res.status(500).send('Error hashing password')

    data.userPassword = hash
    data.createdAt = new Date()
    try {
      const user:createdUserReturn = await UserModel.postUser(data)
      return !user ? res.status(500).send('Error posting user') : res.status(201).json(user)
    } catch (err) {
      console.log(err)
    }
  }

  public async editUser (req: Request, res: Response):Promise<Response<editUser | string>> {
    const userId = req.params.userId
    const data: editUser = req.body
    if (Object.keys(data).length < 1) return res.status(200).send('Nothing to update')
    try {
      const user = await UserModel.getUser(userId)
      if (!user.length) return res.status(404).send('User not found')
    } catch (err) {
      console.log(err)
    }
    data.updatedAt = new Date()
    try {
      const update = await UserModel.editUser(userId, data)
      return !update
        ? res.status(500).send('Error updating user')
        : res.status(200).json({
          userId: userId
        })
    } catch (err) {
      console.log(err)
    }
  }
}
export default new UsersController()
