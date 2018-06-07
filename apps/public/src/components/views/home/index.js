import { mapActions, mapGetters } from 'vuex';
import chart from '@components/widgets/chart';



export default {
    data() {
        return {
            data1: {
                $text: '测试标题',
                $unit: '件',
                $xAxis: ['一月', '二月', '三月', '一月', '二月', '一月', '二月', '一月', '二月', '一月', '二月'],
                $series: [
                    {
                        name: '测试商品一',
                        type: 'line',
                        stack: '总量',
                        data: [23, 33, 34, 23, 33, 34, 23, 33, 34, 23, 33]
                    },
                    {
                        name: '测试商品二',
                        type: 'line',
                        stack: '总量',
                        data: [123, 233, 11, 213, 333, 14, 13, 23, 24, 43, 63]
                    }
                ]
            },
            data2: {
                $text: '测试标题',
                $unit: '件',
                $xAxis: ['一月', '二月', '三月', '一月', '二月', '一月', '二月', '一月', '二月', '一月', '二月'],
                $series: [
                    {
                        name: '测试商品一',
                        type: 'bar',
                        stack: '总量',
                        data: [23, 33, 34, 23, 33, 34, 23, 33, 34, 23, 33]
                    },
                    {
                        name: '测试商品二',
                        type: 'bar',
                        stack: '总量',
                        data: [123, 233, 11, 213, 333, 14, 13, 23, 24, 43, 63]
                    }
                ]
            },
            data3: {
                $text: '测试标题',
                $unit: '件',
                $series: [
                    {
                        value: 335, name: '直接访问'
                    },
                    {
                        value: 310, name: '邮件营销'
                    },
                    {
                        value: 234, name: '联盟广告'
                    },
                    {
                        value: 135, name: '视频广告'
                    },
                    {
                        value: 1548, name: '搜索引擎'
                    }
                ]
            }
        };
    },
    computed: {
        ...mapGetters([
            'demoInput',
            'demoResult'
        ])
    },
    methods: {
        ...mapActions([
            'demoSetInput',
            'demoGetWeathers'
        ])
    },
    components: {
        chart
    }
};
