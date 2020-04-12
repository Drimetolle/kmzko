import axios from 'axios'
import { Conveyor } from '@/types/index'

const request = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/conveyors/`,
  timeout: process.env.VUE_APP_API_BASE_TIMEOUT,
})

export async function getConveyorTemplate(type: string): Promise<Conveyor> {
  try {
    const res = await request.get(`template/${type}`)
    return res.data as Conveyor
  } catch (error) {
    throw Error(error)
  }
}
