import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8081/api/questionnaire/',
  timeout: 1000,
})

async function getConveyorType() {
  try {
    const res = await request.get('')
    return res.data
  } catch (error) {
    throw Error(error)
  }
}

export { getConveyorType }