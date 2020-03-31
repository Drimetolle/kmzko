import { QuestionnaireDto, RateDto } from '@/types/index'
import Mapper from '@/utils/mapper/AbstractMapper'

export default class QuestionnaireMapper implements Mapper<Map<string, any>, QuestionnaireDto> {
  toDto(o1: Map<string, string>, o2: QuestionnaireDto): QuestionnaireDto {
    throw new Error('Method not implemented.')
    // return { name: '', type: '', rateList: Array.from(o1.keys()).map(key => {
    //   return o1.get(key) as RateDto
    // }) }
  }
}
