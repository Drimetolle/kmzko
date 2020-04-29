import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class StandartValidationErrorsMixin extends Vue {
  nameErrors(target: any) {
    if (!target.$dirty) return ''
    if (!target.required) return `Field is required`
  }

  usernameErrors(target: any) {
    if (!target.$dirty) return ''
    if (!target.required) return `Field is required`
    if (!target.minLength) return `Field min length is ${target.$params.minLength.min}`
  }

  passwordErrors(target: any) {
    if (!target.$dirty) return ''
    if (!target.required) return `Field is required`
    if (!target.minLength) return `Field min length is ${target.$params.minLength.min}`
  }

  secondpasswordErrors(target: any) {
    if (!target.$dirty) return ''
    if (!target.sameAsPassword) return `sameAsPassword`
  }
}
