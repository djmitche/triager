import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDqS5IHq_zkB0hoRe6LPOn2uYCfcOndbEI',
  authDomain: 'taskcluster-triager.firebaseapp.com',
  databaseURL: 'https://taskcluster-triager.firebaseio.com',
  projectId: 'taskcluster-triager',
  storageBucket: 'taskcluster-triager.appspot.com',
  messagingSenderId: '570495932036',
};
firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
