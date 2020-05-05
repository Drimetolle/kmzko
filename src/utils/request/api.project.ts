import axios from 'axios'
import { ConveyorProjectDto } from '@/types/index'

export async function createConveyorProject(type: string): Promise<ConveyorProjectDto> {
  try {
    const res = await axios.post<ConveyorProjectDto>('/api/user/projects', type, {
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

export async function getAllConveyorProjects(): Promise<Array<ConveyorProjectDto>> {
  try {
    const res = await axios.get<Array<ConveyorProjectDto>>('/api/user/projects')

    return res.data
  } catch (error) {
    throw Error(error)
  }
}
