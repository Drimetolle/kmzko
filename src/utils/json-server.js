const service = {
    getComplect () {
        return [
            { type: 'engine', name: 'v8', price: 666 },
            { type: 'engine', name: 'v7', price: 666 }
        ]
    }
}

export default service

/**
 * 1.
 * [
 *  {
 *      type: 'engine',
 *      name: 'v8',
 *      price: 666,
 *      ???: ???
 *  },
 *  {
 *      type: 'engine',
 *      name: 'v6',
 *      price: 666,
 *      ???: ???
 *  }
 * ]
 * 2.
 * {
 *
 * }
 */
