import axios from 'axios'
import { Conveyor, QuestionnaireDto } from '@/types/index'

const request = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/questionnaire`,
  timeout: process.env.VUE_APP_API_BASE_TIMEOUT,
})

async function getConveyorTypes(): Promise<Array<string>> {
  try {
    const res = await request.get('/types')
    return res.data
  } catch (error) {
    throw Error(error)
  }
}

async function getQuestionnaireByType(type: string): Promise<QuestionnaireDto> {
  try {
    const res = await request.get(`/${type}`)
    return res.data as QuestionnaireDto
  } catch (error) {
    throw Error(error)
  }
}

async function getAllQuestionnaire(): Promise<Array<QuestionnaireDto>> {
  try {
    const res = await request.get(``)
    return res.data as Array<QuestionnaireDto>
  } catch (error) {
    throw Error(error)
  }
}

async function deployQuestionnaire(questionnaire: QuestionnaireDto): Promise<QuestionnaireDto> {
  try {
    const res = await request.put(`/${questionnaire.id}`, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: questionnaire,
    })
    return res.data as QuestionnaireDto
  } catch (error) {
    throw Error(error)
  }
}

export { getConveyorTypes, getQuestionnaireByType, getAllQuestionnaire, deployQuestionnaire }
