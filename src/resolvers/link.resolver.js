const { verifyToken } = require('../config/utils')

module.exports = {
  Query: {
    feed: async (_, __, ctx) => {
      let { id: userId } = await verifyToken(ctx.token)
      const rows = await ctx.db
        .select()
        .from('links')
        .where({ user_id: userId })
      return rows
    },
    /* link: async (_, { id }, ctx) => {
      let link = await ctx
        .db('links')
        .where({ id })
        .first()
      return link || null
    }, */
  },
  Mutation: {
    post: async (_, args, ctx) => {
      let { id: userId } = await verifyToken(ctx.token)
      let link = {
        ...args,
        user_id: userId,
      }
      let id = await ctx.db('links').insert(link)
      link.id = id[0]
      return link
    },
    updateLink: async (_, { id, ...rest }, ctx) => {
      let { id: userId } = await verifyToken(ctx.token)
      let i = await ctx
        .db('links')
        .where({ id, user_id: userId })
        .update(rest)
      if (i <= 0) return null
      let updatedLink = await ctx
        .db('links')
        .where({ id, user_id: userId })
        .first()
      return updatedLink
    },
    deleteLink: async (_, { id }, ctx) => {
      let { id: userId } = await verifyToken(ctx.token)
      let deletedLink = await ctx
        .db('links')
        .where({ id, user_id: userId })
        .first()
      let i = await ctx
        .db('links')
        .where({ id, user_id: userId })
        .del()
      return i > 0 ? deletedLink : null
    },
  },
  Link: {
    userId: root => root.user_id,
  },
}
