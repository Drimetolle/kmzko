export interface SelectElement {
  text: any
  value: string
}

export class ImplSelectElement implements SelectElement {
  text: any
  value: string

  constructor(text: any, value: string) {
    this.text = text
    this.value = value
  }
}
