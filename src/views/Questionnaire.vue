<template>
  <v-layout row fill-height>
    <v-col dense cols="2">
      <v-list flat>
        <div>
          <v-row>
            <v-col>
              <v-subheader>{{ $t('questionnaires') }}</v-subheader>
            </v-col>
            <v-spacer/>
            <v-col>
              <v-btn
                small
                fab
                bottom
                right
                @click="newItem"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <v-list-item-group v-model="questionnaire" color="primary">
          <v-list-item
            v-for="(item, i) in questionnaireList"
            :key="i"
            @click="selectItem(item, i)"
            class="on-hover"
          >
          <v-list-item-title>{{ item.questionnaire.name }}</v-list-item-title>
          <v-spacer></v-spacer>
            <v-list-item-action @click.stop>
              <v-btn v-if="!isSaved(item)"
                text
                small
                fab
                @click.stop="save(item)"
              >
                <v-icon>save</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action @click.stop>
              <v-btn
                text
                small
                fab
                @click.stop="removeItem(item)"
              >
                <v-icon>clear</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
    <v-divider vertical/>
    <v-col dense>
      <v-form v-if="questionnaireList.length > 0 && questionnaire >= 0">
        <v-text-field
          v-model="wrapperQuestionnaire.questionnaire.name"
        ></v-text-field>
        <v-select
          :items="listOfTypes"
          v-model="wrapperQuestionnaire.questionnaire.type"
        ></v-select>
        <v-row v-for="(rate, i) in wrapperQuestionnaire.questionnaire.rateList"
          :key="rate.id">
          <v-col>
            <v-text-field
              v-if="!isSelect(rate)"
              v-model="rate.name"
              label="Характеристика"
              :placeholder="rate.placeholder"
              @input="$v.wrapperQuestionnaire.questionnaire.rateList.$each[i].name.$touch()"
              @blur="$v.wrapperQuestionnaire.questionnaire.rateList.$each[i].name.$touch()"
              :error-messages="nameErrors($v.wrapperQuestionnaire.questionnaire.rateList.$each[i].name)"
            ></v-text-field>
            <CompletableSelect
              :items="rate.possibleRateValues"
              v-else>
            </CompletableSelect>
          </v-col>
          <v-col>
            <v-select
              v-model="rate.mark"
              :items="marks"
              label="Метка"
              solo
              @input="$v.wrapperQuestionnaire.questionnaire.rateList.$each[i].mark.$touch()"
              @blur="$v.wrapperQuestionnaire.questionnaire.rateList.$each[i].mark.$touch()"
              :error-messages="markErrors($v.wrapperQuestionnaire.questionnaire.rateList.$each[i].mark)"
            ></v-select>
          </v-col>
          <v-col>
            <v-btn
              bottom
              right
              @click="removeRate(rate)"
            >
              <v-icon>clear</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn 
                v-if="!!wrapperQuestionnaire.questionnaire.rateList" 
                v-on="on">add field</v-btn>
            </template>
            <v-list>
              <v-list-item
                @click="newRate('text')">
                Текстовое поле
              </v-list-item>
              <v-list-item
                @click="newRate('select')">
                Выбор из списка
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-form>
    </v-col>
  </v-layout>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import Field from '@/components/Field.vue'
import { QuestionnaireDto, RateDto, FieldSkelet, ImplSelectElement } from '@/types/index'
import LoadingMixin, { AsyncLoading } from '@/mixin/loading.mixin'
import MarkMixin from '@/mixin/mark.mixin'
import { getAllQuestionnaire, deployQuestionnaire, putQuestionnaire, getConveyorTypes } from '@/utils/request/index'
import QuestionnaireConverter from '@/utils/questionnaireConverter'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import ErrorsMixin from '@/mixin/standartValidationErrors.mixin'
import * as R from 'ramda'
import CompletableSelect from '@/components/CompletableSelect'

interface Wrapper {
  questionnaire: QuestionnaireDto
  saved: boolean
  isNew: boolean
}

