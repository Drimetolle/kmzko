import { FormConveyor, Conveyor } from '@/types/index'
import { States } from '@/types/states'
import { getConveyorType, getQuestionnaireByType } from '@/utils/api.questionnaire'
import { getConveyor } from '@/utils/api.search'

interface State {
  appState: States
}

const state = {
  appState: States.QuestionList,
}

const getters = {
  getState(rstate: State): string {
    return rstate.appState
  },
  async getConveyorType() {
    return await getConveyorType()
  },
}

const actions = {
  async getFormConveyor({ dispatch, commit }: any, { type }: { type: string }): Promise<Array<FormConveyor>> {
    return await getQuestionnaireByType(type)
  },
  async getConveyor({ dispatch, commit }: any): Promise<Conveyor> {
    return await getConveyor()
  },
}

const mutations = {
  setState(oldState: State, newState: States) {
    oldState.appState = newState
  },
  throwState(oldState: State) {
    oldState.appState = States.QuestionList
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
