<template>
    <div class="movie-comment">
        <div class="type-title" v-if="needTitle">
            短评{{commentNum}}条
        </div>
        <ul>
            <li class="comment-item" v-for="(comment,index) in comments" :key="index">
                <div class="avatar">
                    <img :src="comment.author.avatar" alt="">
                </div>
                <div class="content">
                    <h1 class="name">{{comment.author.name}}</h1>
                    <star :size="24" :score="comment.rating.value * 2"></star>
                    <p class="text">{{comment.content}}</p>
                    <!-- <span class="date">{{commnent.created_at}}</span> -->
                    <div class="useful-count">
                        <i class="icon-thumb_up"></i>
                        {{comment.useful_count}}
                    </div>
                </div>
            </li>
        </ul>
        <div class="allComment" @click="needAllComments" v-if="!needTitle">
            <span>全部短评{{commentNum}}个</span>
        </div>
        <loadmore :hasMore="hasMore" v-if="needTitle" v-show="comments.length"></loadmore>
    </div>
</template>
<script>
    import Star from "@/components/star/star"
    import loadmore from "@/components/loadmore"

    export default {
        data(){
            return{
                
            }
        },
        props:{
            comments:{
                type:Array,
                default:[]
            },
            commentNum:{
                type:Number,
                default:0
            },
            needTitle:{
                type:Boolean,
                default:false
            },
            hasMore:{
                type:Boolean,
                default:true
            }
        },
        methods:{
            needAllComments(){
                this.$emit('needAllComments');
            }
        },
        components:{
            loadmore,Star
        }
    }
</script>
<style scoped lang="less">
     @import url("~@/styles/color.less");
     .movie-comment{
         padding: 20px;
         background: @color-background;
         .type-title{
             font-size:@font-size-medium;
             margin-bottom:15px;
         }
         ul{
            .comment-item{
                display:flex;
                margin-bottom: 20px;
                .avatar{
                    flex:0 0 36px;
                    width:36px;
                    margin-right:12px;
                    img{
                        border-radius: 50%;
                        width: 36px;
                        height: 36px;
                    }
                }
                .content{
                    flex:1;
                    position: relative;
                    font-size: @font-size-medium;
                    color:@color-text-f;
                    .name{
                        display: inline-block;
                        line-height: 25px;
                        margin-right:5px;
                    }
                    .star{
                        display: inline-block;
                    }
                    .text{
                        line-height: 20px;
                    }
                    .date{
                        font-size: @font-size-small;
                        color:@color-text;
                        line-height:25px;
                    }
                    .useful-count{
                        position: absolute;
                        color:@color-text;
                        top:5px;
                        right:5px;
                        display:flex;
                        align-items:center;
                        &.like{
                            color:@color-theme-f;
                        }
                    }
                }
                
            }
         }
         
         .allComment{
            font-size:@font-size-medium;
            color:@color-theme-f;
            text-align:center;
            padding-bottom:10px;
              
        }
         
     }
</style>