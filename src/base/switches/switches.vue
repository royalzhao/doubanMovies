<template>
    <ul class="switches">
        <li class="switch-item"
            v-for="(item,index) in switches"
            :key="index"
            :class="{'active':currentIndex === index,'small-font':smallFont === true}"
            @click="switchItem(index)"
        >
        <span>{{item.name}}</span>
        </li>
    </ul>
</template>
<script>
    export default {
        props:{
            switches:{
                type:Array,
                default:[]
            },
            currentIndex:{
                type:Number,
                default:0
            },
            smallFont:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            switchItem(index){
                this.$emit("switch",index);
            }
        }
    }
</script>
<style lang="less" scoped>
@import url("~@/styles/color.less");
.switches{
    position: relative;
    z-index: 200;
    background: @color-background;
    display:flex;
    align-items: center;
    width:100%;
    .switch-item{
        flex: 1;
        text-align: center;
        padding: 15px;
        font-size: @font-size-medium-x;
        color:@color-text;
        border-bottom:1px solid transparent;
        
    }
    .small-font{
        padding:14px 5px;
        font-size: @font-size-small;
    }
    .active{
        color: @color-theme-f;
        border-bottom:1px solid @color-theme-f;
    }
}
</style>