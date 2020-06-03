import { QuestionnaireDto, RateDto } from '@/types/index'
import Minimize from '@/utils/minimizers/minimizerPayload'
import * as R from 'ramda'

const constructQuery = (payload: QuestionnaireDto): object => {
  const rates = payload.rateList
  function makeObj(obj: any, rate: RateDto): object {
    obj[rate.mark] = rate.value
    return obj
  }

  const result = { }
  rates.filter(r => r.value !== '').forEach(rate => makeObj(result, rate))

  return result
}

export default class QuestionnaireParamsMinimizer implements Minimize<QuestionnaireDto> {
  minimize(payload: QuestionnaireDto): object {
    const q = R.clone(payload)

    return constructQuery(q)
  }
}
