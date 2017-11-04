<template>
  <div class="container">
    <div class="page-header">
      <h1>Realtime Judge</h1>
      <div>{{ currentUser.email }}</div>
      <button v-on:click="logout">Logout</button>
    </div>
    <div class="panel panel-default">
    <div class="panel-heading">
      <h3>Add Point</h3>
    </div>
    <div class="panel-body">
      <form id="form" class="form-inline" v-on:submit.prevent="addPoint" >
        <div class="form-group">
          <label for="point">Point:</label>
          <input type="text" id="point" class="form-control" v-model="newPoint.point"/>
          <input type="submit" class="btn btn-primary" value="Add Point" />
        </div>
      </form>
    </div>

      <div class="panel-heading">
        <h3>Points</h3>
      </div>
      <div class="panel-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Point</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="point in points">
                <td>{{ point }}</td>
                <td><span class="glyphicon glyphicon-trash" v-on:click="removePoint(point)"></span></td>
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
let pointsRef = db.ref('points');

export default {
  name: 'HelloWorld',
  data () {
    return {
      currentUser: firebase.auth().currentUser,
      newPoint: {
        point: '',
        user_email: firebase.auth().currentUser.email
      }
    }
  },
  firebase:{
    points: pointsRef
  },
  methods: {
    logout: function(){
      firebase.auth().signOut().then(() => {
      this.$router.replace('login')
      })
    },
    addPoint: function(){
      pointsRef.push( this.newPoint )
      this.newPoint.point = ''
    },
    removePoint: function(point){
      pointsRef.child(point['.key']).remove();
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
</style>
