import {
    mapActions,
    mapGetters
} from 'vuex';
import moment from 'moment';
import leftMenu from '../../widgets/left-menu';



export default {
    async mounted() {
        await this.lotteryGetData(this.transSearchData(this.searchData));
        await this.$groupGetFirstArea();
        await this.$groupGetCouponList();
        await this.$groupGetActivityList();
    },
    data() {
        return {
            searchData: {
                areaParentId: 0,
                areaId: 0,
                startTime: '',
                endTime: '',
                pageNum: 1, // 当前页码
                pageSize: 10 // 每页显示数
            },
            modal: false, // 新增或修改弹框是否显示
            formSecondAreaList: [], // 弹框二级区域列表
            searchSecondAreaList: [], // 搜索二级区域列表
            columns: [{
                title: '名称',
                key: 'name',
                fixed: 'left',
                width: 200
            },
            {
                title: '学校名称',
                key: 'address',
                width: 200
            },
            {
                title: '创建时间',
                key: 'createTime',
                width: 200,

                // sortable: true,
                render: (h, params) => h('div', [
                    h('p', moment(params.row.beginDate).format(
                            'YYYY-MM-DD HH:mm:ss'))
                ])
            },
            {
                title: '中奖率',
                key: 'rate',
                width: 200
            },
            {
                title: '剩余库存',
                key: 'stock',
                width: 200
            },
            {
                title: '原始库存',
                key: 'totalStock',
                width: 200
            },
            {
                title: '操作',
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
                        on: {
                            click: () => {
                                this.remove(params.row.id);
                            }
                        }
                    }, '删除')
                ])
            }
            ],

            // 添加、编辑表单的数据
            formValidate: {
                id: 0,
                areaParentId: '',
                areaId: '',
                name: '',
                rate: '',
                stock: '',
                totalStock: '',
                activityId: '',
                couponId: ''
            },
            ruleValidate: {
                areaParentId: [{
                    required: true,
                    type: 'number',
                    message: '请选择一级地区',
                    trigger: 'change'
                }],
                areaId: [{
                    required: true,
                    type: 'number',
                    message: '请选择二级地区',
                    trigger: 'change'
                }],
                name: [{
                    required: true,
                    type: 'string',
                    message: '活动商品名称未填',
                    trigger: 'blur'
                }],
                stock: [{
                    required: true,
                    type: 'number',
                    message: '剩余库存要填数字',
                    trigger: 'blur'
                }],
                totalStock: [{
                    required: true,
                    type: 'number',
                    message: '原始库存要填数字',
                    trigger: 'blur'
                }],
                rate: [{
                    required: true,
                    type: 'number',
                    message: '商品折扣要填数字',
                    trigger: 'blur'
                }],
                activityId: [{
                    required: true,
                    type: 'number',
                    message: '活动未选',
                    trigger: 'blur'
                }],
                couponId: [{
                    required: true,
                    type: 'number',
                    message: '折扣券未选',
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        ...mapActions([
            'lotteryGetData',
            '$groupGetFirstArea',
            '$groupGetSecondArea',
            '$groupGetCouponList',
            '$groupGetActivityList',
            'lotteryAddOrUpdateData',
            'lotteryDelData'
        ]),

        /**
         * 转换搜索条件中的时间格式
         * @param {Object} obj 搜索条件对象
         */
        transSearchData(obj) {
            const newObj = Object.assign({}, obj);

            if (newObj.startTime) {
                newObj.startTime = moment(obj.startTime).format('YYYY-MM-DD HH:mm:ss');
            }
            if (newObj.endTime) {
                newObj.endTime = moment(obj.endTime).format('YYYY-MM-DD HH:mm:ss');
            }

            return newObj;
        },

        async search() {
            await this.lotteryGetData(this.transSearchData(this.searchData));
        },

        /**
         * 新增活动显示
         *
         */
        addShow() {
            this.formValidate = {
                id: 0,
                areaParentId: '',
                areaId: '',
                name: '',
                stock: '',
                totalStock: '',
                rate: '',
                activityId: '',
                couponId: ''
            };
            this.modal = true;
        },

        remove(id) {
            this.$Modal.confirm({
                title: '',
                content: '确定删除此活动吗？',
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                    await this.lotteryDelData({
                        id
                    });

                    if (this.lotteryDelResult && this.lotteryDelResult.code === 1) {
                        this.$Message.success('删除成功');
                        this.lotteryGetData(this.transSearchData(this.searchData));
                    } else {
                        this.$Message.error('删除未成功');
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
                areaParentId: row.areaParentId ? row.areaParentId : '',
                areaId: row.areaId ? row.areaId : '',
                name: row.name ? row.name : '',
                stock: row.stock ? row.stock : '',
                totalStock: row.totalStock ? row.totalStock : '',
                rate: row.rate ? row.rate : '',
                activityId: row.activityId ? row.activityId : '',
                couponId: row.couponId ? row.couponId : ''
            };
            this.modal = true;
        },

        /**
         * 搜索区域一级地址改变的操作
         *
         * @param {Number} selected 一级区域选择的id
         */
        async handleChangeSearchFirstArea(selected) {
            await this.$groupGetSecondArea({
                parentId: selected
            });
            this.searchSecondAreaList = this.$groupSecondArea.data.concat([]);
            setTimeout(() => {
                this.searchData.areaId = '0';
            }, 200);
        },


        /**
         * 弹框一级地址改变的操作
         *
         * @param {Number} selected 一级区域选择的id
         */
        async handleChangeFirstArea(selected) {
            this.formValidate.areaId = '';
            await this.$groupGetSecondArea({
                parentId: selected
            });

            this.formSecondAreaList = this.$groupSecondArea.data.concat([]);
        },

        handleSubmit(name) {
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    const newValid = Object.assign({}, this.formValidate);

                    newValid.beginDate = moment(this.formValidate.beginDate).format(
                        'YYYY-MM-DD HH:mm:ss');
                    newValid.endDate = moment(this.formValidate.endDate).format(
                        'YYYY-MM-DD HH:mm:ss');
                    await this.lotteryAddOrUpdateData(newValid);

                    if (this.lotteryAddOrUpdateResult && this.lotteryAddOrUpdateResult.code === 1) {
                        this.$Message.success('新增/编辑成功');
                        this.modal = false;
                        this.lotteryGetData(this.transSearchData(this.searchData));
                    } else {
                        this.$Message.error('新增/编辑失败，请重新尝试');
                    }
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
                    filename: '活动商品列表'
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
                this.lotteryGetData(this.transSearchData(this.searchData));
            }
        },

        changePageSize(pageSize) {
            if (pageSize !== this.searchData.pageSize) {
                this.searchData.pageSize = pageSize;
                this.lotteryGetData(this.transSearchData(this.searchData));
            }
        }
    },

    computed: {
        ...mapGetters([
            'lotteryData',
            '$groupFirstArea',
            '$groupSecondArea',
            '$groupCouponList',
            '$groupActivityList',
            'lotteryAddOrUpdateResult',
            'lotteryDelResult'
        ])
    },

    components: {
        leftMenu
    }
};
