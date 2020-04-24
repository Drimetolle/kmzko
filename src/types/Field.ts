export default class Field {
  private _init: boolean
  private _unique: boolean
  private _error: string
  value: string

  constructor() {
    this._init = false
    this._unique = false
    this._error = ''
    this.value = ''
  }

  set unique(value: boolean) {
    this._init = true
    this._unique = value
  }

  set error(value: string) {
    this._init = true
    this._error = value
  }

  get init() {
    return this._init
  }

  get getUnique() {
    return this._unique
  }

  get getError() {
    return this._error
  }
}
