import toastr from 'toastr';
import { questionService, } from 'src/feathers/services';
import markdownEditor from 'components/markdown-editor';
import categoriesEditor from 'components/categories-editor';
import languageMixin from 'src/mixins/language-mixin';

export default {
    name: 'question-editor',

    components: {
        categoriesEditor,
        markdownEditor,
    },

    mixins: [
        languageMixin,
    ],

    ready() {
        if (this.$route.params.id) {
            questionService.get(this.$route.params.id)
                .then((result) => {
                    this.formData._id = result._id;
                    this.formData.draft = result.draft;

                    this.formData.answer.en = result.answer.en;
                    this.formData.answer.es = result.answer.es;
                    this.formData.answer.pt = result.answer.pt;

                    this.formData.question.en = result.question.en;
                    this.formData.question.es = result.question.es;
                    this.formData.question.pt = result.question.pt;

                    result.categories.forEach((category) => {
                        this.formData.categories.push(category);
                    });
                });
        }
    },

    data() {
        return {
            displayCategories: false,
            formData: {
                answer: {
                    en: '',
                    es: '',
                    pt: '',
                },
                question: {
                    en: '',
                    es: '',
                    pt: '',
                },
                categories: [],
                draft: true,
            },
        };
    },

    methods: {
        publish() {
            this.formData.draft = false;
            if (this.formData._id) {
                questionService.update(this.formData._id, this.formData)
                    .then(() => {
                        toastr.success('Published!');
                        this.$router.go('/app/questions');
                    })
                    .catch(error => new Error(error));
            } else {
                questionService.create(this.formData)
                    .then(() => {
                        toastr.success('Saved!');
                        this.$router.go('/app/questions');
                    })
                    .catch(error => new Error(error));
            }
        },

        save() {
            if (this.formData._id) {
                questionService.update(this.formData._id, this.formData)
                    .then(() => {
                        toastr.success('Saved!');
                    })
                    .catch(error => new Error(error));
            } else {
                questionService.create(this.formData)
                    .then((result) => {
                        this.formData._id = result._id;
                        toastr.success('Saved!');
                    })
                    .catch(error => new Error(error));
            }
        },

        unPublish() {
            this.formData.draft = true;
            questionService.update(this.formData._id, this.formData)
                .then(() => {
                    toastr.success('Un-Published!');
                })
                .catch(error => new Error(error));
        },

        showCategories() {
            this.displayCategories = true;
        },
    },
};
