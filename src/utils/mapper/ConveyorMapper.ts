import { ConveyorDto, FormConveyor } from '@/types/index'
import Mapper from '@/utils/mapper/AbstractMapper'

export default class ConveyorMapper implements Mapper<any, ConveyorDto> {
  toDto(o1: FormConveyor): ConveyorDto {
    throw new Error('Method not implemented.')
  }
}
