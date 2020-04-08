import { QuestionnaireDto, RateDto } from '@/types/index'
import Mapper from '@/utils/mapper/AbstractMapper'

export default class QuestionnaireMapper implements Mapper<Map<string, any>, QuestionnaireDto> {
  toDto(o1: Map<string, string>): QuestionnaireDto {
    const rates: Array<RateDto> = Array.from(o1.keys()).map(key => {
      return { id: '', name: '', value: o1.get(key) ?? '', mark: key }
    })
    return { id: '', name: '', type: '', rateList: rates }
  }
}
