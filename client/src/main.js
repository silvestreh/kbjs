import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './app.vue';
import routes from 'router/routes-map';
import redirs from 'router/redirs';
import { authHook, } from 'router/hooks';
import Resource from 'vue-resource';
import toastr from 'toastr';

toastr.options = {
    positionClass: 'toast-bottom-right',
};

Vue.use(VueRouter);
Vue.use(Resource);

Vue.transition('main', {
    enterClass: 'fadeIn',
    leaveClass: 'fadeOut',
});

const router = new VueRouter({
    linkActiveClass: 'tabs__tab--active',
});

router.map(routes);
router.redirect(redirs);
router.beforeEach(authHook);
router.start(Main, '#app');
