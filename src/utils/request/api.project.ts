import axios from 'axios'
import { ConveyorProjectDto, ConveyorProjectViewDto } from '@/types/index'

export async function createConveyorProject(type: string): Promise<ConveyorProjectDto> {
  try {
    const res = await axios.post<ConveyorProjectDto>('/api/user/projects', null, {
      params: {
        type,
      },
    })

    return res.data
  } catch (error) {
    throw Error(error)
  }
}

export async function getAllConveyorProjects(): Promise<Array<ConveyorProjectViewDto>> {
  try {
    const res = await axios.get<Array<ConveyorProjectViewDto>>('/api/user/projects')

    return res.data
  } catch (error) {
    throw Error(error)
  }
}

export async function getConveyorProjectById(id: string): Promise<ConveyorProjectDto> {
  try {
    const res = await axios.get<ConveyorProjectDto>(`/api/user/projects/${id}`)

    return res.data
  } catch (error) {
    throw Error(error)
  }
}
