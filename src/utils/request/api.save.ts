import axios from 'axios'
import { ConveyorDto, QuestionnaireDto } from '@/types/index'
import ConveyorMinimizezer from '@/utils/minimizerConveyor'
import QuestionnaireMinimizezer from '@/utils/minimizerQuestionnaire'

export async function saveQuestionnaire(id: string, questionnaire: QuestionnaireDto): Promise<QuestionnaireDto> {
  try {
    const res = await axios.put<QuestionnaireDto>(`/api/user/projects/${id}/questionnaire`, questionnaire, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
    })

    return res.data
  } catch (error) {
    throw Error(error)
  }
}

export async function saveConveyor(conveyor: ConveyorDto): Promise<ConveyorDto> {
  try {
    const res = await axios.put<ConveyorDto>(`/api/user/questionnaires/${conveyor.id}`, new ConveyorMinimizezer().minimize(conveyor), {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
    })

    return res.data
  } catch (error) {
    throw Error(error)
  }
}
