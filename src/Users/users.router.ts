import { Router } from 'express'
import UsersController from './users.controller'

const prefix = '/api'
const router:Router = Router()

router.get(`${prefix}`, UsersController.rootRouter)
router.get(`${prefix}/user/:userId`, UsersController.getUser)
router.get(`${prefix}/users`, UsersController.getUsers)
router.post(`${prefix}/user`, UsersController.postUser)
router.put(`${prefix}/user/:userId`, UsersController.editUser)

export default router
