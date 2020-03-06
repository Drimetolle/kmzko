import { FormConveyor } from '@/types/index'

const state = {}

const getters = {}

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

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations,
}
