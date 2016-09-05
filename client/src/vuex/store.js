import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

const state = {
    lang: 'en',
    articles: [],
    categories: [],
    questions: [],
};

const mutations = {
    // Change Language
    CHANGE_LANG(state, lang) {
        state.lang = lang;
    },

    // Articles
    FETCH_ARTICLES(state, articles) {
        state.articles = articles;
    },

    ADD_ARTICLE(state, article) {
        const index = _.findIndex(state.articles, { _id: article._id, });
        if (index < 0) state.articles.push(article);
    },

    REMOVE_ARTICLE(state, article) {
        const index = _.findIndex(state.articles, { _id: article._id, });
        state.articles.$remove(state.articles[index]);
    },

    UPDATE_ARTICLE(state, article) {
        const index = _.findIndex(state.articles, { _id: article._id, });
        state.articles[index] = article;
    },

    // Categories
    FETCH_CATEGORIES(state, categories) {
        state.categories = categories;
    },

    ADD_CATEGORY(state, category) {
        const index = _.findIndex(state.categories, { _id: category._id, });
        if (index < 0) state.categories.push(category);
    },

    REMOVE_CATEGORY(state, category) {
        const index = _.findIndex(state.categories, { _id: category._id, });
        state.categories.$remove(state.categories[index]);
    },

    UPDATE_CATEGORY(state, category) {
        const index = _.findIndex(state.categories, { _id: category._id, });
        state.categories[index] = category;
    },

    // Questions
    FETCH_QUESTIONS(state, questions) {
        state.questions = questions;
    },

    ADD_QUESTION(state, question) {
        const index = _.findIndex(state.questions, { _id: question._id, });
        if (index < 0) state.questions.push(question);
    },

    REMOVE_QUESTION(state, question) {
        const index = _.findIndex(state.questions, { _id: question._id, });
        state.questions.$remove(state.questions[index]);
    },

    UPDATE_QUESTION(state, question) {
        const index = _.findIndex(state.questions, { _id: question._id, });
        state.questions[index] = question;
    },
};

export default new Vuex.Store({
    state,
    mutations,
});
