export default class Field {
  unique: boolean
  error: string
  value: string

  constructor() {
    this.unique = false
    this.error = ''
    this.value = ''
  }
}
