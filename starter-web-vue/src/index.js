import Vue from 'vue';
import 'isomorphic-fetch';
import App from './components/App.vue';
import './styles/app.scss';

new Vue({ // eslint-disable-line no-new
  el: 'app',
  components: { App },
});
