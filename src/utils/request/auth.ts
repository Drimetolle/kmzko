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
    const res = await request.post(`/auth/refresh`, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: tokens,
    })
    return res.data as TokensDto
  } catch (error) {
    throw Error(error)
  }
}
