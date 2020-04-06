import Vue from 'vue'
import Component, { createDecorator } from 'vue-class-component'

@Component
export default class LoadingMixin extends Vue {
  loaded = true
}

export const AsyncLoading = createDecorator((options: any, key: string) => {
  let originalMethod: VoidFunction

  if (key === 'mounted') {
    originalMethod = options.mounted
    options.mounted = async function wrapperMethod(...args: any) {
      this.loaded = false
      await originalMethod.apply(this, args)
      this.loaded = true
    }
  }
  else if (key === 'created') {
    originalMethod = options.created
    options.created = async function wrapperMethod(...args: any) {
      this.loaded = false
      await originalMethod.apply(this, args)
      this.loaded = true
    }
  }
  else {
    originalMethod = options.methods[key]
    options.methods[key] = async function wrapperMethod(...args: any) {
      this.loaded = false
      await originalMethod.apply(this, args)
      this.loaded = true
    }
  }
})

export const Loading = createDecorator((options: any, key: string) => {
  let originalMethod: VoidFunction

  if (key === 'mounted') {
    originalMethod = options.mounted
    options.mounted = function wrapperMethod(...args: any) {
      this.loaded = false
      originalMethod.apply(this, args)
      this.loaded = true
    }
  }
  else if (key === 'created') {
    originalMethod = options.created
    options.created = function wrapperMethod(...args: any) {
      this.loaded = false
      originalMethod.apply(this, args)
      this.loaded = true
    }
  }
  else {
    originalMethod = options.methods[key]
    options.methods[key] = function wrapperMethod(...args: any) {
      this.loaded = false
      originalMethod.apply(this, args)
      this.loaded = true
    }
  }
})

// export const Log = createDecorator((options, key) => {
//   // Keep the original method for later.
//   const originalMethod = options.methods[key]

//   // Wrap the method with the logging logic.
//   options.methods[key] = function wrapperMethod(...args) {
//     // Print a log.
//     console.log(`Invoked: ${key}(`, ...args, ')')

//     // Invoke the original method.
//     originalMethod.apply(this, args)
//   }
// })
