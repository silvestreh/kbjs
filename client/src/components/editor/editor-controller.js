import codeMirror from 'codemirror';
import 'codemirror/addon/selection/active-line';
import 'codemirror/mode/markdown/markdown';

export default {
    replace: false,

    props: [
        'model',
    ],

    ready() {
        this.$nextTick(this.initCodeMirror);
    },

    methods: {
        initCodeMirror() {
            const options = {
                lineNumbers: true,
                styleActiveLine: true,
                lineWrapping: true,
                mode: 'markdown',
            };

            const cm = codeMirror(this.$el, options);

            this.$el.cm = cm;

            cm.on('change', () => {
                this.$set('model', cm.getValue());
            });

            cm.setValue(this.model);

            this.$watch('model', (value) => {
                if (value !== cm.getValue()) {
                    cm.setValue(value);
                }
            });
        },
    },
};
