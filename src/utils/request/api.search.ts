import axios from 'axios'
import { Conveyor, QuestionnaireDto, RateDto } from '@/types/index'

const constructQuery = (payload: QuestionnaireDto): Array<unknown> => {
  const rates = payload.rateList
  function makeObj(rate: RateDto): { mark: string, value: string} {
    return { mark: rate.mark, value: rate.value }
  }

  return rates.map(rate => makeObj(rate))
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
