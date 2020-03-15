import { FormConveyor } from '@/types/index'
import { States } from '@/types/states'

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
}

const actions = {
  async getFormConveyor({ type }: any) {
    return new Promise((resolve) => {
      const result: Array<FormConveyor> = [
        { id: '1', name: 'Температура перевозимого груза', value: 'test' },
        { id: '2', name: 'Угол подъема', value: '' },
        { id: '3', name: 'Использование: эстакада, галерея, фундамент', value: '' },
        { id: '4', name: 'Наименование перевозимого груза', value: ''},
        { id: '5', name: 'Скорость ленты', value: '' },
        { id: '6', name: 'Длина трассы по горизонтали (м)', value: '' },
        { id: '7', name: 'Общая максимальная производительность', value: '' },
      ]
      setTimeout(() => resolve(result), 200)
    })
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
