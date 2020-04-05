import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      loaded: true,
    }
  },
  methods: {
    loading(target: any, name: any, descriptor: any) {
      const original = descriptor.value
      if (typeof original === 'function') {
        descriptor.value = function(...args: any) {
          target.data().loaded = false  //
          try {
            const result = original.apply(this, args)
            target.data().loaded = true //
            return result
          } catch (e) {
            throw e
          }
        }
      }
      return descriptor
    },
  },
})
