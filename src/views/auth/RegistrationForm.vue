<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="#d94d33"
                dark
                flat
              >
                <v-toolbar-title>Registration form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="name.value"
                    id="name"
                    label="Имя"
                    name="Имя"
                    prepend-icon="person"
                    type="text"
                  />
                  <v-text-field
                    v-model="username.value"
                    id="username"
                    label="Username"
                    name="username"
                    prepend-icon="person"
                    type="text"
                    @blur="check($event.target, username)"
                    :error-messages="username.getError"
                  >
                    <template v-slot:append v-if="username.init">
                      <v-icon
                        v-if="username.getUnique"
                        color="success"
                      >
                        check
                      </v-icon>
                      <v-icon
                        v-else
                        color="error"
                      >
                        error
                      </v-icon>
                    </template>
                  </v-text-field>
                  <v-text-field
                    v-model="email.value"
                    id="email"
                    label="Email"
                    name="email"
                    prepend-icon="person"
                    type="email"
                    @blur="check($event.target, email)"
                    :error-messages="email.getError"
                  >
                    <template v-slot:append v-if="email.init">
                      <v-icon
                        v-if="email.getUnique"
                        color="success"
                      >
                        check
                      </v-icon>
                      <v-icon
                        v-else
                        color="error"
                      >
                        error
                      </v-icon>
                    </template>
                  </v-text-field>
                  <v-text-field
                    v-model="password.value"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                  <v-text-field
                    v-model="secondpassword.value"
                    id="secondpassword"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="#d94d33" dark @click="registration">join</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { User } from '@/types'
import { checkFieldForUniqueness } from '@/utils/request/index'
import Field from '@/types/Field'
import { required, minLength, between } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

@Component({
  mixins: [validationMixin],
  methods: {
    ...mapActions(['join']),
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  validations: {
    name: {
      value: {
        required,
        minLength: minLength(4),
      },
    },
  },
})
export default class RegistrationForm extends Vue {
  name: Field = new Field()
  username: Field = new Field()
  email: Field = new Field()
  password: Field = new Field()
  secondpassword: Field = new Field()
  success: boolean = true

  isAuthenticated!: boolean
  join!: (user: User) => void

  async check(target: any, data: Field) {
    const { id, value } = target
    const res = await checkFieldForUniqueness(id, value)

    data.unique = JSON.parse(res.status.toLowerCase())
    data.error = res.error ?? ''
  }

  async registration() {
    const user: User = { name: this.name.value, username: this.username.value, password: this.password.value, email: this.email.value }
    await this.join(user)

    this.success = !this.isAuthenticated
    if (this.isAuthenticated) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: inline !important;
}
</style>
