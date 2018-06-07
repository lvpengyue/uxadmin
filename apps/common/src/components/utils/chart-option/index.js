const defaultColor = ['#c23531', '#61a0a8', '#d48265', '#91c7ae',
    '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#2f4554'
];

const bar = barData => ({
    color: barData.$color ? barData.$color : defaultColor,
    series: barData.$series ? barData.$series : [],
    title: {
        text: barData.$text ? barData.$text : '暂无',
        textStyle: {
            fontWeight: '200',
            fontSize: '12'
        },
        y: 'bottom',
        x: 'center'
    },
    yAxis: [{
        min: 0,
        minInterval: 1,
        name: barData.$unit ? barData.$unit : '',
        axisLabel: {
            formatter: '{value}'
        },
        type: 'value',
        minInterval: 1
    }],
    toolbox: {
        show: false,
        feature: {
            restore: {
                show: false
            },
            mark: {
                show: true
            },
            dataView: {
                readOnly: false,
                show: false
            },
            magicType: {
                show: false,
                type: ['bar']
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    barGap: '30%',
    legend: {
        show: barData.$show ? barData.$show : false,
        data: barData.$legend ? barData.$legend : '',
        y: 'bottom',
        top: '90%'
    },
    grid: {
        bottom: '30%',
        top: '10%',
        containLabel: true
    },
    xAxis: [{
        axisLabel: {
            rotate: -50,
            interval: 0,
            textStyle: {
                fontFamily: '微软雅黑',
                fontSize: 12
            },
            splitNumber: 15,
            show: true
        },
        data: barData.$xAxis ? barData.$xAxis : [],
        type: 'category'
    }],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    }
});

const line = lineData => ({
    dataZoom: [{
        start: 0,
        type: 'inside',
        end: 100
    }, {
        bottom: '20%',
        type: 'slider'
    }],
    color: lineData.$color ? lineData.$color : defaultColor,
    series: lineData.$series ? lineData.$series : [],
    title: {
        text: lineData.$text ? lineData.$text : '',
        textStyle: {
            fontWeight: '200',
            fontSize: '12'
        },
        y: 'bottom',
        x: 'center'
    },
    yAxis: [{
        min: 0,
        minInterval: 1,
        name: lineData.$unit ? lineData.$unit : '',
        axisLabel: {
            formatter: '{value}'
        },
        type: 'value',
        minInterval: 1
    }],
    toolbox: {
        show: false,
        feature: {
            restore: {
                show: false
            },
            mark: {
                show: true
            },
            dataView: {
                readOnly: false,
                show: false
            },
            magicType: {
                show: false,
                type: ['line']
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    barGap: '30%',
    legend: {
        show: lineData.$show ? lineData.$show : false,
        data: lineData.$legend ? lineData.$legend : [],
        y: 'bottom',
        top: '85%'
    },
    grid: {
        bottom: '35%',
        top: '10%'
    },
    xAxis: [{
        axisLabel: {
            rotate: -50,
            interval: 0,
            textStyle: {
                fontFamily: '微软雅黑',
                fontSize: 12
            },
            splitNumber: 15,
            show: true
        },
        data: lineData.$xAxis ? lineData.$xAxis : [],
        type: 'category'
    }],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    }
});

const pie = pieData => ({
    series: [{
        center: ['50%', '45%'],
        data: pieData.$series ? pieData.$series : [],
        radius: ['30%', '55%'],
        label: {
            normal: {
                formatter: '{d}%',
                show: true,
                textStyle: {
                    fontSize: '16'
                }
            }
        },
        type: 'pie'
    }],
    title: {
        text: pieData.$text ? pieData.$text : '',
        textStyle: {
            fontWeight: '200',
            fontSize: '12'
        },
        y: 'bottom',
        x: 'center'
    },
    calculable: true,
    color: pieData.$color ? pieData.$color : defaultColor,
    legend: {
        icon: 'circle',
        orient: 'horizontal',
        data: pieData.$legend ? pieData.$legend : [],
        show: pieData.$show ? pieData.$show : [],
        y: 'bottom',
        x: 'center',
        top: '80%'
    },
    tooltip: {
        trigger: 'item'
    }
});

export default {
    line,
    bar,
    pie
};
