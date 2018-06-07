import {
    mapActions,
    mapGetters
} from 'vuex';



export default {
    beforeRouteEnter(to, from, next) {
        // next(async (vm) => {
        //     const loading = vm.$loading({
        //         fullscreen: true,
        //         customClass: 'map-loading'
        //     });

        //     await vm.loginImgGetData();

        //     loading.close();
        // });
        next();
    },
    data() {
        return {
            selectImg: 0,
            formInline: {
                account: '',
                password: ''
            },
            ruleInline: {
                account: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                },
                {
                    type: 'string',
                    min: 6,
                    message: '密码最少六位',
                    trigger: 'blur'
                }
                ]
            }
        };
    },
    computed: {
        ...mapGetters([
            '$apis',
            'loginImgData',
            '$groupAccount'
        ])
    },
    methods: {
        ...mapActions([
            '$groupLogin',
            'loginImgGetData'
        ]),
        handleSubmit(name) {
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    await this.$groupLogin(this.formInline);
                    if (this.$groupAccount && this.$groupAccount.account) {
                        window.location.href = '../#/';
                    } else {
                        this.$Message.error('登陆失败');
                    }
                }
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                this.valid = valid;

                if (valid) {
                    const username = this.loginForm.username;
                    const password = this.loginForm.password;

                    this.$groupLogin({
                        username,
                        password
                    }).then(() => {
                        window.location.href = '../#/';
                    });
                }
            });
        }
    }
};
