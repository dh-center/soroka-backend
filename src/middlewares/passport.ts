import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserService from '../services/users/User'
import Domain from '../models/domains/Domain'
import jwt from 'jsonwebtoken'
import { Strategy } from 'passport-strategy'
import process from 'process'

const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME as unknown as number || 300000

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'soroka',
    jsonWebTokenOptions: {
        maxAge: `${ACCESS_TOKEN_LIFETIME}ms`
    }
}

const customJwtStrategy = new JwtStrategy(opts, async function(jwt_payload, next) {
    const userService = new UserService()

    const user = await userService.getById(jwt_payload.id)

    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})


const whitelistedRoutes = ['cards', 'cards/by-first-organization', 'cards/by-org', 
                           'cards/properties', 'organizations']
// Custom Strategy
class CustomStrategy extends Strategy {
    async authenticate (this: any, req: any, options: any) {
        try {
            if (req.headers.authorization) {
                // if *auth token* => check or error -> pass
                // decypher the token
                const splitted = req.headers.authorization.split(' ')
                const verifyRes: any = jwt.verify(splitted[1], opts.secretOrKey)
                
                // try find a user
                const userService = new UserService()
                const user = await userService.getById(verifyRes.id)
                
                user ? this.success(user) : this.fail()
            } else if (req.headers['domain-token'] && req.method === "GET") {
                const apiPrefixLength = Number(process.env.API_PREFIX?.length)
                let route = req.originalUrl.slice(apiPrefixLength + 1)
                if (route.includes("cards/by-org")) route = "cards/by-org" // truncate id to unify
                
                // check if request is in the whitelist
                if (!whitelistedRoutes.includes(route)) return this.fail()

                // check if origin === domain in the model
                const domain = await Domain.findOne({where: {token: req.headers['domain-token']}})
                if (req.hostname != domain?.domain) return this.fail()
                this.success(null, { domain: req.hostname})
            } else {
                this.fail()
            }       
        } catch(e) {
            console.log("auth error: ", e)
            this.error(e)
        } 
    }
}

const authAndNoAuth = new CustomStrategy()

passport.use('authAndNoAuth', authAndNoAuth)
passport.use(customJwtStrategy)

export { opts as jwtOptions }

export default passport
