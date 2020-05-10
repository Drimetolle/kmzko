import axios from 'axios'
import { Conveyor, QuestionnaireDto, RateDto } from '@/types/index'

const constructQuery = (payload: QuestionnaireDto): object => {
  const rates = payload.rateList
  function makeObj(obj: any, rate: RateDto): object {
    obj[rate.mark] = rate.value
    return obj
  }

  const result = { }
  rates.forEach(rate => makeObj(result, rate))

  return result
}


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
    const res = await axios.get<Array<Conveyor>>('/api/search/conveyors/', {
      params: constructQuery(payload),
    })
    return res.data
  } catch (error) {
    throw Error(error)
  }
}
