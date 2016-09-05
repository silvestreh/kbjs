import { date, dateFromNow, } from 'src/filters';
import { questionService, } from 'src/feathers/services';
import toastr from 'toastr';
import {
    fetchQuestions,
    watchCreatedQuestions,
    watchRemovedQuestions,
    watchUpdatedQuestions,
} from 'src/vuex/actions';

export default {
    vuex: {
        getters: {
            questions: state => state.questions,
        },

        actions: {
            fetchQuestions,
            watchCreatedQuestions,
            watchRemovedQuestions,
            watchUpdatedQuestions,
        },
    },

    filters: {
        date,
        dateFromNow,
    },

    computed: {
        haveData() {
            return this.questions.length > 0;
        },
    },

    ready() {
        this.fetchQuestions();
        this.watchCreatedQuestions();
        this.watchRemovedQuestions();
        this.watchUpdatedQuestions();
    },

    methods: {
        edit(question) {
            this.$router.go({ name: 'editQuestion', params: { id: question._id, }, });
        },

        remove(question) {
            questionService.remove(question._id)
                .then(() => toastr.success('Removed'))
                .catch(error => new Error(error));
        },
    },
};
