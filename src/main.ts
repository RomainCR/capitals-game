import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import firebase from "firebase/app"

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDmpMf5e7wzMaKYPYZ8WeUcwnzfSW76-Wk",
    authDomain: "the-capitals-game.firebaseapp.com",
    databaseURL: "https://the-capitals-game.firebaseio.com",
    projectId: "the-capitals-game",
    storageBucket: "the-capitals-game.appspot.com",
    messagingSenderId: "601949106495",
    appId: "1:601949106495:web:da34bcede2702f01a5638a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
