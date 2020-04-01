export interface FormConveyor {
  id: string
  name: string
  value: string
  placeholder?: string
  child?: Array<string>
}

export interface Conveyor {
  id: string
  name: string
  nodes: Array<Node>
  img?: string
}

export interface Node {
  id: string
  name: string
  details: Array<FormConveyor>
}

export interface Detail {
  id: string
  name: string
  characteristics: Array<any>
}

export interface OptionalDetail {
  id: string
  name: string
}

export interface User {
  email: string
  name: string
  password: string
}

export interface ConveyorDto {
  id: string
  name: string
  type: string
  nodes: Array<NodeDto>
  optionalDetails?: Array<OptionalDetailDto>
  img?: string
}

export interface NodeDto {
  id: string
  name: string
  details: Array<Node>
}

export interface DetailDto {
  id: string
  name: string
  characteristics: Array<CharacteristicDto>
}

export interface CharacteristicDto {
  id: string
  name: string
  value: string
  mark: string
  type: string
}

export interface QuestionnaireDto {
  id: string
  name: string
  type: string
  rateList: Array<RateDto>
}

export interface RateDto {
  id: string
  name: string
  value: string
  mark: string
}

export interface OptionalDetailDto {
  id: string
  name: string
}
