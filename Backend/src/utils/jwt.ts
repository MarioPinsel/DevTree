import jwt, { JwtPayload } from 'jsonwebtoken';

export const genareteJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '180d'
    })
    return token;
}