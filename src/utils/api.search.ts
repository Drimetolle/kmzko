import axios from 'axios'
import { Conveyor } from '@/types/index'

const request = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/search/`,
  timeout: 5000,
})

async function getConveyor(id: string): Promise<Conveyor> {
  try {
    const res = await request.get(`conveyors/${id}`)
    return res.data as Conveyor
  } catch (error) {
    throw Error(error)
  }
}

async function getNearConveyors(payload: Map<string, string>): Promise<Array<Conveyor>> {
  try {
    const res = await request.get(`conveyors/`, {
      params: Object.fromEntries(payload),
    })
    return res.data as Array<Conveyor>
  } catch (error) {
    throw Error(error)
  }
}

export { getConveyor, getNearConveyors }
