import axios from 'axios'
import { FormConveyor, Conveyor } from '@/types/index'

const request = axios.create({
  baseURL: 'http://localhost:8081/api/questionnaire/',
  timeout: 1000,
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