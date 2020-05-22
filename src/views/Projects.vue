<template>
  <v-layout row fill-height>
    <v-col dense cols="2">
      <v-list flat>
        <v-row>
          <v-col>
            <v-subheader><h2>{{ $t('projects') }}</h2></v-subheader>
          </v-col>
          <v-spacer/>
          <v-col>
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">Новый</v-btn>
              </template>
              <v-card>
                <v-card-title
                  class="headline dark lighten-2"
                  primary-title
                >
                  Новый проект
                </v-card-title>

                <v-card-text>
                  <v-select
                    :items="items"
                    v-model="select"
                    label="Тип конвейера"
                    @focus="setTypes()"
                    @blur="$v.select.$touch()"
                    :error-messages="nameErrors($v.select)"
                  >
                  </v-select>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="#d94d33"
                    text
                    @click="createProject()"
                  >
                    {{ $t('create') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(project, i) in projects"
            :key="i"
            @click="selectProject(project)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ project.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
    <v-divider vertical/>
    <v-col dense color="#f6f8fa">

    </v-col>
  </v-layout>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { mapMutations, mapActions } from 'vuex'
import { SelectElement, ImplSelectElement, ConveyorProjectViewDto, States, QuestionnaireDto, ConveyorDto, ConveyorProjectDto } from '@/types/index'
import { getConveyorTypes, createConveyorProject, getAllConveyorProjects } from '@/utils/request/index'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import ErrorsMixin from '@/mixin/standartValidationErrors.mixin'

@Component({
  mixins: [validationMixin],
  methods: {
    ...mapActions(['fetchProjectById']),
    ...mapMutations(['setConveyorType', 'setState', 'setQuestionnaire', 'setConveyor']),
  },
  validations: {
    select: {
      required,
    },
  },
})
export default class Projects extends mixins(ErrorsMixin) {
  projects: Array<ConveyorProjectViewDto> = []
  items: Array<SelectElement> = []
  select = ''
  dialog = false

  setConveyorType!: (type: string) => void
  setState!: (state: States) => void
  setQuestionnaire!: (questionnaire: QuestionnaireDto) => void
  setConveyor!: (conveyor: ConveyorDto) => void
  fetchProjectById!: (id: string) => Promise<ConveyorProjectDto>

  async selectProject(item: ConveyorProjectViewDto): Promise<void> {
    this.setConveyorType(this.select)

    const state = item.conveyor ? States.AddOptions : States.QuestionList

    await this.fetchProjectById(item.id)

    this.setState(state)
    this.$router.push('/configurator')
  }

  async fetchConveyorTypes(): Promise<Array<SelectElement>> {
    const conveyorTypes: Array<string> = await getConveyorTypes()
    const items = conveyorTypes.map(i => new ImplSelectElement(this.$t(i), i))

    return items
  }

  async createProject(): Promise<void> {
    this.setConveyorType(this.select)
    const { questionnaire } = await createConveyorProject(this.select)
    this.dialog = false

    this.setState(States.QuestionList)
    this.setQuestionnaire(questionnaire)

    this.$router.push('/configurator')
  }

  async setTypes(): Promise<void> {
    if (this.items.length === 0)
      this.items = await this.fetchConveyorTypes()
  }

  async created(): Promise<void> {
    this.projects = await getAllConveyorProjects()
    this.items = await this.fetchConveyorTypes()
  }
}
</script>

<style scoped>
h2 {
  color: black;
}
</style>
