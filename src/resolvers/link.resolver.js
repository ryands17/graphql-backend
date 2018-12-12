module.exports = {
  Query: {
    feed: async (_, __, ctx) => {
      const rows = await ctx.db.select().from('links')
      return rows
    },
    link: async (_, { id }, ctx) => {
      let link = await ctx
        .db('links')
        .where({ id })
        .first()
      return link || null
    },
  },
  Mutation: {
    post: async (_, args, ctx) => {
      let id = await ctx.db('links').insert(args)
      return {
        id: id[0],
        ...args,
      }
    },
    updateLink: async (_, { id, ...rest }, ctx) => {
      let i = await ctx
        .db('links')
        .where({ id })
        .update(rest)
      if (i <= 0) return null
      let updatedLink = await ctx
        .db('links')
        .where({ id })
        .first()
      return updatedLink
    },
    deleteLink: async (_, { id }, ctx) => {
      let deletedLink = await ctx
        .db('links')
        .where({ id })
        .first()
      let i = await ctx
        .db('links')
        .where({ id })
        .del()
      return i > 0 ? deletedLink : null
    },
  },
  /* not required as gql resolves this automatically */
  // Link: {
  //   id: root => root.id,
  //   description: root => root.description,
  //   url: root => root.url,
  // },
}
