import { categoryService, } from 'src/feathers/services';
import languageMixin from 'src/mixins/language-mixin';
import {
    fetchCategories,
    watchCreatedCategories,
    watchRemovedCategories,
    watchUpdatedCategories,
} from 'src/vuex/actions';

export default {
    name: 'categories-editor',

    props: [
        'categoriesFor',
        'show',
        'selected',
    ],

    mixins: [
        languageMixin,
    ],

    vuex: {
        getters: {
            allCategories: state => state.categories,
        },

        actions: {
            fetchCategories,
            watchCreatedCategories,
            watchRemovedCategories,
            watchUpdatedCategories,
        },
    },

    computed: {
        categories() {
            return this.allCategories.filter(category => category.for === this.categoriesFor);
        },

        selected() {
            return this.categories.filter(category => category.selected);
        },
    },

    data() {
        return {
            displayNew: false,
            newCategory: {
                name: {
                    en: '',
                    es: '',
                    pt: '',
                },
                for: this.categoriesFor,
            },
        };
    },

    ready() {
        this.fetchCategories();
        this.watchCreatedCategories();
        this.watchRemovedCategories();
        this.watchUpdatedCategories();
    },

    methods: {
        createCategory() {
            if (!this.newCategory.name.en) return;

            categoryService.create(this.newCategory)
                .then(() => {
                    this.newCategory.name.en = '';
                    this.newCategory.name.es = '';
                    this.newCategory.name.pt = '';
                })
                .catch(error => new Error(error));
        },

        hide() {
            this.show = false;
        },

        toggleNew() {
            this.displayNew = !this.displayNew;
        },
    },
};
