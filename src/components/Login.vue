<template>
  <div class="login">
    <h3>Login</h3>
    <form id="form" class="form-inline" v-on:submit.prevent="signIn" >
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button >Login</button>
    </form>
    <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
  </div>
</template>

<script>
import firebase from '../firebase'
export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('judges')
        },
        function(err){
          alert('Error' + err.message)
        }
      )
    }
  }
}
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
.login {
  margin-top: 40px;
  text-align: center;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
