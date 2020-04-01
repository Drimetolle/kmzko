import axios from 'axios'
import { ConveyorDto, QuestionnaireDto } from '@/types/index'
import ConveyorMinimizezer from '@/utils/minimizerConveyor'
import QuestionnaireMinimizezer from '@/utils/minimizerQuestionnaire'

const request = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/user`,
  timeout: process.env.VUE_APP_API_BASE_TIMEOUT,
})

async function saveQuestionnaire(questionnaire: QuestionnaireDto) {
  try {
    const res = await request.put(`/questionnaires/${questionnaire.id}`,{
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: new QuestionnaireMinimizezer().minimize(questionnaire),
    })

    return res
  } catch (error) {
    throw Error(error)
  }
}

async function saveConveyor(conveyor: ConveyorDto) {
  try {
    const res = await request.put(`/questionnaires/${conveyor.id}`,{
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: new ConveyorMinimizezer().minimize(conveyor),
    })

    return res
  } catch (error) {
    throw Error(error)
  }
}

export { saveQuestionnaire, saveConveyor }
