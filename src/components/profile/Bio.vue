<template>
  <v-card
    class="pa-2"
    outlined
    tile
  >
    <v-text-field
      v-model="user.name"
      solo
      id="name"
      name="name"
      label="Name"
      @input="$v.user.name.$touch()"
      @blur="$v.user.name.$touch()"
      :error-messages="usernameErrors($v.user.name)"
    >
    </v-text-field>
    <v-text-field
      v-model="user.email"
      solo
      id="email"
      name="email"
      label="Email"
      @input="$v.user.email.$touch()"
      @blur="$v.user.email.$touch()"
      :error-messages="emailErrors"
    >
    </v-text-field>
    <v-text-field
      v-model="user.phone"
      solo
      id="phone"
      name="phone"
      label="Phone"
      @input="$v.user.phone.$touch()"
      @blur="$v.user.phone.$touch()"
      :error-messages="phoneErrors($v.user.phone)"
    >
    </v-text-field>
  </v-card>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { getUser, saveBioUser } from '@/utils/request/api.user-staff'
import { BioDto } from '@/types/index'
import { required, minLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import StandartValidationErrorsMixin from '@/mixin/standartValidationErrors.mixin'

@Component({
  mixins: [validationMixin],
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(5),
      },
      email: {
        required,
        minLength: minLength(5),
      },
      phone: {
        required,
        minLength: minLength(8),
      },
    },
  },
})
export default class Bio extends mixins(StandartValidationErrorsMixin) {
  user: BioDto = { } as any

  async created(): Promise<void> {
    this.user = await getUser()
  }

  async save(): Promise<void> {
    const user = await saveBioUser(this.user)

    this.$emit('saveUserBio', user)
  }

  get emailErrors(): string {
    if (!this.$v.user.email!.$dirty) return ''
    if (!this.$v.user.email!.required) return 'Field is required'
    if (!this.$v.user.email!.email) return 'email'
    return ''
  }
}
</script>
