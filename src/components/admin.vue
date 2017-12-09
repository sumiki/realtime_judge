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
            <div style="display: inline-block;">
              <input type="text" id="heat" class="form-control" v-model="newHeat.name" autocomplete="off" maxlength="20" size="20" />
              <div class="errors" >{{ heatNameError }}</div>
            </div>
            <label for="heat">Start Time:</label>
            <div style="display: inline-block;">
              <input type="text" id="heat" class="form-control" v-model="newHeat.start_time" autocomplete="off" placeholder="12:00" maxlength="5" size="5" />
              <div class="errors" >{{ heatStartTimeError }}</div>
            </div>
            <input type="submit" class="btn btn-primary" value="Add Heat" />
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
                <th>Start Time</th>
                <th>Publish</th>
                <th class="player">Player</th>
                <th class="number_of_ride">Number of Ride</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="heat in heats">
                <td>{{ heat.name }}</td>
                <td>{{ heat.start_time }}</td>
                <td>
                  <div v-if="heat.published" v-on:click="unpublish(heat)"><button>Published</button></div>
                  <div v-else><button v-on:click="publish(heat)">Not Published</button></div>
                </td>
                <td>
                  <div v-for="player in heat.players">
                    <span v-on:click="showNameField(heat, player.color)" class="color_tag" v-bind:class="[ `${player.color}_tag` ]" >{{ player.color }}</span>
                    <div class="name_form_area" v-if="( showNameFieldKey == `${heat['.key']}-${ player.color }` )">
                      <form v-on:submit="addName( heat )">
                      <input type="text" v-model="player.name" ref="player_name" />
                      <input type="submit" class="btn btn-primary" value="Add" />
                      </form>
                    </div>
                    <span v-else>{{ player.name }}</span>
                  </div>
                </td>
                <td>
                <div v-for="player in heat.players">
                  <button v-on:click="plusNumberOfRide( heat, player )">↑</button> 
                  <span v-model="player.number_of_ride">{{ player.number_of_ride }}</span> 
                  <button v-on:click="minusNumberOfRide( heat, player )" :disabled="player.number_of_ride == 0" >↓</button>
                </div>
                </td>
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
import './../assets/color_tags.css'
let db = firebase.database();
let heatsRef = db.ref('heats');

export default {
  name: 'Admin',
  data () {
    return {
      currentUser: this.$store.state.user,
      newHeat: {
        name: '',
        start_time: '',
        published: false,
        players: [
          {
            color: "red",
            name: "",
            number_of_ride: 0
          },
          {
            color: "blue",
            name: "",
            number_of_ride: 0
          },
          {
            color: "green",
            name: "",
            number_of_ride: 0
          },
          {
            color: "pink",
            name: "",
            number_of_ride: 0
          },
          {
            color: "yellow",
            name: "",
            number_of_ride: 0
          },
          {
            color: "white",
            name: "",
            number_of_ride: 0
          }
        ]
      },
      showNameFieldKey: false
    }
  },
  computed: {
    validation: function(){
      return {
        heatName: true,
        startTime: /^[0-9]{2}:[0-9]{2}$/.test( this.newHeat.start_time )
      }
    },
    heatNameError: function(){
      if ( this.newHeat.name == '' || this.validation.heatName ){
            return ''
      } else {
            return 'Invalid'
      }
    },
    heatStartTimeError: function(){
      if ( this.newHeat.start_time == '' || this.validation.startTime ){
            return ''
      } else {
            return 'Invalid'
      }
    }
  },
  firebase: function(){
    return {
      heats: heatsRef.orderByChild('start_time')
    }
  },
  methods: {
    logout: function(){
      firebase.auth().signOut().then(() => {
      this.$router.replace('login')
      })
    },
    addHeat: function(){
      if( this.validation.heatName && this.validation.startTime ){
        heatsRef.push( this.newHeat )
        this.newHeat.name = ''
        this.newHeat.start_time = ''
      }
    },
    removeHeat: function(heat){
      heatsRef.child(heat['.key']).remove();
    },
    showNameField: function(heat, color){
      this.showNameFieldKey = `${heat['.key']}-${ color }`
    },
    addName: function(heat){
      var item = {...heat}
      delete item['.key']
      heatsRef.child(heat['.key']).set(item)
      this.showNameFieldKey = ''
    },
    publish: function(heat){
      var item = {...heat}
      item.published = true
      delete item['.key']
      heatsRef.child(heat['.key']).set(item)
    },
    unpublish: function(heat){
      var item = {...heat}
      item.published = false
      delete item['.key']
      heatsRef.child(heat['.key']).set(item)
    },
    plusNumberOfRide: function(heat,player){
      player.number_of_ride++
      var item = {...heat}
      delete item['.key']
      heatsRef.child(heat['.key']).set(item)
    },
    minusNumberOfRide: function(heat,player){
      player.number_of_ride--
      var item = {...heat}
      delete item['.key']
      heatsRef.child(heat['.key']).set(item)
    }
  },
  updated: function () {
    if( ( Object.keys( this.$refs ).length > 0 ) && this.$refs.player_name[0] ){
      this.$refs.player_name[0].focus()
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
  height: 1em;
  position: absolute;
}

th.player{
  width: 420px;
}

div.name_form_area{
  display: inline-block;
}


</style>
