import DefaultLayout from "~/layouts/Default.vue";
import vueSmoothScroll from "vue2-smooth-scroll";
import axios from 'axios'
axios.defaults.baseURL = 'https://admin.dimaduchet.com/wp-json/wp/v2/'

export default function (Vue) {
  Vue.component("Layout", DefaultLayout);
  Vue.use(vueSmoothScroll);
}
