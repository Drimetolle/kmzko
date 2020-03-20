import axios from 'axios'
import { Conveyor } from '@/types/index'

const request = axios.create({
  baseURL: 'http://localhost:8081/api/search/',
  timeout: 1000,
})

async function getConveyor(id: number): Promise<Conveyor> {
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
