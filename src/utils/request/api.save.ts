import { ConveyorDto, QuestionnaireDto } from '@/types/index'
import ConveyorMinimizezer from '@/utils/minimizers/minimizerConveyor'
import axios from 'axios'

export async function saveUserQuestionnaire(id: string, questionnaire: QuestionnaireDto): Promise<QuestionnaireDto> {
  try {
    const res = await axios.put<QuestionnaireDto>(`/api/user/projects/${id}/questionnaire`, questionnaire)

    return res.data
  } catch (error) {
    throw Error(error)
  }
}

export async function saveTemplateQuestionnaire(questionnaire: QuestionnaireDto): Promise<QuestionnaireDto> {
  try {
    const res = await axios.put<QuestionnaireDto>('/api/user/questionnaire', questionnaire)

    return res.data
  } catch (error) {
    throw Error(error)
  }
}

export async function saveConveyor(conveyor: ConveyorDto): Promise<ConveyorDto> {
  try {
    const res = await axios.put<ConveyorDto>(`/api/user/questionnaires/${conveyor.id}`, new ConveyorMinimizezer().minimize(conveyor))

    return res.data
  } catch (error) {
    throw Error(error)
  }
}
