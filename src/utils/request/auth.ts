import axios from 'axios'
import { User, TokensDto } from '@/types'

const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: process.env.VUE_APP_API_BASE_TIMEOUT,
})

export async function login(user: User): Promise<TokensDto> {
  try {
    const res = await request.post(`/auth`, user, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
    })
    return res.data as TokensDto
  } catch (error) {
    throw Error(error)
  }
}

export async function refresh(tokens: TokensDto): Promise<TokensDto> {
  try {
    const res = await request.post(`/auth/refresh`, tokens, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
    })
    return res.data as TokensDto
  } catch (error) {
    throw Error(error)
  }
}

export async function registration(user: User): Promise<{ status: string }> {
  try {
    const res = await request.post(`/join`, user, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
    })
    return res.data
  } catch (error) {
    throw Error(error)
  }
}

export async function checkFieldForUniqueness(id: string, field: string): Promise<{ error: string, status: string }> {
  try {
    const res = await axios.get(`/join`, {
      params: { [id]: field },
    })
    return res.data
  } catch (error) {
    throw Error(error)
  }
}
