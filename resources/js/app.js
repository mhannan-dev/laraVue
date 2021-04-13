/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

// window.Vue = require('vue');
window.Form = Form;
import Vue from 'vue'
import moment from 'moment'
//Vue.prototype.moment = moment
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import { Form, HasError, AlertError } from 'vform'
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
//VueProgressBar
import VueProgressBar from 'vue-progressbar'
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
window.Swal = Swal;

const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  window.toast = toast;

let routes = [
    { path: '/dashboard', component: require('./components/pages/dashboard/Dashboard.vue').default },
    { path: '/users', component: require('./components/pages/management/Users.vue').default },
    { path: '/profile', component: require('./components/Profile.vue').default }

]

// Register route array/ variable
const router = new VueRouter({
    mode: 'history',
    routes

})

Vue.filter('upText', function (text){
    return text.charAt(0).toUpperCase() + text.slice(1)
})


Vue.filter('myDate', function(value) {
    if (value) {
        return moment(String(value)).format('MMMM Do YYYY')
    }
});
window.Fire =  new Vue();
Vue.use(VueProgressBar,{
    color: 'green',
    failedColor: '#F57832',
    thickness: '4px'
})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
