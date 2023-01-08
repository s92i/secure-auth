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

export default async function signup(req: any, res: any) {
    try {
        await NextCors(req, res, {
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200,
        })

        if (req.method === 'POST') {
            await rateLimiter.consume(req.connection.remoteAddress)

            if (!req.body) return res.status(401).json({ error: 'Fill out the required fields' })

            const { email, password } = req.body

            sanitize(email)
            sanitize(password)

            if (!email || !password) {
                return res.status(401).json({ error: 'Fill out the required fields' })
            }

            if (password.length < 8) {
                return res.status(400).json({ error: 'Password must be at least 8 characters long' })
            }

            await User.findOne({ email }).then((userFound) => { if (userFound) return res.status(422).json({ message: "E-mail already exists" }) })

            return new User({ email, password }).save().then((user) => res.status(201).json({ _id: user._id, email: user.email, token: signJwt(user._id, secret) })).catch((error) => {
                if (error instanceof Error) {
                    console.log(error.message)
                    return res.status(404).json({ error: error.message })
                }
            })
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

export { signup }