import Vue from 'vue';
import tabs from 'src/components/tabs';

describe('Tabs Component', () => {
    let vm;

    beforeEach(() => {
        vm = new Vue({
            template: '<div><tabs v-ref:tabs></tabs></div>',
            components: {
                tabs,
            },
        }).$mount();
    });

    it('should render correct contents', () => {
        expect(vm.$el.querySelectorAll('.tabs__tab').length).to.equal(3);
    });

    it('Should have a logout method', () => {
        expect(typeof tabs.methods.logOut).to.equal('function');
    });
});
