import marked from 'marked';

export default {
    props: [
        'content',
        'show',
        'title',
    ],

    filters: {
        marked,
    },

    methods: {
        hide() {
            this.show = false;
        },
    },
};
