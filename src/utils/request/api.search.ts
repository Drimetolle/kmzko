import axios from 'axios'
import { Conveyor, QuestionnaireDto, RateDto } from '@/types/index'

export async function getConveyor(id: string): Promise<Conveyor> {
  try {
    const res = await axios.get(`/api/search/conveyors/${id}`)
    return res.data as Conveyor
  } catch (error) {
    throw Error(error)
  }
}

export async function getNearConveyors(payload: QuestionnaireDto): Promise<Array<Conveyor>> {
  try {
    const res = await axios.get(`/api/search/conveyors/`, {
      params: constructQuery(payload),
    })
    return res.data as Array<Conveyor>
  } catch (error) {
    throw Error(error)
  }
}

const constructQuery = (payload: QuestionnaireDto) => {
  const rates = payload.rateList
  function makeObj(rate: RateDto) {
    return { mark: rate.mark, value: rate.value }
  }

  return rates.map(rate => makeObj(rate))
}
