import { getConveyorTypes, getQuestionnaireByType } from '@/utils/request/api.questionnaire'
import { getConveyor, getNearConveyors } from '@/utils/request/api.search'
import { getOptionsByConveyorType } from '@/utils/request/api.options'
import { saveConveyor, saveQuestionnaire } from '@/utils/request/api.save'
import { getConveyorTemplate } from '@/utils/request/api.conveyor'

export { getConveyorTypes, getQuestionnaireByType, getConveyor, getNearConveyors, getOptionsByConveyorType, saveConveyor, saveQuestionnaire, getConveyorTemplate }
