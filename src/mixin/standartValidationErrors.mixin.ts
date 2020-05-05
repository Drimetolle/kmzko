/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class StandartValidationErrorsMixin extends Vue {
  nameErrors(target: any): string {
    if (!target.$dirty) return ''
    if (!target.required) return 'Field is required'
    return ''
  }

  usernameErrors(target: any): string {
    if (!target.$dirty) return ''
    if (!target.required) return 'Field is required'
    if (!target.minLength) return `Field min length is ${target.$params.minLength.min}`
    return ''
  }

  passwordErrors(target: any): string {
    if (!target.$dirty) return ''
    if (!target.required) return 'Field is required'
    if (!target.minLength) return `Field min length is ${target.$params.minLength.min}`
    return ''
  }

  secondpasswordErrors(target: any): string {
    if (!target.$dirty) return ''
    if (!target.sameAsPassword) return 'sameAsPassword'
    return ''
  }
}
