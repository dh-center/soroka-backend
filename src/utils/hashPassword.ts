import bcrypt from 'bcryptjs'

const hashPassword = (password: string) : string => bcrypt.hashSync(password, bcrypt.genSaltSync(8))

export default hashPassword
