import app from 'sections/app';
import notFound from 'sections/not-found';
import signIn from 'sections/sign-in';
import articlesList from 'sections/articles/list';
import articlesEditor from 'sections/articles/editor';
import questionsList from 'sections/questions/list';
import questionsEditor from 'sections/questions/editor';

export default {
    '*': {
        component: notFound,
    },
    '/app': {
        component: app,
        auth: true,
        subRoutes: {
            '/articles': {
                component: articlesList,
            },
            '/articles/new': {
                component: articlesEditor,
            },
            '/articles/:id': {
                name: 'editArticle',
                component: articlesEditor,
            },
            '/questions': {
                component: questionsList,
            },
            '/questions/new': {
                component: questionsEditor,
            },
            '/questions/:id': {
                name: 'editQuestion',
                component: questionsEditor,
            },
        },
    },
    '/login': {
        component: signIn,
    },
};
