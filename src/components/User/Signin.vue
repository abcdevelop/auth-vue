<template>
  <v-container fluid fill-height>>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <form @submit.prevent="onSignin">
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title><v-icon left dark>lock_open</v-icon> Sign In form</v-toolbar-title>
            </v-toolbar>
            <app-alert v-if="error" @dismissed="onDismissed" :text="error.message"></app-alert>
            <v-card-text>
              <v-text-field
                prepend-icon="person"
                label="Mail"
                id="email"
                name="email"
                type="email"
                v-model="email"
                required>
              </v-text-field>
              <v-text-field
                prepend-icon="lock"
                label="Password"
                id="password"
                name="password"
                type="password"
                v-model="password"
                required>
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                type="submit"
                color="primary"
                :disabled="loading"
                :loading="loading">
                <v-icon left dark>lock_open</v-icon>Sign in
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
        password: ''
      }
    },
    computed: {
      ...mapGetters([
        'currentUser',
        'error',
        'loading'
      ])
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
        userSignIn: 'userSignIn',
        clearError: 'clearError'
      }),
      onSignin() {
        this.userSignIn({email: this.email, password: this.password})
      },
      onDismissed() {
        this.clearError()
      }
    }
  }
</script>
