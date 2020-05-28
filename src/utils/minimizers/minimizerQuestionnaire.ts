import { QuestionnaireDto, RateDto } from '@/types/index'
import Minimize from '@/utils/minimizers/minimizerPayload'
import * as R from 'ramda'

function isEmptyOrUndifined(value: string): boolean {
  return R.isNil(value) || value === ''
}

function convertRate(rate: any): RateDto {
  const possibleRateValues: Array<any> = rate.possibleRateValues
  const deletedIndexes = []

  if (possibleRateValues.length > 0) {
    for (const val of possibleRateValues) {
      if (isEmptyOrUndifined(val.text) && isEmptyOrUndifined(val.name)) {
        deletedIndexes.push(possibleRateValues.indexOf(val))
      }
      else if (!isEmptyOrUndifined(val.text) && isEmptyOrUndifined(val.name)) {
        const name = val.text
        val.name = name
        delete val.text
      }
    }
    for (const i of deletedIndexes) {
      possibleRateValues.splice(i, 1)
    }
  }

  return rate
}

export default class QuestionnaireMinimizezer implements Minimize<QuestionnaireDto> {
  minimize(payload: QuestionnaireDto): QuestionnaireDto {
    const q = R.clone(payload)
    const rateList = q.rateList.map(rate => convertRate(rate))
    const result: QuestionnaireDto = { id: payload.id, name: payload.name, type: payload.type, rateList }
    return result
  }
}
