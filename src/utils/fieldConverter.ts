import { FieldSkelet } from '@/types/index'

export default interface FieldConverter {
  toFieldSkelet(value: any): FieldSkelet
  toModel(value: any): { id: string }
}
