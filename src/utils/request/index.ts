import { getConveyorTypes, getQuestionnaireByType, getAllQuestionnaire, deployQuestionnaire } from '@/utils/request/api.questionnaire'
import { getConveyor, getNearConveyors } from '@/utils/request/api.search'
import { getOptionsByConveyorType } from '@/utils/request/api.options'
import { saveConveyor, saveQuestionnaire } from '@/utils/request/api.save'
import { getConveyorTemplate } from '@/utils/request/api.conveyor'

export { getConveyorTypes, getQuestionnaireByType, getAllQuestionnaire, deployQuestionnaire, getConveyor, getNearConveyors,
  getOptionsByConveyorType, saveConveyor, saveQuestionnaire, getConveyorTemplate }
