<template>

  <div>
  <div>Add Point</div>
  <form id="form" class="form-inline" v-on:submit.prevent="addPoint( currentHeat['.key'], player.color )" >
     <div class="form-group">
       <label for="point">Point:</label>
       <input type="text" id="point" class="form-control" v-model="newPoint.point" autocomplete="off" maxlength="2" size="2" />
       <input type="submit" class="btn btn-primary" value="Add Point" />
       <div class="errors" >{{ point_error }}</div>
     </div>
   </form>
  </div>
</template>

<script>
import firebase from '../firebase'
let db = firebase.database();
let pointsRef = db.ref('points');
export default {
  name: 'Judge',
  props: [
    'currentHeat',
    'player'
  ],
  data() {
    return {
      newPoint: {
        point: '',
        user_email: this.$store.state.user.email,
        heat_id: '',
        player_color: ''
      }
    }
  },
  computed: {
    validation: function(){
      return {
        point: /^[0-9]$|^10$/.test( this.newPoint.point )
      }
    },
    point_error: function(){
      if ( this.newPoint.point == '' || this.validation.point ){
            return ''
      } else {
            return 'Invalid Number'
      }
    }
  },
  methods: {
    addPoint: function( heat_id, player_color ){
      if( this.validation.point ){
        this.newPoint.heat_id = heat_id
        this.newPoint.player_color = player_color
        pointsRef.push( this.newPoint )
        this.newPoint.point = ''
      }
    }
  }
}
</script>


<style scoped>
div.errors{
  color: red;
}
</style>
