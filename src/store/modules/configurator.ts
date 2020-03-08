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
        { id: '1', value: 'Температура перевозимого груза' },
        { id: '2', value: 'Угол подъема' },
        { id: '3', value: 'Использование: эстакада, галерея, фундамент' },
        { id: '4', value: 'Наименование перевозимого груза', child: ['сахар', 'бетон'] },
        { id: '5', value: 'Скорость ленты' },
        { id: '6', value: 'Длина трассы по горизонтали (м)' },
        { id: '7', value: 'Общая максимальная производительность' },
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
