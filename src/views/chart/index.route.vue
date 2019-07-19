<template>
    <div class="chart">
        <div style="width:100%;height:400px;" id="bar"></div>
        <div style="width:100%;height:400px;" id="line"></div>
        <div style="width:100%;height:400px;" id="pie"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import echarts from 'echarts'
    Vue.use(echarts)
    export default {
        name: 'chart',
        title: '图表',
        data() {
            return {
                data: [
                    {id: '1', name: '星期一', value: '10', age: '25'},
                    {id: '2', name: '星期二', value: '13', age: '25'},
                    {id: '3', name: '星期三', value: '3', age: '25'},
                    {id: '4', name: '星期四', value: '18', age: '25'},
                    {id: '5', name: '星期五', value: '6', age: '25'},
                    {id: '6', name: '星期六', value: '8', age: '25'},
                    {id: '7', name: '星期日', value: '20', age: '25'},
                ],
            }
        },
        created(){
           // 绘制柱状图
           this.initBar(this.data)
           this.initLine(this.data)
           this.initPie(this.data)
           // 绘制折线图
           // 绘制饼图
        },
        methods: {
            initBar(data) {
                let colorList = [
                    '#1890FF',
                    '#41D9C7',
                    '#2FC25B',
                    '#FACC14',
                    '#E6965C',
                    '#223273',
                    '#7564CC',
                    '#8543E0',
                    '#5C8EE6',
                    '#13C2C2',
                    '#5CA3E6',
                    '#3436C7',
                    '#B381E6',
                    '#F04864',
                    '#D598D9',
                ]
                let XData = []
                let seriesData = []
                if (Array.isArray(data)) {
                    data.map((item) => {
                        let {name,id,value,age} = item
                        XData.push(name)
                        seriesData.push({
                            id: id,
                            value: value,
                            name: name,
                            age: age
                        })
                    })
                }
                let option = {
                    title:{
                        text:'Bar Demo'
                    },
                    color: colorList,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    dataZoom: [{type: 'inside'}],
                    toolbox: {
                        show: true,
                        right: 10,
                        top: 0,
                        itemSize: 18,
                        feature: {
                            saveAsImage: {title: '导出图片',show: true, },
                            myExcel: {
                                show: true,
                                title: '自定义',
                                icon: 'image://http://echarts.baidu.com/images/favicon.png',
                                z: '999',
                                left: 'center',
                                onclick: () => {
                                    console.log('自定义')
                                },
                            },
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '5%',
                        bottom: '3%',
                        containLabel: true,
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: XData,
                            axisTick: {
                                alignWithLabel: true,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                        },
                    ],
                    series: [
                        {
                            type: 'bar',
                            barWidth: '60%',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                },
                            },
                            data: seriesData,
                        },
                    ],
                }
                this.$nextTick(function () {
                    let myChart = echarts.init(document.getElementById('bar'))
                    myChart.clear()
                    myChart.setOption(option)
                    // 点击
                    myChart.on('click', function (params) {
                       console.log(params)
                    })
                })
            },
            initLine(data) {
                let colorList = [
                    '#1890FF',
                    '#41D9C7',
                    '#2FC25B',
                    '#FACC14',
                    '#E6965C',
                    '#223273',
                    '#7564CC',
                    '#8543E0',
                    '#5C8EE6',
                    '#13C2C2',
                    '#5CA3E6',
                    '#3436C7',
                    '#B381E6',
                    '#F04864',
                    '#D598D9',
                ]
                let xAxisData = []
                let seriesData = []
                data.map((item) => {
                    let { value, name } = item
                    xAxisData.push(name)
                    seriesData.push(value)
                })
                let option = {
                    title:{
                        text:'Line Demo'
                    },
                    color: colorList,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    dataZoom: [{ type: 'inside' }],
                    grid: {
                        left: '3%',
                        right: '5%',
                        bottom: '3%',
                        containLabel: true,
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxisData,
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: [
                        {
                            data: seriesData,
                            type: 'line',
                        },
                    ],
                }
                this.$nextTick(function() {
                    document.oncontextmenu = function() {
                        return false
                    }
                    let myChart = echarts.init(document.getElementById('line'))
                    myChart.clear()
                    myChart.setOption(option)
                })
            },
            initPie(data) {
                let seriesData = []
                data.map((item) => {
                    let { value,id,name} = item
                    seriesData.push({
                        name: name,
                        value: value,
                        id:id
                    })
                })

                let colorList = [
                    '#1890FF',
                    '#41D9C7',
                    '#2FC25B',
                    '#FACC14',
                    '#E6965C',
                    '#223273',
                    '#7564CC',
                    '#8543E0',
                    '#5C8EE6',
                    '#13C2C2',
                    '#5CA3E6',
                    '#3436C7',
                    '#B381E6',
                    '#F04864',
                    '#D598D9',
                ]
                let option = {
                    title:{
                        text:'Pie Demo'
                    },
                    color: colorList,
                    grid: {
                        left: '3%',
                        right: '5%',
                        bottom: '3%',
                        containLabel: true,
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} : {c} ({d}%)',
                    },
                    series: [
                        {
                            name: 'pie',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: seriesData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                },
                            },
                        },
                    ],
                }
                this.$nextTick(function() {
                    document.oncontextmenu = function() {
                        return false
                    }
                    let myChart = echarts.init(document.getElementById('pie'))
                    myChart.clear()
                    myChart.setOption(option)
                    // 查看详情
                    myChart.on('click', function(params) {
                       console.log(params)
                    })
                })
            },
        },
    }
</script>

<style scoped lang="less">
    .chart{
        width:100%;
        height: 100%;
        position: relative;
        overflow-y: auto;
    }
</style>
