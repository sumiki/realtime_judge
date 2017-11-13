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
          <Judge v-bind:currentHeat="currentHeat" v-bind:player="player"></Judge>
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
              <tbody v-if="points" style="vertical-align: top;">
                <tr v-for="point in points" v-if="point.user_email == currentUser.email && point.heat_id == currentHeat['.key'] && point.player_color == player.color">
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
import Judge from './Judge.vue'
let db = firebase.database();
let pointsRef = db.ref('points');
let heatsRef = db.ref('heats');


export default {
  name: 'Judges',
  components: {
    Judge: Judge
  },
  data () {
    return {
      currentUser: this.$store.state.user
    }
  },
  computed: {
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
      points: pointsRef,
      heats: heatsRef.orderByChild('start_time')
    }
  },
  methods: {
    logout: function(){
      firebase.auth().signOut().then(() => {
      this.$router.replace('login')
      })
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


div.spacer{
  width: 100%;
  height: 10px;
}
</style>
