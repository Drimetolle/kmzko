import { ConveyorDto } from '@/types/index'
import Minimize from '@/utils/minimizers/minimizerPayload'

export default class ConveyorMinimizezer implements Minimize<ConveyorDto> {
  minimize(payload: ConveyorDto): any {
    const newPayload = Object.assign({ }, payload)
    delete newPayload.id
    delete newPayload.img

    return newPayload
  }
}
