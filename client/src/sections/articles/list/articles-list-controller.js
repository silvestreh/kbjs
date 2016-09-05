import toastr from 'toastr';
import { date, dateFromNow, } from 'src/filters';
import { articleService, } from 'src/feathers/services';
import {
    fetchArticles,
    watchCreatedArticles,
    watchRemovedArticles,
    watchUpdatedArticles,
} from 'src/vuex/actions';

export default {
    vuex: {
        getters: {
            articles: state => state.articles,
        },

        actions: {
            fetchArticles,
            watchCreatedArticles,
            watchRemovedArticles,
            watchUpdatedArticles,
        },
    },

    filters: {
        date,
        dateFromNow,
    },

    computed: {
        haveData() {
            return this.articles.length > 0;
        },
    },

    ready() {
        this.fetchArticles();
        this.watchCreatedArticles();
        this.watchRemovedArticles();
        this.watchUpdatedArticles();
    },

    methods: {
        edit(article) {
            this.$router.go({ name: 'editArticle', params: { id: article._id, }, });
        },

        remove(article) {
            articleService.remove(article._id)
                .then(() => toastr.success('Removed'))
                .catch(error => new Error(error));
        },
    },
};
