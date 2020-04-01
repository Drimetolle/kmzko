import { FormConveyor, Conveyor, OptionalDetail, ConveyorDto } from '@/types/index'
import { States } from '@/types/index'
import { getConveyorType, getQuestionnaireByType } from '@/utils/api.questionnaire'
import { getConveyor, getNearConveyors } from '@/utils/api.search'
import { getOptionsByConveyorType } from '@/utils/api.options'

interface State {
  appState: States
  listOfConveyors: Array<Conveyor>
  questionnaire: Map<string, string>
  conveyor: ConveyorDto
  options: Array<OptionalDetail>
}

const state = {
  appState: States.QuestionList,
  listOfConveyors: null,
  questionnaire: null,
  conveyor: null,
  options: null,
}

const getters = {
  getState(rstate: State): string {
    return rstate.appState
  },
  async getConveyorType() {
    return await getConveyorType()
  },
  getConveyors(rstate: State) {
    return rstate.listOfConveyors
  },
  getConveyorById(rstate: State, id: string) {
    return rstate.listOfConveyors.find(i => i.id === id)
  },
  getConveyor(rstate: State) {
    return rstate.conveyor
  },
  getQuestionnaire(rstate: State) {
    return rstate.questionnaire
  },
}

const actions = {
  async getFormConveyor({ dispatch, commit }: any, { type }: { type: string }): Promise<Array<FormConveyor>> {
    return await getQuestionnaireByType(type)
  },
  async fetchConveyor({ dispatch, commit }: any, id: string): Promise<Conveyor> {
    return await getConveyor(id)
  },
  async fetchConveyors({ dispatch, commit }: any, payload: Map<string, string>): Promise<Array<Conveyor>> {
    const conveyors = await getNearConveyors(payload)
    commit('setListOfConveyors', conveyors)
    return conveyors
  },
  async fetchOptions({ dispatch, commit }: any, { type }: { type: string }): Promise<Array<OptionalDetail>> {
    const options = await getOptionsByConveyorType(type)
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
}

export default {
  state,
  getters,
  actions,
  mutations,
}
