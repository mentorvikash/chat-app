import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';

const secretkey: string | undefined = process.env.SECRETKEY

interface AuthRuquest extends Request {
    user: any;
}

const auth  = async (req: AuthRuquest, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token')
    if (!token) return res.status(400).json({message: 'No token, Authentication denied' })

    try {
        if (typeof secretkey == 'string'){
            const decoded = jwt.verify(token, secretkey)
            req.user = decoded;
            next();
        }
    } catch (error) {
        res.status(500).json({message: "token is not valid"})
        
    }
}

export {auth};