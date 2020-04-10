import { ConveyorDto } from '@/types/index'
import Mapper from '@/utils/mapper/AbstractMapper'

export default class ConveyorMapper implements Mapper<any, ConveyorDto> {
  toDto(o1: any): ConveyorDto {
    throw new Error('Method not implemented.')
  }
}
