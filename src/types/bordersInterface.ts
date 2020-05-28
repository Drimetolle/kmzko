export interface Conveyor {
  id: string
  name: string
  nodes: Array<Node>
  img?: string
}

export interface Node {
  id: string
  name: string
  details: Array<Detail>
}

export interface Detail {
  id: string
  name: string
  count: number
  characteristics: Array<CharacteristicDto>
}

export interface OptionalDetail {
  id: string
  name: string
  value: string
  child?: Array<{ id: string, name: string }>
}

export interface User {
  name?: string
  email?: string
  username: string
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
  count: number
  characteristics: Array<CharacteristicDto>
}

export interface CharacteristicDto {
  id: string
  name: string
  value: string
  mark: string
  unit: string
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
  possibleRateValues?: Array<PossibleRateDto>
}

export interface PossibleRateDto {
  id: string
  name: string
}

export interface OptionalDetailDto {
  id: string
  name: string
  value: string
}

export interface TokensDto {
  access_token: string
  refresh_token: string
}

export interface BioDto {
  id: string
  name: string
  email: string
  phone: string
}

export interface ConveyorProjectDto {
  id: string
  conveyor: ConveyorDto
  questionnaire: QuestionnaireDto
}

export interface ConveyorProjectViewDto {
  id: string
  title: string
  conveyor: boolean
  questionnaire: boolean
}
