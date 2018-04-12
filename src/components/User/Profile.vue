<template>
  <v-container fluid fill-height>>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title><v-icon left dark>person</v-icon> User Profile</v-toolbar-title>
          </v-toolbar>
          <v-alert type="info" :value="removed">Profile removed !</v-alert>
          <v-card-text>
            <v-text-field
              prepend-icon="person"
              label="Mail"
              :value="currentUser ? currentUser.email : ''"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              @click="removeUser">
              <v-icon left dark>remove_circle</v-icon>Remove current user account
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    data () {
      return {
        removed: false
      }
    },
    computed: {
    ...mapGetters([
        'currentUser'
      ])
    },
    methods: {
      ...mapActions({
        deleteCurrentUser: 'deleteCurrentUser'
      }),
      removeUser () {
        this.deleteCurrentUser()
          .then(() => {
            this.removed = true
            setTimeout(() => {
              this.removed = false
              this.$router.push('/')
            }, 3000)
          })
      }
    }
  }
</script>
