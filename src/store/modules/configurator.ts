/* eslint-disable @typescript-eslint/no-unused-vars */
import { Conveyor, OptionalDetail, ConveyorDto, States, QuestionnaireDto, ConveyorProjectDto } from '@/types/index'
import * as request from '@/utils/request/index'

export class Configurator {
  appState: States
  listOfConveyors: Array<Conveyor>
  questionnaire?: QuestionnaireDto
  conveyor?: ConveyorDto
  options?: Array<OptionalDetail>
  conveyorType?: string

  constructor() {
    this.appState = States.QuestionList
    this.listOfConveyors = new Array<Conveyor>()
  }
}

const getters = {
  getState(state: Configurator): string {
    return state.appState
  },
  getConveyors(state: Configurator): Array<Conveyor> {
    return state.listOfConveyors
  },
  getConveyorById(state: Configurator, id: string): Conveyor | null {
    return state.listOfConveyors.find(i => i.id === id) ?? null
  },
  getConveyor(state: Configurator): ConveyorDto | null {
    return state.conveyor ?? null
  },
  getQuestionnaire(state: Configurator): QuestionnaireDto | null {
    return state.questionnaire ?? null
  },
  getConveyorType(state: Configurator): string | null {
    return state.conveyorType ?? null
  },
  getUserConveyor(state: Configurator): any {
    return { ...state.conveyor, optionalDetails: state.options }
  },
}

const actions = {
  async getFormConveyor({ dispatch, commit }: any, type: string): Promise<QuestionnaireDto> {
    return await request.getQuestionnaireByType(type)
  },
  async fetchConveyor({ dispatch, commit }: any, id: string): Promise<Conveyor> {
    return await request.getConveyor(id)
  },
  async fetchConveyors({ dispatch, commit }: any, payload: QuestionnaireDto): Promise<Array<Conveyor>> {
    const conveyors = await request.getNearConveyors(payload)

    if (conveyors.length === 0) {
      commit('setConveyor', await request.getConveyorTemplate(payload.type))
    }

    commit('setListOfConveyors', conveyors)
    return conveyors
  },
  async fetchOptions({ dispatch, commit }: any, type: string): Promise<Array<OptionalDetail>> {
    const options = await request.getOptionsByConveyorType(type)
    commit('setListOfOptions', options)
    return options
  },
  async fetchProjectById({ dispatch, commit }: any, id: string): Promise<ConveyorProjectDto> {
    const project = await request.getConveyorProjectById(id)
    commit('setQuestionnaire', project.questionnaire)
    commit('setConveyor', project.conveyor)

    return project
  },
}

const mutations = {
  setState(oldState: Configurator, newState: States): void {
    oldState.appState = newState
  },
  throwState(oldState: Configurator): void {
    oldState.appState = States.QuestionList
  },
  setListOfConveyors(oldState: Configurator, listOfConveyors: Array<Conveyor>): void {
    oldState.listOfConveyors = listOfConveyors
  },
  setQuestionnaire(oldState: Configurator, questionnaire: QuestionnaireDto): void {
    oldState.questionnaire = questionnaire
  },
  setConveyor(oldState: Configurator, conveyor: ConveyorDto): void {
    oldState.conveyor = conveyor
  },
  setListOfOptions(oldState: Configurator, options: Array<OptionalDetail>): void {
    oldState.options = options
  },
  setConveyorType(oldState: Configurator, type: string): void {
    oldState.conveyorType = type
  },
}

export default {
  state: new Configurator(),
  getters,
  actions,
  mutations,
}
