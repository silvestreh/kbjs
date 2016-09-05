import app from 'src/feathers/app';
import toastr from 'toastr';

export default {
    init() {
        if (app.get('token')) this.$router.go('/');
    },

    data() {
        return {
            loading: false,
            email: '',
            password: '',
        };
    },

    methods: {
        signIn() {
            this.loading = true;

            app.authenticate({
                type: 'local',
                email: this.email,
                password: this.password,
            }).then(() => {
                this.loading = false;
                toastr.success('Welcome back!');
                this.$router.go('/app');
            }).catch((error) => {
                this.loading = false;
                toastr.error('Invalid username or password');
                throw new Error(error);
            });
        },
    },
};
