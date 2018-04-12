import * as firebase from 'firebase'

export default {
  state: {
    currentUser: null
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload
    }
  },
  actions: {
    userSignUp({commit}, payload) {
      const email = payload.email
      const password = payload.password
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            commit('setLoading', false)
            commit('setCurrentUser', user)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    userSignIn({commit}, payload) {
      const email = payload.email
      const password = payload.password
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            commit('setLoading', false)
            commit('setCurrentUser', user)
          }
        )
        .catch(error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn({commit}, payload) {
      commit('setCurrentUser', payload)
    },
    logout({commit}) {
      firebase.auth().signOut()
      commit('setCurrentUser', null)
    },
    deleteCurrentUser({commit}) {
      this.getters.currentUser.delete()
        .then(() => {
          commit('setCurrentUser', null)
        }).catch((error) => {
          console.log(error)
      })
    }
  },
  getters: {
    currentUser(state) {
      return state.currentUser
    }
  }
}
