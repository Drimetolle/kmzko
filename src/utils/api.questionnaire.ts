import axios from 'axios'
import { FormConveyor, Conveyor } from '@/types/index'

const request = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/questionnaire/`,
  timeout: process.env.VUE_APP_API_BASE_TIMEOUT,
})

async function getConveyorType(): Promise<Array<string>> {
  try {
    const res = await request.get('')
    return res.data
  } catch (error) {
    throw Error(error)
  }
}

async function getQuestionnaireByType(type: string): Promise<Array<FormConveyor>> {
  try {
    const res = await request.get(`/${type}`)
    return res.data.rateList as Array<FormConveyor>
  } catch (error) {
    throw Error(error)
  }
}

export { getConveyorType, getQuestionnaireByType }
