<template>
<div class="container">
  <div class="page-header">
    <h1>Realtime Judge</h1>
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
            <th class="player">Player</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="heat in heats">
            <td>{{ heat.name }}</td>
            <td>{{ heat.start_time }}</td>
            <td>
            <div v-for="player in heat.players">
              <span class="color_tag" v-bind:class="[ `${player.color}_tag` ]" >{{ player.color }}</span>
              <span>{{ player.name }}</span>
            </div>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
  </div>
</div>

</template>

<script>
import firebase from '../firebase'
import './../assets/color_tags.css'
let db = firebase.database();
let heatsRef = db.ref('heats');
export default {
  name: 'Home',
  firebase: function(){
    return {
      heats: heatsRef.orderByChild('published').equalTo( true )
    }
  },
  created: function(){
  }
}
</script>

<style scoped>
</style>
