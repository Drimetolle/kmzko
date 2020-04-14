import axios from 'axios'
import { Conveyor } from '@/types/index'

export async function getConveyorTemplate(type: string): Promise<Conveyor> {
  try {
    const res = await axios.get(`/api/conveyors/template/${type}`)
    return res.data as Conveyor
  } catch (error) {
    throw Error(error)
  }
}
