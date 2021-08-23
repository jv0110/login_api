import bcrypt from 'bcryptjs'

export default function hashPassword (password: string): string {
  const salt = bcrypt.genSaltSync(11)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}
