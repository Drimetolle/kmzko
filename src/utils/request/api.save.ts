import axios from 'axios'
import { ConveyorDto, QuestionnaireDto } from '@/types/index'
import ConveyorMinimizezer from '@/utils/minimizerConveyor'
import QuestionnaireMinimizezer from '@/utils/minimizerQuestionnaire'

export async function saveQuestionnaire(questionnaire: QuestionnaireDto): Promise<QuestionnaireDto> {
  try {
    let res = null

    if (questionnaire.id !== '') {
      res = await axios.put(`/api/user/questionnaires/${questionnaire.id}`, new QuestionnaireMinimizezer().minimize(questionnaire), {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        },
      })
    }
    else {
      res = await axios.post('/api/user/questionnaires', new QuestionnaireMinimizezer().minimize(questionnaire), {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        },
      })
    }

    return res.data
  } catch (error) {
    throw Error(error)
  }
}

export async function saveConveyor(conveyor: ConveyorDto): Promise<ConveyorDto> {
  try {
    const res = await axios.put(`/api/user/questionnaires/${conveyor.id}`, new ConveyorMinimizezer().minimize(conveyor), {
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
