/**
 * 报表页面 echarts 图表
 */

import $ from 'jquery';
import options from '../../utils/chart-option';

const echarts = require('echarts');



export default {
    data() {
        return {
            chart: null,
            options
        };
    },
    props: {
        /**
         * 图标类型
        */
        type: {
            default: 'line',
            type: String
        },

        /**
         * 图表与数据对应关系
         * @type {Object}
         */
        methods: {
            type: Object,
            require: false
        },

        /**
         * 图表数据
         * @type {Object}
         */
        data: {
            type: Object,
            require: false
        },

        /**
         * 图表宽
         * @type {String}
         */
        width: {
            type: String,
            default: '100%'
        },

        /**
         * 图表高
         * @type {String}
         */
        height: {
            type: String,
            default: '400px'
        },

        /**
         * 图表操作
         * @type {Function}
         */
        handleAction: {
            type: Function
        }
    },
    mounted() {
        this.chart = echarts.init(this.$el);
        this.chart.showLoading({
            text: '',
            color: '#5eb2ec',
            textColor: '#000',
            maskColor: 'rgba(190, 190, 190, 0.5)',
            zlevel: 0
        });

        const option = this.options[this.type](this.data);

        this.chart.setOption(option);
        setTimeout(() => {
            this.chart.hideLoading();
        }, 1000);
    }
    // watch: {
    //     options: {
    //         handler(val) {
    //             this.chart.setOption(this.handleOptions(val, this.data));
    //         },
    //         deep: true
    //     },
    //     data: {
    //         handler(val, oldVal) {
    //             if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
    //                 this.chart.showLoading({
    //                     text: '',
    //                     color: '#5eb2ec',
    //                     textColor: '#000',
    //                     maskColor: 'rgba(190, 190, 190, 0.5)',
    //                     zlevel: 0
    //                 });

    //                 this.chart.setOption(this.handleOptions(this.options, val));

    //                 setTimeout(() => {
    //                     this.chart.hideLoading();
    //                 }, 1000);
    //             }
    //         },
    //         deep: true
    //     }
    // },
    // methods: {
    //     update(id, data) {
    //         setTimeout(() => {
    //             this.$el = null;
    //             this.$el = $(`div[data-gs-id=${id}] .right`).get(0);
    //             echarts.dispose(this.$el);
    //             this.chart = echarts.init(this.$el);
    //             this.chart.setOption(this.handleOptions(this.options, data));
    //         }, 0);
    //     },
    //     handleOptions(options, data) {
    //         /**
    //          * 图表配置对象转换成字符串，为了替换变量
    //          * @type {String}
    //          */
    //         let str = JSON.stringify(options);
    //         const methodsList = [];

    //         for (const key in this.methods) {
    //             /**
    //              * 如果methods返回值是方法，则暂不替换
    //              */
    //             if (typeof this.methods[key](data) !== 'function') {
    //                 str = str.replace(new RegExp(`"\\${key}"`, 'img'), JSON.stringify(this.methods[key](data)));
    //             } else {
    //                 methodsList.push(key);
    //             }
    //         }

    //         /**
    //          * 替换所有json里的变量（方法变量）
    //          */
    //         const result = JSON.parse(str, (k, v) => {
    //             if (methodsList.indexOf(v) > -1) {
    //                 return this.methods[v](data);
    //             }

    //             return v;
    //         });

    //         /**
    //          * 如果option里有color，但有可能因为color颜色不够用，所以自动拼接默认颜色
    //          */
    //         if (result.color && result.color.length > 0) {
    //             result.color = result.color.concat(['#c23531', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#2f4554']);
    //         }

    //         return result;
    //     }
    // }
};
