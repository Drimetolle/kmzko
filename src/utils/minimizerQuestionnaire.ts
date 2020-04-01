import { QuestionnaireDto } from '@/types/index'
import Minimize from '@/utils/minimizerPayload'

export default class QuestionnaireMinimizezer implements Minimize<QuestionnaireDto> {
  minimize(payload: QuestionnaireDto): any {
    const newPayload = Object.assign({ }, payload)
    delete newPayload.id

    return newPayload
  }
}
