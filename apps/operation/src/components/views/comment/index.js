/* global __API__ */
import {
    mapActions,
    mapGetters
} from 'vuex';
import moment from 'moment';
import leftMenu from '../../widgets/left-menu';



export default {
    async mounted() {
        this.$Spin.show();
        await this.commentGetData(this.searchData);
        this.$Spin.hide();
        this.uploadListPic = this.$refs.uploadpic.fileList;
        this.uploadList = this.$refs.upload.fileList;

        await this.$groupGetProductList();
    },
    data() {
        return {
            basePath: __API__.BASEURL, // 域名
            starList: [
                5,
                4,
                3,
                2,
                1
            ],
            searchData: {
                productId: 0,
                fromUserId: 0, // 写死，固定传0
                userName: '',
                phone: '',
                pageNum: 1, // 当前页码
                pageSize: 10 // 每页显示数
            },
            modal: false, // 新增或修改弹框是否显示
            addModal: true, // 是否是新增弹框，只有新增弹框才要上传图片，编辑不要
            columns: [{
                title: '商品名称',
                key: 'productName',
                fixed: 'left',
                width: 200
            },
            {
                title: '用户名称',
                key: 'userName',
                width: 200
            },
            {
                title: '手机号',
                key: 'phone',
                width: 200
            },
            {
                title: '商品评分',
                key: 'star',
                width: 200
            },
            {
                title: '物流评分',
                key: 'logisticStar',
                width: 200
            },
            {
                title: '评论详情',
                key: 'content',
                width: 400
            },
            {
                title: '配送员名称',
                key: 'riderName',
                width: 200
            },
            {
                title: '配送员手机号',
                key: 'riderPhone',
                width: 200
            },
            {
                title: '是否显示',
                key: 'available',
                width: 200,
                render: (h, params) => {
                    let text = '不显示';

                    if (params.row.available === '1') {
                        text = '显示';
                    } else if (params.row.available === '2') {
                        text = '对自己可见';
                    }

                    return h('div', [
                        h('p', text)
                    ]);
                }
            },
            {
                title: '是否置顶',
                key: 'stick',
                width: 200,
                render: (h, params) => {
                    let text = '不置顶';

                    if (params.row.stick === '1') {
                        text = '置顶';
                    }

                    return h('div', [
                        h('p', text)
                    ]);
                }
            },
            {
                title: '操作',
                width: 300,
                key: 'action',
                align: 'center',
                render: (h, params) => h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'large'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.show(params.row);
                            }
                        }
                    }, '编辑'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'large'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.openOrClock(params.row, 2);
                            }
                        }
                    }, '禁用'),
                    h('Button', {
                        props: {
                            type: 'success',
                            size: 'large'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.openOrClock(params.row, 1);
                            }
                        }
                    }, '启用')

                    // h('Button', {
                    //     props: {
                    //         type: 'warning',
                    //         size: 'large'
                    //     },
                    //     on: {
                    //         click: () => {
                    //             this.toUp(params.row);
                    //         }
                    //     }
                    // }, '置顶')
                ])
            }
            ],

            // 添加、编辑表单的数据
            formValidate: {
                id: 0,
                user: '',
                productId: 0,
                available: 1, // 传死
                fromUserId: 0, // 传死
                star: 0,
                logisticStar: 0,
                content: '',
                stick: '0'
            },
            ruleValidate: {
                productId: [{
                    required: true,
                    type: 'number',
                    message: '请选择商品',
                    trigger: 'blur'
                }],
                user: [{
                    required: true,
                    type: 'string',
                    message: '用户名称未填',
                    trigger: 'blur'
                }],
                star: [{
                    required: true,
                    type: 'number',
                    message: '请填写评分',
                    trigger: 'blur'
                }],
                logisticStar: [{
                    required: true,
                    type: 'number',
                    message: '请填写评分',
                    trigger: 'blur'
                }],
                content: [{
                    required: true,
                    type: 'string',
                    message: '请填写评论内容',
                    trigger: 'blur'
                }]
            },

            defaultList: [],
            uploadList: [],
            uploadListPic: []
        };
    },
    methods: {
        ...mapActions([
            'commentGetData',
            '$groupGetProductList',
            'commentUpdateData',
            'commentAddData',
            'commentUpData'
        ]),

        async search() {
            await this.commentGetData(this.searchData);
        },

        /**
         * 新增评论显示
         *
         */
        addShow() {
            this.formValidate = {
                id: 0,
                productId: '',
                user: '',
                star: 5,
                logisticStar: 5,
                available: 1, // 默认传1
                fromUserId: 0, // 默认传0
                content: '',
                stick: '0'
            };

            this.$refs.upload.fileList.splice(0);
            this.$refs.uploadpic.fileList.splice(0);
            this.modal = true;
            this.addModal = true;
        },

        openOrClock(row, status) {
            let str = '启用';

            if (status === 2) {
                str = '禁止';
            }
            this.$Modal.confirm({
                title: '',
                content: `确定${str}此评论吗？`,
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                    await this.commentUpdateData({
                        id: row.id,
                        available: status,
                        content: row.content,
                        star: row.star,
                        logisticStar: row.logisticStar,
                        fromUserId: row.fromUserId,
                        productId: row.productId,
                        stick: row.stick,
                        user: row.userName
                    });

                    if (this.commentUpdateResult && this.commentUpdateResult.code === 1) {
                        this.$Message.success(`${str}成功`);

                        this.search();
                    } else {
                        this.$Message.error(`${str}未成功`);
                    }
                }
            });
        },

        toUp(row) {
            const str = '置顶';

            this.$Modal.confirm({
                title: '',
                content: `确定${str}此评论吗？`,
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                    await this.commentUpData({
                        id: row.id,
                        available: status,
                        content: row.content,
                        star: row.star,
                        logisticStar: row.logisticStar,
                        fromUserId: row.fromUserId,
                        productId: row.productId,
                        stick: row.stick,
                        user: row.userName
                    });

                    if (this.commentUpResult && this.commentUpResult.code === 1) {
                        this.$Message.success(`${str}成功`);

                        this.search();
                    } else {
                        this.$Message.error(`${str}未成功`);
                    }
                }
            });
        },

        /*
         * 编辑显示
         */
        async show(row) {
            this.formValidate = {
                id: row.id ? row.id : 0,
                available: row.available ? row.available : 0,
                fromUserId: row.fromUserId ? row.fromUserId : 0,
                productId: row.productId ? row.productId : '',
                user: row.userName ? row.userName : '',
                star: row.star ? row.star : '',
                logisticStar: row.logisticStar ? row.logisticStar : '',
                content: row.content ? row.content : '',
                stick: row.stick ? row.stick : '0'
            };
            this.modal = true;
            this.addModal = false;
        },

        /**
         * 新增或编辑的方法
         * 此处需要先判断是新增还是编辑，因为二者参数不同，新增要传图像
         *
         * @param {String} name ref名称
         */
        handleSubmit(name) {
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    this.$Spin.show();

                    // 编辑提交的内容
                    const editForm = {
                        available: this.formValidate.available,
                        user: this.formValidate.user,
                        content: this.formValidate.content,
                        id: this.formValidate.id,
                        logisticStar: this.formValidate.logisticStar,
                        star: this.formValidate.star,
                        fromUserId: this.formValidate.fromUserId,
                        stick: this.formValidate.stick
                    };

                    let pic = '';

                    if (this.uploadListPic.length > 0) {
                        pic = this.uploadListPic[0].name; // 头像
                    }

                    const imgArr = [];
                    let image = ''; // 评论图片

                    if (this.uploadList.length > 0) {
                        this.uploadList.forEach((item) => {
                            imgArr.push(item.name);
                        });

                        image = imgArr.join(',');
                    }

                    const addForm = Object.assign({}, this.formValidate, {
                        pic,
                        image
                    });

                    if (this.addModal) {
                        // 新增

                        await this.commentAddData(addForm);
                        if (this.commentAddResult && this.commentAddResult.code === 1) {
                            this.$Message.success('新增成功');
                            this.modal = false;
                            this.commentGetData(this.searchData);
                        } else {
                            await this.$Message.error('新增失败，请重新尝试');
                        }
                    } else {
                        // 编辑

                        await this.commentUpdateData(editForm);
                        if (this.commentUpdateResult && this.commentUpdateResult.code === 1) {
                            this.$Message.success('编辑成功');
                            this.modal = false;
                            this.commentGetData(this.searchData);
                        } else {
                            await this.$Message.error('编辑失败，请重新尝试');
                        }
                    }

                    this.$Spin.hide();
                } else {
                    this.$Message.error('请检查填写！');
                }
            });
        },

        handleHide() {
            this.modal = false;
        },

        exportData(type) {
            if (type === 1) {
                this.$refs.table.exportCsv({
                    filename: '评论列表'
                });
            } else if (type === 2) {
                this.$refs.table.exportCsv({
                    filename: 'Sorting and filtering data',
                    original: false
                });
            } else if (type === 3) {
                this.$refs.table.exportCsv({
                    filename: 'Custom data',
                    columns: this.columns8.filter((col, index) => index < 4),
                    data: this.data7.filter((data, index) => index < 4)
                });
            }
        },

        changePage(page) {
            if (page !== this.searchData.pageNum) {
                this.searchData.pageNum = page;
                this.commentGetData(this.searchData);
            }
        },

        changePageSize(pageSize) {
            if (pageSize !== this.searchData.pageSize) {
                this.searchData.pageSize = pageSize;
                this.commentGetData(this.searchData);
            }
        },

        handleRemovePic(file) {
            this.$refs.uploadpic.fileList.splice(0, 1);
        },

        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;

            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },

        handleSuccessPic(res, file) {
            file.url = res.url;
            file.name = res.saveName;
            if (this.$refs.uploadpic.fileList.length > 1) {
                this.$refs.uploadpic.fileList.splice(0, 1);
            }
        },

        handleSuccess(res, file) {
            file.url = res.url;
            file.name = res.saveName;
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式错误',
                desc: `${file.name}的格式错误, 请选择jpg,png`
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '文件太大',
                desc: ` ${file.name}文件太大, 请不要超过5M.`
            });
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < 3;

            if (!check) {
                this.$Notice.warning({
                    title: '最多传三张.'
                });
            }

            return check;
        }
    },

    computed: {
        ...mapGetters([
            'commentData',
            '$groupProductList',
            'commentUpdateResult',
            'commentAddResult',
            'commentAddResult'
        ])
    },

    components: {
        leftMenu
    }
};
