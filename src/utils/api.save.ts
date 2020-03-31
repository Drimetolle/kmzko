import axios from 'axios'
import { ConveyorDto, QuestionnaireDto } from '@/types/index'

const request = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/user`,
  timeout: 5000,
})

async function saveQuestionnaire(questionnaire: QuestionnaireDto) {
  try {
    const res = await request.post(`/questionnaires`,{
      headers: {
        'accept': 'application/json',
        'accept-language': 'en_US',
        'content-type': 'application/json',
      },
      body: questionnaire,
    })

    return res
  } catch (error) {
    throw Error(error)
  }
}

async function saveConveyor(conveyor: ConveyorDto) {
  try {
    const res = await request.post(`/questionnaires`,{
      headers: {
        'accept': 'application/json',
        'accept-language': 'en_US',
        'content-type': 'application/json',
      },
      body: conveyor,
    })

    return res
  } catch (error) {
    throw Error(error)
  }
}

export { saveQuestionnaire, saveConveyor }
