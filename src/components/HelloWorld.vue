<template>
  <div class="container">
    <div class="page-header">
      <h1>Realtime Judge</h1>
      <div>{{ currentUser.email }}</div>
      <button v-on:click="logout">Logout</button>
    </div>

    <ul class="nav nav-tabs">
      <li role="presentation" v-bind:class="{ active: heat['.key'] == currentHeat['.key'] }"  v-for="heat in heats">
        <a href="#" v-on:click.prevent="selectHeat(heat)" >{{ heat.name }}</a>
      </li>
    </ul>
    <div class="spacer"></div>

    <div class="panel panel-default">
      <table class="table">
        <tr>
          <th v-for="player in currentHeat.players" ><h3>{{ player.color }}</h3></th>
        </tr>
        <tr>
          <td v-for="player in currentHeat.players">
            <div>Add Point</div>
            <form id="form" class="form-inline" v-on:submit.prevent="addPoint( currentHeat['.key'], player['.key'] )" >
              <div class="form-group">
                <label for="point">Point:</label>
                <input type="text" id="point" class="form-control" v-model="newPoint.point" autocomplete="off" maxlength="2" size="2" />
                <input type="submit" class="btn btn-primary" value="Add Point" />
                <div class="errors" >{{ point_error }}</div>
              </div>
            </form>
          </td>
        </tr>
        <tr>
          <td v-for="player in currentHeat.players">
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
                  <td>{{ point.point }}</td>
                  <td><span class="glyphicon glyphicon-trash" v-on:click="removePoint(point)"></span></td>
                </tr>
              </tbody>
            </table>
          </div>
          </td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
import firebase from '../firebase'
let db = firebase.database();
let pointsRef = db.ref('points');
let heatsRef = db.ref('heats');


export default {
  name: 'HelloWorld',
  data () {
    return {
      currentUser: this.$store.state.user,
      newPoint: ( () => {
        console.log( this.currentHeat )
        return {
          point: '',
          user_email: this.$store.state.user.email
        }
      } )()
    }
  },
  computed: {
    validation: function(){
      return {
        point: /^[0-9]$|^10$/.test( this.newPoint.point )
      }
    },
    point_error: function(){
      console.log( this.newPoint.point )
      if ( this.newPoint.point == '' || this.validation.point ){
            return ''
      } else {
            return 'Invalid Number'
      }
    },
    currentHeat: function(){
      if( ! this.$store.state.currentHeat.name ){
        if( this.heats[0] ){
          this.$store.commit('setCurrentHeat', this.heats[0]);
          return this.heats[0]
        } else {
          return {}
        }
      } else {
        return this.$store.state.currentHeat
      }

    }
  },
  firebase: function(){
    return {
      points: pointsRef.orderByChild('user_email').equalTo( this.$store.state.user.email ),
      heats: heatsRef.orderByChild('start_time')
    }
  },
  methods: {
    logout: function(){
      firebase.auth().signOut().then(() => {
      this.$router.replace('login')
      })
    },
    addPoint: function( heat_id, player_id ){
      if( this.validation.point ){
        this.newPoint.heat_id = heat_id
        this.newPoint.player_id = player_id
        pointsRef.push( this.newPoint )
        this.newPoint.point = ''
      }
    },
    removePoint: function(point){
      pointsRef.child(point['.key']).remove();
    },
    selectHeat: function(heat){
      this.$store.commit('setCurrentHeat', heat);
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

div.spacer{
  width: 100%;
  height: 10px;
}
</style>
