<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <form @submit.prevent="onSignup">
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title> <v-icon left dark>face</v-icon> Sign Up form</v-toolbar-title>
            </v-toolbar>
            <app-alert v-if="error" @dismissed="onDismissed" :text="error.message"></app-alert>
            <v-card-text>
              <v-text-field
                prepend-icon="person"
                id="email"
                name="email"
                label="Mail"
                type="email"
                v-model="email"
                required>
              </v-text-field>
              <v-text-field
                prepend-icon="lock"
                id="password"
                name="password"
                label="Password"
                type="password"
                v-model="password"
                required>
              </v-text-field>
              <v-text-field
                prepend-icon="lock"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                v-model="confirmPassword"
                :rules="[comparePasswords]">
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                type="submit"
                :disabled="loading"
                :loading="loading">
                <v-icon left dark>face</v-icon>Sign up
              </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      ...mapGetters([
        'currentUser',
        'error',
        'loading'
      ]),
      comparePasswords() {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      }
    },
    watch: {
      currentUser(value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      ...mapActions({
        userSignUp: 'userSignUp',
        clearError: 'clearError'
      }),
      onSignup() {
        this.userSignUp({email: this.email, password: this.password})
      },
      onDismissed() {
        this.clearError()
      }
    }
  }
</script>
