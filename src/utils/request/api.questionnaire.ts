import axios from 'axios'
import { QuestionnaireDto } from '@/types/index'

export async function getConveyorTypes(): Promise<Array<string>> {
  try {
    const res = await axios.get('/api/questionnaires/types')
    return res.data
  } catch (error) {
    throw Error(error)
  }
}

export async function getQuestionnaireByType(type: string): Promise<QuestionnaireDto> {
  try {
    const res = await axios.get('/api/questionnaires', { params: { type } })
    return res.data.length === 0 ? { } as QuestionnaireDto : res.data[0] as QuestionnaireDto
  } catch (error) {
    throw Error(error)
  }
}

export async function getAllQuestionnaire(): Promise<Array<QuestionnaireDto>> {
  try {
    const res = await axios.get('/api/questionnaires')
    return res.data as Array<QuestionnaireDto>
  } catch (error) {
    throw Error(error)
  }
}

export async function deployQuestionnaire(questionnaire: QuestionnaireDto): Promise<QuestionnaireDto> {
  try {
    const res = await axios.put(`/api/questionnaires/${questionnaire.id}`, questionnaire)
    return res.data as QuestionnaireDto
  } catch (error) {
    throw Error(error)
  }
}
