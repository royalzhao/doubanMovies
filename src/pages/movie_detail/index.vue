<template>
    <div class="detail-wrapper">
        <!-- 顶部海报 -->
        <div class="head-img">
            <div class="img">
                <img v-if="movie.images"  :src="movie.images.large" alt="" />
            </div>
           
        </div>
        <!-- 影片详细信息 -->
        <div v-if="movie.directors">
            <movie-info :movieDetail="movie"></movie-info>
        </div>
        
        <!-- 影片评论 -->
        <div class="switch">
            <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
        </div>
        <movie-comment
            v-if="movie.popular_comments && currentIndex === 0"
            :comments="movie.popular_comments"
            :commentNum="movie.comments_count"
            @needAllComments="needAllComments"
        >
        </movie-comment>
        <movie-review
            v-if="movie.popular_reviews && currentIndex === 1"
            :reviews="movie.popular_reviews.slice(0,5)"
            :reviewNum="movie.reviews_count"
            @needAllReviews="needAllReviews"
            @selectReview="selectReview"
        >
        </movie-review>

        <loadmore :fullScreen="fullScreen" v-if="!movie.images"></loadmore>
    </div>
</template>
<script>
    import { getMovieDetail } from '@/api/api'
    import movieInfo from '@/components/movie-info'
    import Switches from '@/components/switch'
    import movieComment from '@/components/movie-comment'
    import MovieReview from '@/components/movie-review'
    import loadmore from "@/components/loadmore"
    import { mapState, mapActions, mapMutations } from 'vuex'
    import { ITEM_CLEAR_MOVIE } from '@/store/mutations-type'
    export default {
        data(){
            return {
                id:null,
                movieDetail: {},
                fullScreen: true, // 用于loadmore组件全屏加载效果
                switches: [
                    {name: '短评'},
                    {name: '影评'}
                ],
                currentIndex: 0,
            }
        },
        computed:{
            ...mapState('item', {
                movie: state => state.movie
            })
        },
        mounted(){
            const id = this.$root.$mp.query.id;
            if (!id) {
                return wx.navigateBack()
            }
            this.id = id
            this.getMovieData(id);      //获取电影详细信息
        },
        methods:{
            ...mapActions('item', [
                'getMovie'
            ]),
            ...mapMutations('item', {
                clearMovie: ITEM_CLEAR_MOVIE
            }),
           switchItem(index){
                this.currentIndex = index;
           },
            async getMovieData (id) {
                await this.getMovie({ id });
                wx.setNavigationBarTitle({ title: this.movie.title })      // options.name表示上个页面传过来的文字
                wx.setNavigationBarColor({
                    frontColor: '#ffffff',
                    backgroundColor: '#555',
                    animation: {
                        duration: 400,
                        timingFunc: 'easeIn'
                    }
                });
                //this.movieDetail = this.movie.images.large
                //console.log(this.movie.images.large)
                //console.log(this.movieDetail.images.large)
            },
            // _getDetail(id){
            //     //console.log(id)
            //     if(!id){     //在当前页面刷新回到主页面
            //         wx.navigateBack({
            //             delta: 1
            //         });
            //         return;
            //     }else{
            //         getMovieDetail(id).then((res)=>{ //获取电影详细
            //             this.movieDetail = res;
            //             //console.log(this.movieDetail.images.large)
            //         })
            //     }
               
            // }
            needAllComments(){
                wx.navigateTo({
                    url: `/pages/all_discussion/main?type=comment&movieId=${this.id}`
                })
            },
            needAllReviews(){
                wx.navigateTo({
                    url: `/pages/all_discussion/main?type=review&movieId=${this.id}`
                })
            },
            selectReview(id){
                wx.navigateTo({
                    url: `/pages/review_detail/main?id=${id}`
                })
            }
        },
        components:{
            movieInfo,Switches,movieComment,loadmore,MovieReview
        },
        onUnload () {
            this.clearMovie()
        }
    }
</script>
<style lang="less" scoped>
@import url('~@/styles/color.less');
.detail-wrapper{
    .head-img{
        width: 100%;
        padding:20px 0;
        background:@color-background-f;
        .img{
            text-align: center;
            img{
                width: 50%;
                margin: 0 auto;
            }
        }
    }
}
</style>