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
                    :error-messages="usernameErrors($v.username)"
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
                    :error-messages="passwordErrors($v.password)"
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
import Component, { mixins } from 'vue-class-component'
import { mapActions, mapGetters } from 'vuex'
import { User } from '@/types'
import { required, minLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import ErrorsMixin from '@/mixin/standartValidationErrors.mixin'

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
export default class LoginForm extends mixins(ErrorsMixin) {
  username = ''
  password = ''
  success = false

  isAuthenticated!: boolean
  authRequest!: (user: User) => void

  async login(): Promise<void> {
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

  redirectToReg(): void {
    this.$router.push('/registration')
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
