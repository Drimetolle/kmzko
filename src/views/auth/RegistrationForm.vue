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
                    name="name"
                    prepend-icon="person"
                    type="text"
                    @input="$v.name.value.$touch()"
                    @blur="$v.name.value.$touch()"
                    :error-messages="nameErrors($v.name.value)"
                  />
                  <v-text-field
                    v-model="username.value"
                    id="username"
                    label="Username"
                    name="username"
                    prepend-icon="person"
                    type="text"
                    @input="$v.name.value.$touch()"
                    @blur="$v.username.value.$touch()"
                    :error-messages="customUsernameErrors"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="email.value"
                    id="email"
                    label="Email"
                    name="email"
                    prepend-icon="person"
                    type="email"
                    @input="$v.email.value.$touch()"
                    @blur="$v.email.value.$touch()"
                    :error-messages="emailErrors"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="password.value"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    @input="$v.password.value.$touch()"
                    @blur="$v.password.value.$touch()"
                    :error-messages="passwordErrors($v.password.value)"
                  />
                  <v-text-field
                    v-model="secondpassword.value"
                    id="secondpassword"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    @input="$v.secondpassword.value.$touch()"
                    @blur="$v.secondpassword.value.$touch()"
                    :error-messages="secondpasswordErrors($v.secondpassword.value)"
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
import { required, minLength, between, email, sameAs } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import ErrorsMixin from '@/mixin/standartValidationErrors.mixin'

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
    username: {
      value: {
        required,
        minLength: minLength(5),
        isUnique(value) {
          return checkFieldForUniqueness('username', this.$v.username.$model.value).then(result => {
            this.$v.username.$model.unique = JSON.parse(result.status.toLowerCase())
            this.$v.username.$model.error = result.error ?? ''
            return this.$v.username.$model.unique
          })
        },
      },
    },
    email: {
      value: {
        required,
        email,
        isUnique(value) {
          return checkFieldForUniqueness('email', this.$v.email.$model.value).then(result => {
            this.$v.email.$model.unique = JSON.parse(result.status.toLowerCase())
            this.$v.email.$model.error = result.error ?? ''
            return this.$v.email.$model.unique
          })
        },
      },
    },
    password: {
      value: {
        required,
        minLength: minLength(5),
      },
    },
    secondpassword: {
      value: {
        sameAsPassword: sameAs(function(this: any) { return this.password.value }),
      },
    },
  },
})
export default class RegistrationForm extends mixins(ErrorsMixin) {
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

    if (this.isAuthenticated) {
      this.$router.push('/')
    }
  }

  get customUsernameErrors() {
    if (!this.$v.username.value!.$dirty) return ''
    if (!this.$v.username.value!.required) return `Field is required`
    if (!this.$v.username.value!.minLength) return `Field min length is ${this.$v.username.value!.$params.minLength.min}`
    if (!this.$v.username.value!.isUnique || this.$v.username.value!.$pending) {
      return this.username.getError
    }
  }

  get emailErrors() {
    if (!this.$v.email.value!.$dirty) return ''
    if (!this.$v.email.value!.required) return `Field is required`
    if (!this.$v.email.value!.email) return `email`
    if (!this.$v.email.value!.isUnique || this.$v.email.value!.$pending) {
      return this.email.getError
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: inline !important;
}
</style>
