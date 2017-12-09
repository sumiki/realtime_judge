<template>

  <div>
  <div>Add Point</div>
  <form id="form" class="form-inline" v-on:submit.prevent="addPoint( currentHeat, player )" >
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
let heatsRef = db.ref('heats');
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
    addPoint: function( heat, player ){
      if( ! player.points ){
        player.points = []
      }
      player.points.push( {...this.newPoint, ...{ ride_no: ( player.points.length + 1 ) }} )
      player.points
      var item = {...heat}
      delete item['.key']
      heatsRef.child(heat['.key']).set(item)
    }
  }
}
</script>


<style scoped>
div.errors{
  color: red;
}
</style>
