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
                bottom
                right
                fab
                @click="newItem"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in questionnaireList"
            :key="i"
            @click="select(item)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
    <v-divider vertical/>
    <v-col dense>
      <v-form>
        <h3>{{ questionnaire.name }}</h3>
        <v-row v-for="(rate, i) in questionnaire.rateList"
          :key="rate.id">
          <v-col>
            <v-text-field
              v-model="rate.name"
              label="Характеристика"
              :placeholder="rate.placeholder"
              @input="$v.questionnaire.rateList.$each[i].name.$touch()"
              @blur="$v.questionnaire.rateList.$each[i].name.$touch()"
              :error-messages="nameErrors($v.questionnaire.rateList.$each[i])"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              v-model="rate.mark"
              :items="marks"
              label="Метка"
              solo
              @input="$v.questionnaire.rateList.$each[i].mark.$touch()"
              @blur="$v.questionnaire.rateList.$each[i].mark.$touch()"
              :error-messages="markErrors($v.questionnaire.rateList.$each[i])"
            ></v-select>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn v-if="!!questionnaire.rateList" @click="newRate">add field</v-btn>
        </v-row>
      </v-form>
    </v-col>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Field from '@/components/Field.vue'
import { QuestionnaireDto, RateDto } from '@/types/index'
import LoadingMixin, { AsyncLoading } from '@/mixin/loading.mixin'
import MarkMixin from '@/mixin/mark.mixin'
import { getAllQuestionnaire, deployQuestionnaire } from '@/utils/request/index'
import QuestionnaireConverter from '@/utils/questionnaireConverter'
import { required, minLength, between, email, sameAs } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

@Component({
  mixins: [validationMixin],
  components: {
    Field,
  },
  validations: {
    questionnaire: {
      rateList: {
        required,
        $each: {
          name: {
            required,
          },
          mark: {
            required,
            isUnique(this: Questionnaire) {
              const array = this.questionnaire.rateList.map(rate => rate.mark)

              let indexNotUniqueField: Array<number> = []
              const indexNotUniqueMap: Map<any, any> = new Map()

              array.forEach((item, index) => {
                indexNotUniqueMap.set(item, indexNotUniqueMap.get(item) ?? [])
                indexNotUniqueMap.get(item).push(index)
              })

              indexNotUniqueMap.forEach((v, k) => {
                if (v.length > 1) {
                  indexNotUniqueField = indexNotUniqueField.concat(v)
                }
              })

              // throw error
              for (const rate of this.questionnaire.rateList) {
                this.$set(rate, 'error', false)
              }

              // set error
              if (indexNotUniqueField.length > 1) {
                for (const index of indexNotUniqueField) {
                  const rate = this.questionnaire.rateList[index!]
                  this.$set(rate, 'error', true)
                }
              }
              return indexNotUniqueField.length === 0
            },
          },
        },
      },
    },
  },
})
export default class Questionnaire extends mixins(LoadingMixin, MarkMixin) {
  questionnaire: QuestionnaireDto = { } as any
  questionnaireList: Array<QuestionnaireDto> = []

  @AsyncLoading
  async mounted() {
    this.questionnaireList = await getAllQuestionnaire()
  }

  select(target: QuestionnaireDto) {
    this.questionnaire = target
  }

  toFieldSkelet(option: any) {
    return QuestionnaireConverter.prototype.toFieldSkelet(option)
  }

  newItem() {
    const newItem: QuestionnaireDto = { id: this.questionnaireList.length.toString(), name: 'newItem', type: '', rateList: [{ id: '0', name: '', value: '', mark: '' }] }
    this.questionnaireList.push(newItem)
    this.select(newItem)
  }

  newRate() {
    this.questionnaire.rateList.push({ id: this.questionnaire.rateList.length.toString(), name: '', value: '', mark: '' })
  }

  submit() {
    (this.$refs.form as any).validate()
    const length = this.questionnaire.rateList.length
    const valid: boolean = (new Set(this.questionnaire.rateList.map(i => i.mark))).size === length
    deployQuestionnaire(this.questionnaire)
  }

  get getConverter(): QuestionnaireConverter {
    return new QuestionnaireConverter()
  }

  nameErrors(target: any): string | Array<string> {
    if (!target.name.$dirty) return ''
    if (!target.name.required) return `Field is required`
    return ''
  }

  markErrors(target: any): string | Array<string> {
    if (!target.mark.$dirty) return ''
    if (!target.mark.required) return `Field is required`
    if (!target.mark.isUnique && target.$model.error) return `Not unique`
    return ''
  }
}
</script>

<style>

</style>
