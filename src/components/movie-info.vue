<template>
    <div class="movie-info">
        <div class="overall">
            <div class="desc">
                <h2 class="title">{{movieDetail.title}}</h2>
                <span class="tag">{{tags}}</span>
                <span class="original-title">原名:{{movieDetail.original_title}}</span>
                <span class="pubdate">上映时间:{{pubdate}}</span>
                <span class="duration">片长：{{durations}}</span>
            </div>
            <div class="rank">
                <span class="origin">豆瓣评分</span>
                <span class="rating" v-if="rating">{{normallizeScore}}</span>
                <star :size="24" :score="movieDetail.rating.average" :needNullStar="needNullStar"></star>
                <span class="num" v-if="rating">{{movieDetail.ratings_count}}人</span>
            </div>
        </div>
        <div class="summary">
            <h2 class="title">剧情简介</h2>
            <p class="content">{{movieDetail.summary}}</p>
        </div>
        <scroll-view class="casts" scroll-x style="width: 100%">
            <div class="casts-content">
                <h2 class="title">影人</h2>
                <div class="cast-item" v-for="item in allCasts" :key="index">
                    <img :src="item.avatart.large" alt="">
                    <h3 class="item-title">{{item.name}}</h3>
                    <span v-if="item.isDirector">导演</span>
                </div>
                <div class="no-result" v-if="!allCasts.length">
                    抱歉，暂无影人信息 :(
                </div>
            </div>
        </scroll-view>
    </div>
</template>
<script>
    import Star from '@/components/star/star';
    export default {
        props:{
            movieDetail:{
                type:Object,
                default:{}
            }
        },
        data(){
            return{
                needNullStar: true,
            }
        },
        computed:{
            rating(){
                let rating = this.movieDetail.rating.average;
                if (rating === 0) {
                    return false;
                }
                return true;
            },
            tags(){
                let year = this.movieDetail.year;
                console.log(this.movieDetail.genres)
                //let tag = this.movieDetail.genres.join('/');
                //return `${year}/${tag}`;
            },
            pubdate(){
                let pubdate="";
                let date = this.movieDetail.pubdates;
                for(let i = 0;i<date.length;i++){
                    if(date[i].indexOf('电影节') === -1){
                        pubdate = date[i];  //没有在中国大陆上映，取不为电影节的最后一个信息
                    }
                    if(date[i].indexOf('中国大陆') > -1){
                        pubdate = date[i];
                        break;
                    }
                }
                if(!pubdate){
                    pubdate = '暂无信息'
                }
                return pubdate;
            },
            allCasts(){     //获取导演和演员的分组
                let removeIndex = [];
                this.movieDetail.directors.forEach((item,index)=> {
                    item.isDirector = true;
                    if(item.avatars === null){  //有的导演不存在照片
                        removeIndex.push(index)
                    }
                });
                for(let i = removeIndex.length;i>0;i--){    // 移除信息不完全的导演
                    this.movieDetail.directors.splice(removeIndex[i-1],1)
                }
                removeIndex = [];   //重置移除清单
                this.movieDetail.casts.forEach((item,index)=>{
                    if(item.avatars === null){  //有的演员不存在照片
                        removeIndex.push(index)
                    }
                })
                for (let i = removeIndex.length; i > 0; i--) { // 移除信息不完全的演员
                    this.movieDetail.casts.splice(removeIndex[i - 1], 1);
                }
                return this.movieDetail.directors.concat(this.movieDetail.casts)
            }
        },
        components:{
            Star
        }
    }
</script>
<style lang="less" scoped>
    @import url("~@/styles/color.less");
    .movie-info{
        background: @color-background;
        padding:0 20px;
        .overall{
            display: flex;
            height: 140px;
            justify-content: space-between;
            .desc{
                flex:70% 0 0;
                overflow: hidden;
                display:flex;
                flex-direction:column;
                justify-content:space-around;
                .original-title{
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .title{
                    font-size: @font-size-large;
                    color: @color-text-f;
                    padding: 10px 0 5px 0;
                }
                span{
                    font-size:@font-size-small;
                }
            }
            .rank{
                height: 70px;
                margin-top: 15px;
                padding: 10px 15px;
                display: flex;
                flex-direction: column;
                align-items:center;
                justify-content: space-between;
                border: 1px solid #ccc;
                box-shadow: 0px 0px 5px #ccc;
                background-color: #f8f8f8;
                span{
                    font-size:@font-size-large;
                    color:@color-text;
                    &.rating{
                        font-size:@font-size-large;
                        color:@color-text-f;
                    }
                }
            }
        
        }
        .summary{
            margin-top:20px;
            padding-top:20px;
            position: relative;
            &:after{
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                border-top: 1px solid #ccc;
                width: 200%;;
                content: '';
                transform-origin: 0 0;
                -webkit-transform-origin: 0 0;
                transform: scale(0.5);
                -webkit-transform: scale(0.5);
            }
    
            .title{
                font-size: @font-size-medium;
            }
            .content{
                padding-top:10px;
                font-size: @font-size-medium;
                color:@color-text-f;
                line-height:25px;
            }
        }
        .casts{
            padding: 30px 0;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            font-size: 0;
            position: relative;
            &:after{
                display: block;
                position: absolute;
                left: 0;
                bottom: 0;
                border-bottom: 1px solid #ccc;
                width: 200%;;
                content: '';
                transform-origin: 0 0;
                -webkit-transform-origin: 0 0;
                transform: scale(0.5);
                -webkit-transform: scale(0.5);
            }
                
            .casts-content{
                .title{
                    font-size: @font-size-small;
                    padding-bottom: 20px;
                }
            }
            .cast-item{
                width: 90px;
                vertical-align: top;
                display: inline-block;
                text-align: center;
                margin-right: 8px;
                font-size: @font-size-small;
                img{
                    height: 120px;
                    width: 90px;
                }
                .item-title{
                    color: @color-text-f;
                    padding: 8px 0 5px 0;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
            .no-result{
                text-align: center;
                font-size: @font-size-small;
                font-size: @color-theme-f;
            }
                
            
        }
        
          
    }
</style>