export interface users{
  userId: number,
  userName: string,
  userEmail: string,
  userPassowrd: string
}

export interface postUser{
  userName: string,
  userEmail: string,
  userPassword: string,
  createdAt?: Date
}

export interface editUser{
  userId?: string | number,
  userName?: string,
  userEmail?: string,
  userPassword?: string,
  updatedAt: Date
}

export interface createdUserReturn{
  userId: string | number,
  userEmail: string
}
