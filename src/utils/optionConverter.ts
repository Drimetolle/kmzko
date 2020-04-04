import { FieldSkelet } from '@/types/index'
import FieldConverter from '@/utils/fieldConverter'

export default class OptionConverter implements FieldConverter {
  toFieldSkelet({ id, name, value, child  }: any): FieldSkelet {
    return new FieldSkelet(id || 0, name, value, child)
  }
  toModel(value: any) {
    return {
      id: value.id,
      value: value.value,
    }
  }
}
