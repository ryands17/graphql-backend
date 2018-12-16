const { hashPassword, compareHash, createJWTToken } = require('../config/utils')
const {
  ServerError,
  UserExistsError,
  IncorrectUserError,
} = require('../config/errors')

module.exports = {
  Mutation: {
    signup: async (_, args, ctx) => {
      let userCount = await ctx
        .db('users')
        .where({ email: args.email })
        .count('id as count')
      if (userCount[0].count > 0) {
        throw new UserExistsError()
      }
      let hashedPassword = await hashPassword(args.password)
      try {
        await ctx.db('users').insert({
          ...args,
          password: hashedPassword,
        })
      } catch (e) {
        throw new ServerError()
      }
      return true
    },
    login: async (_, { credentials: { email, password } }, ctx) => {
      let user = await ctx
        .db('users')
        .where({ email })
        .first()
      if (!user) {
        throw new IncorrectUserError()
      }
      let passwordMatches = await compareHash(password, user.password)
      if (!passwordMatches) {
        throw new IncorrectUserError()
      }
      let token = await createJWTToken({ email: user.email, id: user.id })
      return { token }
    },
  },
}
