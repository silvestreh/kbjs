import toastr from 'toastr';
import editor from 'components/editor';
import preview from 'components/preview';
import languageMixin from 'src/mixins/language-mixin';
import { uploadsService, } from 'src/feathers/services';

const bucket = 's3_bucket';

export default {
    props: [
        'model',
        'title',
        'language',
    ],

    mixins: [
        languageMixin,
    ],

    components: {
        editor,
        preview,
    },

    data() {
        return {
            displayPreview: false,
        };
    },

    methods: {
        uploadImage() {
            const reader = new FileReader();

            reader.readAsDataURL(this.$els.image.files[0]);
            reader.onload = () => {
                toastr.info('Uploading, hang on…');
                uploadsService.create({ uri: reader.result, })
                    .then((response) => {
                        const codemirror = document.querySelector('editor').cm;
                        const url = `https://${bucket}.s3.amazonaws.com/${response.id}`;

                        codemirror.replaceSelection(`![](${url})`);
                        this.$els.image.value = '';
                        toastr.success('Uploaded!');
                    })
                    .catch((error) => {
                        throw new Error(error);
                    });
            };
        },

        makeBold() {
            const codemirror = document.querySelector('editor').cm;
            const selection = codemirror.getSelection();

            codemirror.replaceSelection(`**${selection}**`);
            codemirror.focus();
        },

        makeItalic() {
            const codemirror = document.querySelector('editor').cm;
            const selection = codemirror.getSelection();

            codemirror.replaceSelection(`*${selection}*`);
            codemirror.focus();
        },

        makeStrikeThrough() {
            const codemirror = document.querySelector('editor').cm;
            const selection = codemirror.getSelection();

            codemirror.replaceSelection(`~~${selection}~~`);
            codemirror.focus();
        },

        addListItem() {
            const codemirror = document.querySelector('editor').cm;
            const cursor = codemirror.getCursor();
            const line = codemirror.getLine(cursor.line);
            const pos = {
                line: cursor.line,
                ch: line.length,
            };

            codemirror.replaceRange('\n\n* List item', pos);
            codemirror.focus();
        },

        togglePreview() {
            this.displayPreview = !this.displayPreview;
        }
    },
};
