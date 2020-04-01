import { FormConveyor, Conveyor, OptionalDetail, ConveyorDto } from '@/types/index'
import { States } from '@/types/index'
import * as request from '@/utils/request/index'

class State {
  appState: States
  listOfConveyors: Array<Conveyor>
  questionnaire?: Map<string, string>
  conveyor?: ConveyorDto
  options?: Array<OptionalDetail>
  // conveyorType?: string

  constructor() {
    this.appState = States.QuestionList
    this.listOfConveyors = new Array<Conveyor>()
  }
}

const getters = {
  getState(state: State): string {
    return state.appState
  },
  getConveyors(state: State) {
    return state.listOfConveyors
  },
  getConveyorById(state: State, id: string) {
    return state.listOfConveyors.find(i => i.id === id)
  },
  getConveyor(state: State) {
    return state.conveyor
  },
  getQuestionnaire(state: State) {
    return state.questionnaire
  },
  getConveyorType(state: State) {
    return state.conveyor?.type
  },
}

const actions = {
  async getFormConveyor({ dispatch, commit }: any, { type }: { type: string }): Promise<Array<FormConveyor>> {
    return await request.getQuestionnaireByType(type)
  },
  async fetchConveyor({ dispatch, commit }: any, id: string): Promise<Conveyor> {
    return await request.getConveyor(id)
  },
  async fetchConveyors({ dispatch, commit }: any, payload: Map<string, string>): Promise<Array<Conveyor>> {
    const conveyors = await request.getNearConveyors(payload)
    commit('setListOfConveyors', conveyors)
    return conveyors
  },
  async fetchOptions({ dispatch, commit }: any, { type }: { type: string }): Promise<Array<OptionalDetail>> {
    const options = await request.getOptionsByConveyorType(type)
    commit('setListOfOptions', options)
    return options
  },
}

const mutations = {
  setState(oldState: State, newState: States) {
    oldState.appState = newState
  },
  throwState(oldState: State) {
    oldState.appState = States.QuestionList
  },
  setListOfConveyors(oldState: State, listOfConveyors: Array<Conveyor>) {
    oldState.listOfConveyors = listOfConveyors
  },
  setQuestionnaire(oldState: State, questionnaire: Map<string, string>) {
    oldState.questionnaire = questionnaire
  },
  setConveyor(oldState: State, conveyor: ConveyorDto) {
    oldState.conveyor = conveyor
  },
  setListOfOptions(oldState: State, options: Array<OptionalDetail>) {
    oldState.options = options
  },
  // setConveyorType(oldState: State, type: string) {
  //   oldState.conveyorType = type
  // },
}

export default {
  state: new State(),
  getters,
  actions,
  mutations,
}
