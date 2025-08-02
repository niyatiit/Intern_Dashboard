import {Router} from 'express'
import { getDashboardData, login, logout, register } from '../controllers/user.controller.js';

const router = Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/dashboard").post(getDashboardData)


export {router}