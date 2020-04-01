import axios from 'axios'
import { OptionalDetail } from '@/types/index'

const request = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/options/`,
  timeout: process.env.VUE_APP_API_BASE_TIMEOUT,
})

async function getOptionsByConveyorType(type: string): Promise<Array<OptionalDetail>> {
  try {
    const res = await request.get('', {
      params: { type },
    })
    return res.data as Array<OptionalDetail>
  } catch (error) {
    throw Error(error)
  }
}

export { getOptionsByConveyorType }
