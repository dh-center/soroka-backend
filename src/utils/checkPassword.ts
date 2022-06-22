import bcrypt from "bcryptjs"

const checkPassword = (user: any, password: string) => {
    return bcrypt.compareSync(password, user.password)
}

export default checkPassword
