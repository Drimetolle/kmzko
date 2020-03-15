import axios from 'axios'
import { Conveyor } from '@/types/index'

const request = axios.create({
  baseURL: 'http://localhost:8081/api/search/',
  timeout: 1000,
})

async function getConveyor(): Promise<Conveyor> {
  try {
    const res = await request.get('')
    return res.data[0] as Conveyor
  } catch (error) {
    throw Error(error)
  }
}

export { getConveyor }
