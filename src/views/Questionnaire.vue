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
      <v-form ref="form" v-model="valid" lazy-validation>
        <h3>{{ questionnaire.name }}</h3>
        <v-row v-for="rate in questionnaire.rateList"
          :key="rate.id">
          <v-col>
            <v-text-field
              label="Характеристика"
              :placeholder="rate.placeholder"
              v-model="rate.name"
              :rules="textRules"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              :items="marks"
              label="Метка"
              solo
              v-model="rate.mark"
              :rules="markRules"
              required
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
import { QuestionnaireDto } from '@/types/index'
import LoadingMixin, { AsyncLoading } from '@/mixin/loading.mixin'
import MarkMixin from '@/mixin/mark.mixin'
import { getAllQuestionnaire, deployQuestionnaire } from '@/utils/request/index'
import QuestionnaireConverter from '@/utils/questionnaireConverter'

@Component({
  components: {
    Field,
  },
})
export default class Questionnaire extends mixins(LoadingMixin, MarkMixin) {
  questionnaire: QuestionnaireDto = { } as any
  questionnaireList: Array<QuestionnaireDto> = []
  valid: boolean = true
  textRules = [
    (v: any) => !!v || 'Is required',
  ]
  markRules = [
    (v: any) => !!v || 'Is required',
  ]

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
}
</script>

<style>

</style>
