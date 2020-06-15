<template>
    <div>
        <el-steps :active="current" class="step-box" finish-status="success">
            <el-step class="step-color" :title="item.name" description="" v-for="(item, index) in stepList"
                     :key="index">
                
            </el-step>
        </el-steps>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        data() {
            return {}
        },
        props: {
            current: 0,
            stepList: {}
        },
        methods: {
            moment: moment
        }
    }
</script>
<style lang="less">
    .step-box {
        margin: 50px;
        background-color: white;
        .el-step__icon {
            width: 24px;
            height: 24px;
        }
        .el-steps--horizontal {
            padding: 40px 380px 57px 380px;
        }
        .el-step__head.is-wait {
            .el-step__icon.is-text {
                color: #c0c4cc;
                background: #fff;
                border-color: #c0c4cc;
            }
        }
        .el-step__icon.is-text {
            background: #FF4D60;
            color: #fff;
            border-color: #FF4D60;
            border: 1px solid;
        }
        .el-step.is-horizontal .el-step__line {
            height: 1px;
        }
        .el-step__title.is-process {
            opacity: 0.85;
            font-weight: normal;
        }
    }
    .step-color {
        .is-success {
            color: #FF4D60;
            border-color: #FF4D60;
        }
        .el-step__main {
            .is-success {
                color: #FF4D60;
            }
        }
    }
</style>
