import { FormConveyor, Conveyor } from '@/types/index'
import { States } from '@/types/states'
import { getConveyorType, getQuestionnaireByType } from '@/utils/api.questionnaire'
import { getConveyor, getConveyors } from '@/utils/api.search'

interface State {
  appState: States
  listOfConveyors: Array<Conveyor>
}

const state = {
  appState: States.QuestionList,
  listOfConveyors: null,
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
}

const actions = {
  async getFormConveyor({ dispatch, commit }: any, { type }: { type: string }): Promise<Array<FormConveyor>> {
    return await getQuestionnaireByType(type)
  },
  async getConveyor({ dispatch, commit }: any, id: number): Promise<Conveyor> {
    return await getConveyor(id)
  },
  async fetchConveyors({ dispatch, commit }: any, payload: Map<string, string>): Promise<Array<Conveyor>> {
    const conveyors = await getConveyors(payload)
    commit('setListOfConveyors', conveyors)
    return conveyors
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
}

export default {
  state,
  getters,
  actions,
  mutations,
}