@Component({
  mixins: [validationMixin],
  components: {
    Field,
    CompletableSelect,
  },
  watch: {
    questionnaireWatcher: {
      handler(newVal: QuestionnaireDto, oldVal: QuestionnaireDto): void {
        const isEqual: boolean = R.equals(newVal, oldVal)
        const emptyValue = () => JSON.stringify(oldVal) === JSON.stringify({ })
        const valueNotChange = () => isEqual

        const changed = (this as Questionnaire).questionnaireList.map(w => w.questionnaire).filter(q => oldVal === q).length === 1
        if (emptyValue()) return
        if (changed && !valueNotChange()) return
        (this as Questionnaire).wrapperQuestionnaire.saved = false
      },
      deep: true,
    },
  },
  validations: {
    wrapperQuestionnaire: {
      questionnaire: {
        rateList: {
          required,
          $each: {
            name: {
              required,
            },
            mark: {
              required,
              isUnique(this: Questionnaire): boolean {
                const { wrapperQuestionnaire } = this
                const array = wrapperQuestionnaire.questionnaire.rateList.map(rate => rate.mark)

                let indexNotUniqueField: Array<number> = []
                const indexNotUniqueMap: Map<string, any> = new Map()

                array.forEach((item, index) => {
                  indexNotUniqueMap.set(item, indexNotUniqueMap.get(item) ?? [])
                  indexNotUniqueMap.get(item).push(index)
                })

                indexNotUniqueMap.forEach((v) => {
                  if (v.length > 1) {
                    indexNotUniqueField = indexNotUniqueField.concat(v)
                  }
                })
                return indexNotUniqueField.length === 0
              },
            },
          },
        },
      },
    },
  },
})
export default class Questionnaire extends mixins(LoadingMixin, MarkMixin, ErrorsMixin) {
  wrapperQuestionnaire: Wrapper = {
    questionnaire: { } as QuestionnaireDto,
    saved: false,
    isNew: true,
  }
  questionnaire = -1
  questionnaireList: Array<Wrapper> = []
  unwatchIsLiveProp = { }
  listOfTypes: Array<ImplSelectElement> = []

  @AsyncLoading
  async mounted(): Promise<void> {
    const conveyorTypes: Array<string> = await getConveyorTypes()
    this.listOfTypes = conveyorTypes.map(i => new ImplSelectElement(this.$t(i), i.toUpperCase()))

    this.questionnaireList = (await getAllQuestionnaire()).map(item => { return { questionnaire: item, saved: true, isNew: false } })
  }

  selectItem(target: Wrapper, index: number): void {
    this.wrapperQuestionnaire = target
    this.questionnaire = index
  }

  toFieldSkelet(option: any): FieldSkelet {
    return QuestionnaireConverter.prototype.toFieldSkelet(option)
  }

  newItem(): void {
    const newItem: Wrapper = { isNew: true, saved: false, questionnaire: { id: this.questionnaireList.length.toString(), name: 'newItem', type: '', rateList: [{ id: '0', name: '', value: '', mark: '' }] } }
    this.questionnaireList.push(newItem)
    this.selectItem(newItem, this.questionnaireList.length - 1)
  }

  removeItem(item: Wrapper): void {
    const index = this.questionnaireList.indexOf(item)
    if (index > -1) {
      this.questionnaireList.splice(index, 1)
    }
  }

  newRate(type: string): void {
    if (type === 'text') this.wrapperQuestionnaire.questionnaire.rateList.push({ id: this.wrapperQuestionnaire.questionnaire.rateList.length.toString(), name: '', value: '', mark: '' })
    else if (type === 'select') this.wrapperQuestionnaire.questionnaire.rateList.push({ id: this.wrapperQuestionnaire.questionnaire.rateList.length.toString(), name: '', value: '', mark: '', possibleRateValues: [{ id: '1', name: '' }] })
  }

  removeRate(item: RateDto): void {
    const index = this.wrapperQuestionnaire.questionnaire.rateList.indexOf(item)
    if (index > -1) {
      this.wrapperQuestionnaire.questionnaire.rateList.splice(index, 1)
    }
  }

  async save(item: Wrapper): Promise<void> {
    try {
      if (item.isNew) {
        await deployQuestionnaire(item.questionnaire)
        item.isNew = false
      }
      else {
        await putQuestionnaire(item.questionnaire)
      }
      item.saved = true
    } catch (error) {
      // TODO
    }
  }

  isSaved(item: Wrapper): boolean {
    const index = this.questionnaireList.indexOf(item)
    return this.questionnaireList[index].saved
  }

  convertToFieldSkelet(rate: RateDto): RateDto {
    if(rate.possibleRateValues) {
      this.$set(rate, 'child', rate.possibleRateValues)
      this.$delete(rate, 'possibleRateValues')
    }
    return rate
  }

  markErrors(target: any): string | Array<string> {
    if (!target.$dirty) return ''
    if (!target.required) return 'Field is required'
    if (!target.isUnique) return 'Not unique'
    return ''
  }

  isSelect(rate: RateDto): boolean {
    if (rate.possibleRateValues) {
      return rate.possibleRateValues.length >= 1
    }
    else {
      return false
    }
  }

  get getConverter(): QuestionnaireConverter {
    return new QuestionnaireConverter()
  }

  get questionnaireWatcher(): QuestionnaireDto {
    return this.wrapperQuestionnaire.questionnaire
  }
}
</script>

<style scoped>
.on-hover:hover {
  background: rgba(0,0,0,.1);
}
</style>
