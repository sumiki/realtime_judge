import Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyCWMeMFRZrbvv8QqsYghwPaf50WDxoqjPY',
  authDomain: 'hello-e207d.firebaseapp.com',
  databaseURL: 'https://hello-e207d.firebaseio.com',
  projectId: 'hello-e207d',
  storageBucket: '',
  messagingSenderId: "492607833085"
};
let firebase = Firebase.initializeApp(config)

export default firebase
