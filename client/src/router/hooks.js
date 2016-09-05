import app from 'src/feathers/app';

export const authHook = (transition) => {
    if (transition.to.auth) {
        app.authenticate()
            .then(() => {
                transition.next();
            })
            .catch(() => transition.redirect('/login'));
    } else {
        transition.next();
    }
};
