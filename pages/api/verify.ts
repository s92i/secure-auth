import dotenv from 'dotenv'

import { verifyJwt } from '../../utils/jwtToken'

dotenv.config()

const secret = process.env.JWT_SECRET!

export default function verify(req: any, res: any) {
    const auth = req.header('Authorization')

    if (!auth)
        return res.status(401).send('Access denied')

    let token = auth.split(' ')[1]

    if (!token)
        return res.status(401).send('Access denied')

    try {
        const verify = verifyJwt(token, secret)
        req.user = verify
        return res.status(200).send('Access granted')
    } catch (err) {
        return res.status(400).send('Invalid token')
    }
}