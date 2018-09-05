<template>
    <div class="review-wrapper">
        
        <div class="review-detail">
            <div class="scroll-wrapper">
                <div class="review-content" v-if="reviewDetail.author">
                    <h1 class="title">{{reviewDetail.title}}</h1>
                    <div class="author">
                        <div class="avatar">
                        <img :src="reviewDetail.author.avatar" alt="" height="36" width="36">
                        </div>
                        <div class="info">
                        <h2><span class="name">{{reviewDetail.author.name}}</span>的影评</h2>
                        <span class="date">{{reviewDetail.created_at.split(' ')[0]}}</span>
                        <star :size="24" :score="reviewDetail.rating.value*2"></star>
                        </div>
                    </div>
                    <p class="desc" v-html="reviewDetail.content"></p>
                    <div class="copyright">
                        本文版权归 {{reviewDetail.author.name}} 所有，任何形式转载请联系作者
                    </div>
                    <div class="end">
                        <div class="line"></div>
                        <span class="text">THE END</span>
                    </div>
                    <div class="useful">
                        <div class="use">
                        有用({{reviewDetail.useful_count}})
                        </div>
                        <div class="no-use">
                        没用({{reviewDetail.useless_count}})
                        </div>
                    </div>
                </div>
            </div>
            <loadmore :fullScreen="true" v-if="!reviewDetail.author"></loadmore>
        </div>
    </div>
</template>

<script>
import Loadmore from "@/components/loadmore"
import Star from '@/components/star/star';
import { getMovieReview } from '@/api/api'

export default {
    data() {
        return {
            reviewDetail: {},
            fullScreen: true,
            currentReviewId:null
        };
    },
    mounted(){
        const id = this.$root.$mp.query.id;
        if (!id) {
            return wx.navigateBack()
        }
        this.currentReviewId = id
        
        this._getMovieReview(this.currentReviewId);
    },
    computed: {
        // ...mapGetters([
        //     'currentReviewId'
        // ])
    },
    methods: {
        back() {
            this.$router.back();
        },
        _getMovieReview(id) {
           getMovieReview(id).then((res) => {
                this.reviewDetail = res;
            });
            wx.setNavigationBarTitle({ title: "影评" }) 
        }
    },
    components: {
        Loadmore,
        Star
    }
};
</script>

<style scoped lang="less">
@import url("~@/styles/color.less");

.review-detail{
    background-color: @color-background;
    .review-content{
        padding: 0px 20px 40px 20px;
        .title{;
            font-size: @font-size-large-x;
            color: @color-text-f;
            line-height: 30px;
        }
        .author{
            margin-top: 20px;
            display: flex;
            align-items: top;
            .avatar{
                flex: 36px 0 0;
                width: 36px;
                img{
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                }
                    
                .info{
                    flex: 1;
                    padding-left: 10px;
                    font-size: @font-size-small;
                }
                
                h2{
                    padding-bottom: 5px;
                    .name{
                        color: @color-text-f;
                        padding-right: 5px;
                    }
                
                }
                    
                .star{
                    display: inline-block;
                }
            }
        }
            
        .desc{
            margin-top: 30px;
            color: @color-text-f;
            font-size: @font-size-medium;
            line-height: 25px;
            white-space: pre-wrap;
        }
            
        .copyright{
            margin-top: 40px;
            font-size: @font-size-small;
            text-align: center;
        }
            
        .end{
            position: relative;
            margin: 30px auto;
            text-align: center;
            height: 10px;
            width: 60%;
            .line{
                position: relative;
                &:after{
                    display: block;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    border-bottom: 1px solid @color-line;
                    width: 200%;;
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
                font-size: @font-size-medium;
            }
        }
            
            
            
        .useful{
            text-align: center;
            div{
                display: inline-block;
                padding: 10px 15px;
                margin-right: 10px;
                color: @color-text-f;
                font-size: @font-size-medium;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }
    }
}
    
    
    
        
    
        
        
</style>
    