import Knex from 'knex'
import ConnectDb from '../database/db'
import { users, postUser, editUser, createdUserReturn } from '../types'

class UserModel {
  private db: Knex

  public constructor () {
    this.db = ConnectDb
  }

  public async getUser (userId: string):Promise<users[] | []> {
    try {
      return await this.db
        .select(['userID', 'userName', 'userEmail', 'userPassword'])
        .from('user')
        .where({ userId })
    } catch (err) {
      console.log(err)
    }
  }

  public async getUserByEmail (userEmail: string):Promise<users[] | []> {
    try {
      return await this.db
        .select(['userID', 'userName', 'userEmail'])
        .from('user')
        .where({ userEmail })
    } catch (err) {
      console.log(err)
    }
  }

  public async getUsers ():Promise<users[] | []> {
    try {
      return await this.db
        .select(['userId', 'userName', 'userEmail', 'userPassword'])
        .from('user')
    } catch (err) {
      console.log(err)
    }
  }

  public async postUser (data: postUser):Promise<createdUserReturn> {
    try {
      const user = await this.db
        .insert(data)
        .into('user')
      return {
        userId: user[0],
        userEmail: data.userEmail
      }
    } catch (err) {
      console.log(err)
    }
  }

  public async editUser (userId: string, data: editUser) {
    try {
      await this.db
        .table('user')
        .where({ userId })
        .update(data)
      return {
        userId: userId
      }
    } catch (err) {
      console.log(err)
    }
  }
}
export default new UserModel()
