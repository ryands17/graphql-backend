module.exports = {
  Query: {
    animal: () => {
      return {
        type: 'cat',
        lives: 7,
        personality: 'lazy',
      }
    },
    search: () => {
      return [
        { name: 'Ryan', age: 22 },
        {
          type: 'cat',
          lives: 7,
        },
        {
          type: 'dog',
          personality: 'faithful',
        },
      ]
    },
  },
  Animal: {
    __resolveType(parent, ctx, info) {
      if (parent.type === 'cat') {
        return 'Cat'
      } else {
        return 'Dog'
      }
    },
  },
  SearchResult: {
    __resolveType(parent, _, __) {
      if (parent.type === 'cat') {
        return 'Cat'
      } else if (parent.type === 'dog') {
        return 'Dog'
      } else return 'Person'
    },
  },
}
