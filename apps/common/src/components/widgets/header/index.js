import {
    mapGetters,
    mapActions
} from 'vuex';
import $ from 'jquery';



export default {
    props: {
        activeName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            showLoginOut: false, // 是否展示退出

            /*
             * url上的模块
            */
            urlModule: '',
            roles: {
                admin: '管理员',
                updater: '录入员',
                user: '普通用户'
            },
            editFormVisible: false,
            dialogResetPassVisible: false,

            /**
             * 修改密码表单
             * @type {Object}
             * @param password 密码
             */
            formResetPass: {
                password: ''
            },

            /**
             * 修改个人资料表单
             * @type {Object}
             * @param uid 用户id
             * @param realName 姓名
             * @param phone 手机号
             * @param email 邮箱
             */
            formEdit: {
                uid: '',
                realName: '',
                phone: '',
                email: ''
            },
            rules: {
                edit: {
                    realName: [{
                        validator: (rule, value, callback) => {
                            if (value !== '' && value.length > 10) {
                                callback(new Error('字符不得超过10个'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }],
                    phone: [{
                        validator: (rule, value, callback) => {
                            if (value.length > 0 && !(/^1[34578]\d{9}$/.test(value))) {
                                callback(new Error('手机格式不正确'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }]
                },
                resetPass: {
                    password: [{
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入密码'));
                            } else if (value.length < 6) {
                                callback(new Error('密码至少6位'));
                            } else if (value.length > 16) {
                                callback(new Error('密码不得超过16位'));
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }]
                }
            }
        };
    },
    computed: {
        ...mapGetters([
            '$groupAccount',
            '$groupLinkList'
        ])
    },
    watch: {
        dialogResetPassVisible(curVal) {
            if (curVal === false) {
                this.$refs.formResetPass.resetFields();
            }
        }
    },
    created() {
        const target = window.location.href.slice(0, window.location.href.indexOf('#') - 1);

        this.urlModule = target.substr(target.lastIndexOf('/') + 1);
    },
    methods: {
        ...mapActions([
            '$groupLogout',
            '$groupResetPassword',
            '$groupEditSelfInfo',
            '$groupSetAccount'
        ]),
        edit() {
            this.formEdit = Object.assign({}, this.$groupAccount);
            this.editFormVisible = true;
        },
        onEditSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$groupEditSelfInfo(this.formEdit)
                        .then(() => {
                            this.$groupSetAccount(this.formEdit);
                            this.editFormVisible = false;
                        });
                }
            });
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.formResetPass.uid = this.$groupAccount.uid;
                    this.$groupResetPassword(this.formResetPass)
                    .then(() => {
                        window.location.href = '/account/#/login';
                    });

                    setTimeout(() => {
                        this.dialogResetPassVisible = false;
                    }, 0);
                }
            });
        },
        async logout() {
            await this.$groupLogout({
                account: this.$groupAccount.account
            });
            window.location.href = '/account/#/login';
        },
        redirect(url) {
            window.location.href = url;
        },
        redirectManage(url) {
            if (this.urlModule === 'manage') {
                this.$router.push({
                    path: url
                });
            } else {
                window.location.href = `/manage/#${url}`;
            }
        },
        handleUserMouseOver() {
            this.showLoginOut = true;
        },
        handleUserMouseLeave() {
            this.showLoginOut = false;
        },
        redirectUrl(url) {
            window.open(url);
        }
    }
};
