<template>
    <div class="search-box">
        <i class="icon-search"></i>
        <input type="text" class="box" :placeholder="placeholder" v-model="query">
        <span class="cancel" @click="back">取消</span>
    </div>
</template>
<script>
    export default {
        props:{
            placeholder:{
                type:String,
                default:'搜索电影/影人'
            },
            tagSearch:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                query:''
            }
        },
        methods:{
            back(){
                wx.navigateBack();
            }

        },
        watch:{
            query(newQuery){
                if(!this.tagSearch){    //节流操作
                    if(this.timer){
                        clearTimeout(this.timer)
                    }
                    this.timer = setTimeout(()=>{
                        this.$emit('query',newQuery);
                    },500)
                }else{  // 标签搜索不需要节流
                    this.$emit('query', newQuery);
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import url('~@/styles/color.less');
    .search-box{
        box-sizing: border-box;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px 0 10px 20px;
        height: 50px;
        background: @color-theme-f;
        .icon-search{
            position: absolute;
            top:18px;
            left:28px;
            font-size:@font-size-medium;
            color:@color-text;
        }
        .box{
            flex: 75% 0 0;
            padding-left: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 5px;
            background: @color-background;
            color: @color-text-f;
            font-size: @font-size-medium;
            caret-color: @color-theme-f;
            &::placeholder;
            color: @color-text;
        }
        .cancel{
            flex: 1;
            text-align: center;
            font-size: 16px;
            color: @color-background;
        }
    }
</style>