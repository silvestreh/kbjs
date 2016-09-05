import toastr from 'toastr';
import { articleService, } from 'src/feathers/services';
import markdownEditor from 'components/markdown-editor';
import categoriesEditor from 'components/categories-editor';
import languageMixin from 'src/mixins/language-mixin';

export default {
    name: 'article-editor',

    components: {
        categoriesEditor,
        markdownEditor,
    },

    mixins: [
        languageMixin,
    ],

    ready() {
        if (this.$route.params.id) {
            articleService.get(this.$route.params.id)
                .then((result) => {
                    this.formData._id = result._id;
                    this.formData.draft = result.draft;

                    this.formData.title.en = result.title.en;
                    this.formData.title.es = result.title.es;
                    this.formData.title.pt = result.title.pt;

                    this.formData.content.en = result.content.en;
                    this.formData.content.es = result.content.es;
                    this.formData.content.pt = result.content.pt;

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
                title: {
                    en: '',
                    es: '',
                    pt: '',
                },
                content: {
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
                articleService.update(this.formData._id, this.formData)
                    .then(() => {
                        toastr.success('Published!');
                        this.$router.go('/app/articles');
                    })
                    .catch(error => new Error(error));
            } else {
                articleService.create(this.formData)
                    .then(() => {
                        toastr.success('Saved!');
                        this.$router.go('/app/articles');
                    })
                    .catch(error => new Error(error));
            }
        },

        save() {
            if (this.formData._id) {
                articleService.update(this.formData._id, this.formData)
                    .then(() => {
                        toastr.success('Saved!');
                    })
                    .catch(error => new Error(error));
            } else {
                articleService.create(this.formData)
                    .then((result) => {
                        this.formData._id = result._id;
                        toastr.success('Saved!');
                    })
                    .catch(error => new Error(error));
            }
        },

        unPublish() {
            this.formData.draft = true;
            articleService.update(this.formData._id, this.formData)
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
