import app from 'src/feathers/app';

export default {
    methods: {
        logOut() {
            app.logout();
            this.$router.go('/login');
        },
    },
};
