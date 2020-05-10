/* eslint-disable @typescript-eslint/no-unused-vars */
import { QuestionnaireDto } from '@/types/index'
import * as request from '@/utils/request/index'

export class Questionnaire {
  listOfQuestionnaire: Array<QuestionnaireDto>

  constructor() {
    this.listOfQuestionnaire = new Array<QuestionnaireDto>()
  }
}

const getters = {

}

const actions = {
}

const mutations = {
  setQuestionnaires(oldState: Questionnaire, questionnaires: Array<QuestionnaireDto>): void {
    oldState.listOfQuestionnaire = questionnaires
  },
}

export default {
  state: new Questionnaire(),
  getters,
  actions,
  mutations,
}
