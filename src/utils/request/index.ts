import { getConveyorTypes, getQuestionnaireByType } from '@/utils/request/api.questionnaire'
import { getConveyor, getNearConveyors } from '@/utils/request/api.search'
import { getOptionsByConveyorType } from '@/utils/request/api.options'
import { saveConveyor, saveQuestionnaire } from '@/utils/request/api.save'

export { getConveyorTypes, getQuestionnaireByType, getConveyor, getNearConveyors, getOptionsByConveyorType, saveConveyor, saveQuestionnaire }
