import axios from 'axios'
import { BioDto } from '@/types/index'

export async function getUser(): Promise<BioDto> {
  try {
    const res = await axios.get('/api/user')
    return res.data as BioDto
  } catch (error) {
    throw Error(error)
  }
}

export async function saveBioUser(bio: BioDto): Promise<BioDto> {
  try {
    const res = await axios.put('/api/user', bio, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
    })
    return res.data as BioDto
  } catch (error) {
    throw Error(error)
  }
}
