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
      <div v-for="heat in heats">
        <div v-if="heat['.key'] == currentHeat['.key']" >
          <table class="table">
            <tr>
              <th v-for="player in heat.players" >
                <span class="color_tag" v-bind:class="[ `${player.color}_tag` ]" >{{ player.color }}</span>
                <div>{{ player.name ? player.name.toString().slice(0,20) : '' }}</div>
              </th>
            </tr>
            <tr>
              <td v-for="player in heat.players">
              <Judge v-bind:heat="heat" v-bind:player="player"></Judge>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: top;" v-for="player in heat.players">
              <div class="panel-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Total:</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>1st:</th>
                      <td>{{ firstPoint( player.color ) }}</td>
                    </tr>
                    <tr>
                      <th>2nd:</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Needs:</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Judged</th>
                      <td>{{number_of_judged_point( heat, player )}} / {{ player.number_of_ride }}</td>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th>Point</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody v-if="points" style="vertical-align: top;">
                    <tr v-for="point in points" v-if="point.user_email == currentUser.email && point.heat_id == heat['.key'] && point.player_color == player.color">
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
      
    </div>

  </div>
</template>

<script>
import firebase from '../firebase'
import './../assets/color_tags.css'
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
    },
    firstPoint: function(color){
      var target_points = []
      for( let point of this.points ){
        if( point.player_color == color && point.heat_id == this.currentHeat['.key']  ){
          target_points.push( point.point )
        }
      }
      var sorted_points = target_points.sort()
      return sorted_points[ sorted_points.length - 1 ]
    },
    number_of_judged_point: function(currentHeat, player){
      let num = 0
      for( let point of this.points ){
        if( point.player_color == player.color && point.heat_id == this.currentHeat['.key']  ){
          num++
        }
      }
      return num
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
