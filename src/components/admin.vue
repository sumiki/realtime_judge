<template>
  <div class="container">
    <div class="page-header">
      <h1>Admin - Realtime Judge</h1>
      <div>{{ currentUser.email }}</div>
      <button v-on:click="logout">Logout</button>
    </div>
    <div class="panel panel-default">
    <div class="panel-heading">
      <h3>Add Heat</h3>
    </div>
    <div class="panel-body">
      <form id="form" class="form-inline" v-on:submit.prevent="addHeat" >
        <div class="form-group">
          <label for="heat">Heat:</label>
          <input type="text" id="heat" class="form-control" v-model="newHeat.name" autocomplete="off" maxlength="20" size="20" />
          <input type="submit" class="btn btn-primary" value="Add Heat" />
          <div class="errors" >{{ heat_error }}</div>
        </div>
      </form>
    </div>
    <div class="panel-heading">
      <h3>Heats</h3>
    </div>
    <div class="panel-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Heat Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="heat in heats">
              <td>{{ heat.name }}</td>
              <td><span class="glyphicon glyphicon-trash" v-on:click="removeHeat(heat)"></span></td>
            </tr>
          </tbody>
        </table>
    </div>

    </div>

  </div>
</template>

<script>
import firebase from '../firebase'
let db = firebase.database();
let heatsRef = db.ref('heats');


export default {
  name: 'Admin',
  data () {
    return {
      currentUser: this.$store.state.user,
      newHeat: {
        name: '',
      }
    }
  },
  computed: {
    validation: function(){
      return {
        heatName: true
      }
    },
    heat_error: function(){
      if ( this.newHeat.name == '' || this.validation.heatName ){
            return ''
      } else {
            return 'Invalid'
      }
    }
  },
  firebase: function(){
    return {
      heats: heatsRef
    }
  },
  methods: {
    logout: function(){
      firebase.auth().signOut().then(() => {
      this.$router.replace('login')
      })
    },
    addHeat: function(){
      if( this.validation.heatName ){
        heatsRef.push( this.newHeat )
        this.newHeat.name = ''
      }
    },
    removeHeat: function(heat){
      heatsRef.child(heat['.key']).remove();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

div.errors{
  color: red;
}
</style>
