import { articleService, categoryService, questionService, } from 'src/feathers/services';

// Langauge Setter
export const setLanguage = ({ dispatch, }, lang) => {
    dispatch('CHANGE_LANG', lang);
};

// Articles
export const fetchArticles = ({ dispatch, }, cb) => {
    articleService.find().then((articles) => {
        dispatch('FETCH_ARTICLES', articles.data);
        if (cb && typeof cb === 'function') cb();
    });
};

export const watchCreatedArticles = ({ dispatch, }) => {
    articleService.on('created', result => dispatch('ADD_ARTICLE', result));
};

export const watchUpdatedArticles = ({ dispatch, }) => {
    articleService.on('updated', result => dispatch('UPDATE_ARTICLE', result));
};

export const watchRemovedArticles = ({ dispatch, }) => {
    articleService.on('removed', result => dispatch('REMOVE_ARTICLE', result));
};

// Categories
export const fetchCategories = ({ dispatch, }, cb) => {
    categoryService.find().then((categories) => {
        dispatch('FETCH_CATEGORIES', categories.data);
        if (cb && typeof cb === 'function') cb();
    });
};

export const watchCreatedCategories = ({ dispatch, }) => {
    categoryService.on('created', result => dispatch('ADD_CATEGORY', result));
};

export const watchUpdatedCategories = ({ dispatch, }) => {
    categoryService.on('updated', result => dispatch('UPDATE_CATEGORY', result));
};

export const watchRemovedCategories = ({ dispatch, }) => {
    categoryService.on('removed', result => dispatch('REMOVE_CATEGORY', result));
};

// Questions
export const fetchQuestions = ({ dispatch, }, cb) => {
    questionService.find().then((questions) => {
        dispatch('FETCH_QUESTIONS', questions.data);
        if (cb && typeof cb === 'function') cb();
    });
};

export const watchCreatedQuestions = ({ dispatch, }) => {
    questionService.on('created', result => dispatch('ADD_QUESTION', result));
};

export const watchUpdatedQuestions = ({ dispatch, }) => {
    questionService.on('updated', result => dispatch('UPDATE_QUESTION', result));
};

export const watchRemovedQuestions = ({ dispatch, }) => {
    questionService.on('removed', result => dispatch('REMOVE_QUESTION', result));
};
