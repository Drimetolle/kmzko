import { FormConveyor, Conveyor } from '@/types/index'
import { States } from '@/types/states'
import { getConveyorType, getQuestionnaireByType } from '@/utils/api.questionnaire'
import { getConveyor, getNearConveyors } from '@/utils/api.search'

interface State {
  appState: States
  listOfConveyors: Array<Conveyor>
  questionnaire: Map<string, string>
}

const state = {
  appState: States.QuestionList,
  listOfConveyors: null,
  questionnaire: null,
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
  getQuestionnaire(rstate: State) {
    return rstate.questionnaire
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
    const conveyors = await getNearConveyors(payload)
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
  setQuestionnaire(oldState: State, questionnaire: Map<string, string>) {
    oldState.questionnaire = questionnaire
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
