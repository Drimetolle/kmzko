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
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                  v-model="username"
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                    :error-messages="usernameErrors"
                  />
                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    :error-messages="passwordErrors"
                  />
                  <p v-if="success" style="color:red;">Неверный логин или пароль</p>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="#d94d33" dark text @click="redirectToReg">Registarion</v-btn>
                <v-spacer/>
                <v-btn color="#d94d33" dark @click="login">Login</v-btn>
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
import Component from 'vue-class-component'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { User } from '@/types'
import { required, minLength, between, email, sameAs } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

@Component({
  mixins: [validationMixin],
  methods: {
    ...mapActions(['authRequest']),
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  validations: {
    username: {
      required,
      minLength: minLength(5),
    },
    password: {
      required,
      minLength: minLength(5),
    },
  },
})
export default class LoginForm extends Vue {
  username: string = ''
  password: string = ''
  success: boolean = false

  isAuthenticated!: boolean
  authRequest!: (user: User) => void

  async login() {
    const user: User = {
      username: this.username,
      password: this.password,
    }
    await this.authRequest(user)

    this.success = !this.isAuthenticated
    if (this.isAuthenticated) {
      this.$router.push('/')
    }
  }

  redirectToReg() {
    this.$router.push('/registration')
  }

  get usernameErrors () {
    if (!this.$v.username.$dirty) return ''
    if (!this.$v.username.required) return `Field is required`
    if (!this.$v.username.minLength) return `Field min length is ${this.$v.username.$params.minLength.min}`
  }

  get passwordErrors () {
    if (!this.$v.password.$dirty) return ''
    if (!this.$v.password.required) return `Field is required`
    if (!this.$v.password.minLength) return `Field min length is ${this.$v.username.$params.minLength.min}`
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
}
::-webkit-scrollbar {
  display: inline !important;
}
</style>
