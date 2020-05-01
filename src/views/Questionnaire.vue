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
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in questionnaireList"
            :key="i"
            @click="selectItem(item)"
            class="on-hover"
          >
            <v-hover v-slot:default="{ hover }">
              <v-list-item-content>
                <v-btn v-if="hover"
                  absolute
                  text
                  small
                  fab
                  right
                  @click.stop="removeItem(item)"
                >
                  <v-icon>clear</v-icon>
                </v-btn>
                <v-btn v-if="hover && !isSaved(item)"
                  absolute
                  text
                  small
                  fab
                  right
                  @click.stop="save(item)"
                  style="right: 45px !important;"
                >
                  <v-icon>save</v-icon>
                </v-btn>
                <v-btn absolute right v-if="!hover && !isSaved(item)" icon>
                  <v-icon size="x-small">lens</v-icon> 
                </v-btn>
                <v-list-item-title>{{ item.questionnaire.name }}</v-list-item-title>
              </v-list-item-content>
            </v-hover>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
    <v-divider vertical/>
    <v-col dense>
      <v-form v-if="questionnaireList.length > 0">
        <v-text-field
          v-model="wrapperQuestionnaire.questionnaire.name"
        ></v-text-field>
        <v-row v-for="(rate, i) in wrapperQuestionnaire.questionnaire.rateList"
          :key="rate.id">
          <v-col>
            <v-text-field
              v-model="rate.name"
              label="Характеристика"
              :placeholder="rate.placeholder"
              @input="$v.wrapperQuestionnaire.questionnaire.rateList.$each[i].name.$touch()"
              @blur="$v.wrapperQuestionnaire.questionnaire.rateList.$each[i].name.$touch()"
              :error-messages="nameErrors($v.wrapperQuestionnaire.questionnaire.rateList.$each[i].name)"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              v-model="rate.mark"
              :items="marks"
              label="Метка"
              solo
              @input="$v.wrapperQuestionnaire.questionnaire.rateList.$each[i].mark.$touch()"
              @blur="$v.wrapperQuestionnaire.questionnaire.rateList.$each[i].mark.$touch()"
              :error-messages="markErrors($v.wrapperQuestionnaire.questionnaire.rateList.$each[i], )"
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
          <v-btn v-if="!!wrapperQuestionnaire.questionnaire.rateList" @click="newRate">add field</v-btn>
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
import ErrorsMixin from '@/mixin/standartValidationErrors.mixin'

interface Wrapper {
  questionnaire: QuestionnaireDto
  saved: boolean
}

@Component({
  mixins: [validationMixin],
  components: {
    Field,
  },
  watch: {
    questionnaireWatcher: {
      handler(newVal: QuestionnaireDto, oldVal: QuestionnaireDto) {
        const valueNotChange = () => JSON.stringify(newVal) === JSON.stringify(oldVal)

        const changed = (this as Questionnaire).questionnaireList.map(w => w.questionnaire).filter(q => oldVal === q).length === 1
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
            isUnique(this: Questionnaire, a: any, b: any) {
              const { wrapperQuestionnaire } = this
              const array = wrapperQuestionnaire.questionnaire.rateList.map(rate => rate.mark)

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
  }
  questionnaireList: Array<Wrapper> = []
  unwatchIsLiveProp = { }

  @AsyncLoading
  async mounted() {
    this.questionnaireList = (await getAllQuestionnaire()).map(item => { return { questionnaire: item, saved: true} })
  }

  selectItem(target: Wrapper) {
    this.wrapperQuestionnaire = target
  }

  toFieldSkelet(option: any) {
    return QuestionnaireConverter.prototype.toFieldSkelet(option)
  }

  newItem() {
    const newItem: Wrapper = { saved: false, questionnaire: { id: this.questionnaireList.length.toString(), name: 'newItem', type: '', rateList: [{ id: '0', name: '', value: '', mark: '' }] } }
    this.questionnaireList.push(newItem)
    this.selectItem(newItem)
  }

  removeItem(item: Wrapper) {
    const index = this.questionnaireList.indexOf(item)
    if (index > -1) {
      this.questionnaireList.splice(index, 1)
    }
  }

  newRate() {
    this.wrapperQuestionnaire.questionnaire.rateList.push({ id: this.wrapperQuestionnaire.questionnaire.rateList.length.toString(), name: '', value: '', mark: '' })
  }

  removeRate(item: RateDto) {
    const index = this.wrapperQuestionnaire.questionnaire.rateList.indexOf(item)
    if (index > -1) {
      this.wrapperQuestionnaire.questionnaire.rateList.splice(index, 1)
    }
  }

  save(item: Wrapper) {
    item.saved = true
  }

  isSaved(item: Wrapper): boolean {
    const index = this.questionnaireList.indexOf(item)
    return this.questionnaireList[index].saved
  }

  markErrors(target: any): string | Array<string> {
    if (!target.mark.$dirty) return ''
    if (!target.mark.required) return `Field is required`
    if (!target.mark.isUnique) return `Not unique`
    return ''
  }

  get getConverter(): QuestionnaireConverter {
    return new QuestionnaireConverter()
  }

  get questionnaireWatcher() {
    return this.wrapperQuestionnaire.questionnaire
  }
}
</script>

<style scoped>
.on-hover:hover {
  background: rgba(0,0,0,.1);
}
</style>
