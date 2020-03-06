export interface FormConveyor {
  id: string
  value: string
  placeholder: string
  child?: Array<string>
}

export interface Conveyor {
  id: number
  name: string
  components: Array<string>
}