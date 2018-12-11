let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
]

let idCount = links.length

module.exports = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (_, { id }) => {
      try {
        let link = links.find(l => l.id === id)
        return link || null
      } catch (e) {
        return null
      }
    },
  },
  Mutation: {
    post: (_, { url, description }) => {
      let link = {
        id: `link-${idCount++}`,
        description,
        url,
      }
      links.push(link)
      return link
    },
    updateLink: (_, { id, ...rest }) => {
      let index = links.findIndex(l => l.id === id)
      if (index === -1) return null
      console.log('l', links[index])
      let newLink = {
        ...links[index],
        ...rest,
      }
      links[index] = newLink
      return newLink
    },
    deleteLink: (_, { id }) => {
      let index = links.findIndex(l => l.id === id)
      if (index === -1) return null
      return links.splice(index, 1)[0]
    },
  },
  /* not required as gql resolves this automatically */
  // Link: {
  //   id: root => root.id,
  //   description: root => root.description,
  //   url: root => root.url,
  // },
}
