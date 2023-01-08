import dotenv from "dotenv"
import { RateLimiterMemory } from "rate-limiter-flexible"
import NextCors from 'nextjs-cors'
import sanitize from 'mongo-sanitize'

import User from "../../models/user"
import { signJwt } from "../../utils/jwtToken"
import connectDb from "../../helpers/db"

connectDb()

dotenv.config()

const secret = process.env.JWT_SECRET!

const opts = {
    points: 6,
    duration: 1
}

const rateLimiter = new RateLimiterMemory(opts)

export default async function login(req: any, res: any) {
    try {
        await NextCors(req, res, {
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200,
        })

        if (req.method === 'POST') {
            await rateLimiter.consume(req.connection.remoteAddress)

            const { email, password } = req.body

            sanitize(email)
            sanitize(password)

            const findUser = await User.findOne({ email }).select('+password')
            if (!findUser) {
                return res.status(401).json({ error: 'User does not exist' })
            }

            const doesPasswordMatch = await findUser.comparePassword(password)
            if (!doesPasswordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' })
            }

            const token = signJwt(findUser, secret)

            res.status(200).json({ success: true, token })
        } else {
            res.status(500).json({ message: 'HTTP method not valid only POST Accepted' })
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
            return res.status(404).json({ error: error.message })
        }
    }
}

export { login }