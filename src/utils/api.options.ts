import axios from 'axios'
import { OptionalDetail } from '@/types/index'

const request = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/options/`,
  timeout: 5000,
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
