import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB_cB1p70J7Xt1VZVy3fUuaQDjwCAialwI',
  authDomain: 'nfactorial-hw2.firebaseapp.com',
  databaseURL: 'https://nfactorial-hw2.firebaseio.com',
  projectId: 'nfactorial-hw2',
  storageBucket: 'nfactorial-hw2.appspot.com',
  messagingSenderId: '855029749424',
  appId: '1:855029749424:web:bb1c7a3f1dd6a002ca0d75',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
