import bcrypt from 'bcryptjs'

const generateHashToken = (token: string): string => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(token, salt)
  token = hash
  return token
}

const comparePassOrToken = (input: string, hashString: string): boolean => {
  return bcrypt.compareSync(input, hashString)
}

export { generateHashToken, comparePassOrToken }
