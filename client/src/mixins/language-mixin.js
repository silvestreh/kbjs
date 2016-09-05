import { setLanguage, } from 'src/vuex/actions';

export default {
    vuex: {
        getters: {
            lang: state => state.lang,
        },

        actions: {
            setLanguage,
        },
    },

    methods: {
        isLanguage(lang) {
            return this.lang === lang;
        },
    },
};
