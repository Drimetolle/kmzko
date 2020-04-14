import axios from 'axios'
import { OptionalDetail } from '@/types/index'

export async function getOptionsByConveyorType(type: string): Promise<Array<OptionalDetail>> {
  try {
    const res = await axios.get('/api/options/', {
      params: { type },
    })
    return res.data as Array<OptionalDetail>
  } catch (error) {
    throw Error(error)
  }
}
