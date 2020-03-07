export interface FormConveyor {
  id: string
  value: string
  placeholder?: string
  child?: Array<string>
}

export interface ConveyorLight {
  id: string
  name: string
  components: Array<string>
}

export interface Conveyor {
  id: string
  name: string
  nodes: Array<Node>
}

export interface Node {
  id: string
  name: string
  details: Array<FormConveyor>
}

export interface Detail {
  id: string
  name: string
  characteristics: string
}