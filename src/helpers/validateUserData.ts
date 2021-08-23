import userModel from '../Users/users.model'

class ValidateUser {
  static validateEmail (email:string):boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  static async emailExists (email:string):Promise<boolean> {
    try {
      const user = await userModel.getUserByEmail(email)
      return !!user.length
    } catch (err) {
      console.log(err)
    }
  }

  static nameRequired (name: string):boolean {
    return !!name
  }

  static emailRequired (email: string):boolean {
    return !!email
  }

  static passworRequired (password: string):boolean {
    return !!password
  }
}
export default ValidateUser
