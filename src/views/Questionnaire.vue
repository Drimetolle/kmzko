<template>
  <v-row>
    <v-col dense cols="2">
      <v-list flat>
        <v-subheader>{{ $t('questionnaires') }}</v-subheader>
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
      <h3>{{ questionnaire.name }}</h3>
      <v-row v-for="rate in questionnaire.rateList"
        :key="rate.id">
        <v-col>
          <v-text-field
            label="Характеристика"
            :placeholder="rate.placeholder"
            v-model="rate.name"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-select
            :items="marks"
            label="Метка"
            solo
            v-model="rate.mark"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Field from '@/components/Field.vue'
import { QuestionnaireDto } from '@/types/index'
import LoadingMixin, { AsyncLoading } from '@/mixin/loading.mixin'
import MarkMixin from '@/mixin/mark.mixin'
import { getAllQuestionnaire } from '@/utils/request/index'
import QuestionnaireConverter from '@/utils/questionnaireConverter'

@Component({
  components: {
    Field,
  },
})
export default class Questionnaire extends mixins(LoadingMixin, MarkMixin) {
  questionnaire: QuestionnaireDto = { } as any
  questionnaireList: Array<QuestionnaireDto> = []
  values: Map<string, string> = new Map()

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

  get getConverter(): QuestionnaireConverter {
    return new QuestionnaireConverter()
  }
}
</script>

<style>

</style>
