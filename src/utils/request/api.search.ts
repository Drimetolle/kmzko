import axios from 'axios'
import { Conveyor, QuestionnaireDto } from '@/types/index'

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
      params: payload,
    })
    return res.data as Array<Conveyor>
  } catch (error) {
    throw Error(error)
  }
}
