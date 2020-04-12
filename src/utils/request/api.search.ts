import axios from 'axios'
import { Conveyor, QuestionnaireDto } from '@/types/index'

const request = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/search/`,
  timeout: process.env.VUE_APP_API_BASE_TIMEOUT,
})

export async function getConveyor(id: string): Promise<Conveyor> {
  try {
    const res = await request.get(`conveyors/${id}`)
    return res.data as Conveyor
  } catch (error) {
    throw Error(error)
  }
}

export async function getNearConveyors(payload: QuestionnaireDto): Promise<Array<Conveyor>> {
  try {
    const res = await request.get(`conveyors/`, {
      params: payload,
    })
    return res.data as Array<Conveyor>
  } catch (error) {
    throw Error(error)
  }
}
