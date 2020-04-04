export class FieldSkelet {
  id: string
  name: string
  value: string
  child?: Array<any>

  constructor(id: string, name: string, value: string, child?: Array<any>) {
    this.id = id
    this.name = name
    this.value = value
    this.child = child
  }
}
