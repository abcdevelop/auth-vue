import firebase from 'firebase'

var config = {
};
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.database()
export const dbLightsRef = db.ref('lights')
