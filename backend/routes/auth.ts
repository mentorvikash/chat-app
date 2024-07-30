import { Router } from 'express'
import {auth} from '../middlewares/auth'
import { registration, login, refreshToken } from '../controllers/auth'

const router = Router()

router.post("/signup", registration)
router.post("/login", login)
router.post("/refresh-token", refreshToken)

export default router;