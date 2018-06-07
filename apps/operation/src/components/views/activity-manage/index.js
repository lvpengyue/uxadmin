import {
    mapActions,
    mapGetters
} from 'vuex';
import moment from 'moment';
import leftMenu from '../../widgets/left-menu';



export default {
    async mounted() {
        await this.activityManageGetData(this.transSearchData(this.searchData));
        await this.$groupGetFirstArea();
    },
    data() {
        return {
            // 状态数组
            statusList: [{
                value: 0,
                name: '全部'
            }, {
                value: 1,
                name: '未生效'
            }, {
                value: 2,
                name: '进行中'
            }, {
                value: 3,
                name: '已完成'
            }],
            searchData: {
                area0Id: 0,
                area1Id: 0,
                status: 0,
                startTime: '',
                endTime: '',
                pageNum: 1, // 当前页码
                pageSize: 10 // 每页显示数
            },
            modal: false, // 新增或修改弹框是否显示
            formSecondAreaList: [], // 弹框二级区域列表
            searchSecondAreaList: [], // 搜索二级区域列表
            columns: [{
                title: '地址',
                key: 'address',
                fixed: 'left',
                width: 200
            },
            {
                title: '活动名称',
                key: 'name',
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
                title: '开始时间',
                key: 'beginDate',
                width: 200,

                // sortable: true,
                render: (h, params) => h('div', [
                    h('p', moment(params.row.beginDate).format(
                            'YYYY-MM-DD HH:mm:ss'))
                ])
            },
            {
                title: '结束时间',
                key: 'endDate',
                width: 200,

                // sortable: true,
                render: (h, params) => h('div', [
                    h('p', moment(params.row.endDate).format(
                            'YYYY-MM-DD HH:mm:ss'))
                ])
            },
            {
                title: '活动状态',
                key: 'status',
                width: 200,
                render: (h, params) => {
                    let text = '未生效';

                    if (params.row.status === 1) {
                        text = '未生效';
                    } else if (params.row.status === 2) {
                        text = '进行中';
                    } else if (params.row.status === 3) {
                        text = '已过期';
                    }

                    return h('div', [
                        h('p', text)
                    ]);
                }
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
                area0Id: '',
                area1Id: '',
                name: '',
                beginDate: '',
                endDate: ''
            },
            ruleValidate: {
                area0Id: [{
                    required: true,
                    type: 'number',
                    message: '请选择一级地区',
                    trigger: 'change'
                }],
                area1Id: [{
                    required: true,
                    type: 'number',
                    message: '请选择二级地区',
                    trigger: 'change'
                }],
                name: [{
                    required: true,
                    type: 'string',
                    message: '活动名称未填',
                    trigger: 'blur'
                }],
                beginDate: [{
                    required: true,
                    type: 'date',
                    message: '请选择开始日期',
                    trigger: 'change'
                }],
                endDate: [{
                    required: true,
                    type: 'date',
                    message: '请选择结束日期',
                    trigger: 'change'
                }]
            }
        };
    },
    methods: {
        ...mapActions([
            'activityManageGetData',
            '$groupGetFirstArea',
            '$groupGetSecondArea',
            'activityManageAddOrUpdateData',
            'activityManageDelData'
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
            await this.activityManageGetData(this.transSearchData(this.searchData));
        },

        /**
         * 新增活动显示
         *
         */
        addShow() {
            this.formValidate = {
                id: 0,
                area0Id: '',
                area1Id: '',
                name: '',
                beginDate: '',
                endDate: ''
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
                    await this.activityManageDelData({
                        id
                    });

                    if (this.activityManageDelResult && this.activityManageDelResult.code === 1) {
                        this.$Message.success('删除成功');
                        this.activityManageGetData(this.transSearchData(this.searchData));
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
                area0Id: row.area0Id ? row.area0Id : 0,
                area1Id: row.area1Id ? row.area1Id : 0,
                name: row.name ? row.name : '',
                beginDate: row.beginDate ? new Date(row.beginDate) : '',
                endDate: row.endDate ? new Date(row.endDate) : ''
            };
            this.modal = true;
        },

        /**
         * 搜索区域一级地址改变的操作
         *
         * @param {Number} selected 一级区域选择的id
         */
        async handleChangeSearchFirstArea(selected) {
            this.searchData.area1Id = 0;
            await this.$groupGetSecondArea({
                parentId: selected
            });
            this.searchSecondAreaList = this.$groupSecondArea.data.concat([]);
        },


        /**
         * 弹框一级地址改变的操作
         *
         * @param {Number} selected 一级区域选择的id
         */
        async handleChangeFirstArea(selected) {
            this.formValidate.area1Id = '';
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
                    await this.activityManageAddOrUpdateData(newValid);

                    if (this.activityManageAddOrUpdateResult && this.activityManageAddOrUpdateResult.code === 1) {
                        this.$Message.success('新增/编辑成功');
                        this.modal = false;
                        this.activityManageGetData(this.transSearchData(this.searchData));
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
                    filename: '活动列表'
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
                this.activityManageGetData(this.transSearchData(this.searchData));
            }
        },

        changePageSize(pageSize) {
            if (pageSize !== this.searchData.pageSize) {
                this.searchData.pageSize = pageSize;
                this.activityManageGetData(this.transSearchData(this.searchData));
            }
        }
    },

    computed: {
        ...mapGetters([
            'activityManageData',
            '$groupFirstArea',
            '$groupSecondArea',
            'activityManageAddOrUpdateResult',
            'activityManageDelResult'
        ])
    },

    components: {
        leftMenu
    }
};
