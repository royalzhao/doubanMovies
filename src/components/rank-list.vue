<template>
    <div class="rank-list">
        <ul>
            <li v-for="(item,index) in rankItems" :key="index" class="rank-item" @click="selectItem(item,$event)" :class="{'compact': !needRank}">
            <div class="rank-rating" v-show="needRank">
                <div class="line"></div>
                <span class="text">{{page * 50 + (index + 1)}}</span>
            </div>
            <div class="rank-info" :class="{'compact': !needRank}">
                <div class="info-img">
                    <img :src="item.image" class="">
                </div>
                <div class="info-desc">
                    <p class="title">{{item.title}}</p>
                    <star :size="24" :score="item.rating" :showScore="showScore"></star>
                    <div class="director">导演: {{item.director}}</div>
                    <div class="casts">主演: {{item.casts}}</div>
                </div>
            </div>
            </li>
        </ul>
        <loadmore :hasMore="hasMore" v-show="rankItems.length && needLoading"></loadmore>
    </div>
</template>
<script>
    import Star from '@/components/star/star';
    import Loadmore from '@/components/loadmore';
    export default {
        props: {
            rankItems: {
                type: Array,
                default: []
            },
            page: {
                type: Number,
                default: 0
            },
            hasMore: {
                type: Boolean,
                default: false
            },
            needRank: {
                type: Boolean,
                default: true
            },
            needLoading: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return{
                showScore: true
            }
        },
        components: {
            Star,
            Loadmore
        }
    }
</script>
<style lang="less" scoped>
    @import url("~@/styles/color.less");
    .rank-item{
        padding-top: 30px;
        &.compact{
            padding-top: 0px;
        }
        .rank-rating{
            position: relative;
            margin: 30px auto;
            text-align: center;
            height: 10px;
            width: 50%;
            .line{
                position: relative;
                &:after{
                    display: block;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    border-bottom: 1px solid #ccc;
                    width: 200%;
                    content: '';
                    transform-origin: 0 0;
                    -webkit-transform-origin: 0 0;
                    transform: scale(0.5);
                    -webkit-transform: scale(0.5);
                }
                    
            }
            .text{
                padding: 0 10px;
                display: inline-block;
                background-color: @color-background;
                position: absolute;
                left: 50%;
                top: -8px;
                transform: translateX(-50%);
                font-size: @font-size-large;
                color: @color-theme-f;
            }
        
        }
        .rank-info{
            display: flex;
            align-items: top;
            box-sizing: border-box;
            height: 130px;
            padding: 15px;
            border: 1px solid @color-line;
            &.compact{
                border: 0;
                position: relative;
                &:after{
                    display: block;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    border-bottom: 1px solid @color-line;
                    width: 200%;
                    content: '';
                    transform-origin: 0 0;
                    -webkit-transform-origin: 0 0;
                    transform: scale(0.5);
                    -webkit-transform: scale(0.5);
                }
                    
            }
            .info-img{
                flex: 70px 0 0;
                margin-right: 10px;
            }
            .info-desc{
                flex: 1;
                box-sizing: border-box;
                height: 100px;
                padding-bottom: 20px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                overflow: hidden;
            }
            .title{
                font-size: @font-size-medium-x;
                color: @color-text-f;
            }
            .director{
                font-size: @font-size-small;
            }
          
            .casts{
                font-size: @font-size-small;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
          
         
        }
        &:last-child{
            margin-bottom: 30px;
        }
      
    }
</style>