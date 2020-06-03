import axios from 'axios'
import { Conveyor, QuestionnaireDto } from '@/types/index'
import QuestionnaireParamsMinimizer from '@/utils/minimizers/minimizerQuestionnaireParams'

const minimize = (questionnaire: QuestionnaireDto): object => (new QuestionnaireParamsMinimizer()).minimize(questionnaire)


export async function getConveyor(id: string): Promise<Conveyor> {
  try {
    const res = await axios.get<Conveyor>(`/api/search/conveyors/${id}`)
    return res.data
  } catch (error) {
    throw Error(error)
  }
}

export async function getNearConveyors(payload: QuestionnaireDto): Promise<Array<Conveyor>> {
  try {
    const res = await axios.get<Array<Conveyor>>('/api/search/conveyors', {
      params: minimize(payload),
    })
    return res.data
  } catch (error) {
    throw Error(error)
  }
}
