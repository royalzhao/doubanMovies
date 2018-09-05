<template>
    <div class="discussion-wrapper">
        <movie-comment
            v-if="type==='comment'"
            :comments="discussions"
            :commentNum="discussionNum"
            :needTitle="needTitle"
            :hasMore="hasMore"
        >
        </movie-comment>
        <movie-review
            v-else
            :reviews="discussions"
            :reviewNum="discussionNum"
            :hasMore="hasMore"
            :needTitle="needTitle"
            @selectReview="selectReview"
        >
        </movie-review>

        <div class="no-result" v-if="noResult">这里什么都没有呃 :(</div>
    </div>
</template>
<script>
    import movieComment from '@/components/movie-comment'
    import MovieReview from '@/components/movie-review'
    import loadmore from "@/components/loadmore"
    import { getAllReviews,getAllComments } from '@/api/api'
    export default {
        data(){
            return{
                discussionIndex: 0,
                SEARCH_MORE:20,
                discussions: [],
                discussionNum: 0,
                hasMore: true, // 存在更多数据
                noResult: false,
                type:'',
                movieId:null,
                loadingFlag:true
            }
        },
        components:{
            movieComment,MovieReview,loadmore
        },
        mounted() {
            this.fullScreen = true;
            this.needTitle = true;
            const type = this.$root.$mp.query.type;
            const movieId = this.$root.$mp.query.movieId;
            if (!type) {
                return wx.navigateBack()
            }
            this.type = type;
            this.movieId = movieId;

            this._getAllDiscussions();
        },
        methods:{
            _getAllDiscussions(){   //初始加载评论先判断评论类型
                let isComment = this.type === 'comment';
                this.discussType = isComment ? 'comments' : 'reviews';
                if(isComment){
                    wx.setNavigationBarTitle({ title: "全部短评" })
                }else{
                    wx.setNavigationBarTitle({ title: "全部影评" })
                }
               
            
                this.getData = isComment ? getAllComments : getAllReviews;
                
                this.getData(this.movieId, this.discussionIndex,this.SEARCH_MORE).then((res)=>{
                    this.discussions = res[this.discussType];
                    this.noResult = this.discussions.length ? this.noResult : true; // 是否存在结果
                    this.discussionNum = res.total;
                    this._checkMore(res); // 检查是否还存在更多数据
                })
            },
            _checkMore(data){   //检查是否存在更多数据
                //console.log(data)
                const discussions = data.comments ? data.comments : data.reviews;
                if(!discussions.length || data.start + data.count > tatal){
                    this.hasMore = false;
                }
            },
            loadMore(){ //加载更多
                //console.log(!this.loadingFlag)
                if(!this.loadingFlag || !this.hasMore){ // 上一次加载还未完成或没有更多数据时候，忽略此次事件
                    console.log('quick')
                    return;
                }
               // this.loadingFlag = false;
                this.discussionIndex += this.SEARCH_MORE;
                this.getData(this.movieId, this.discussionIndex, this.SEARCH_MORE).then((res) => {
                    this.discussions = this.discussions.concat(res[this.discussType]);
                    this._checkMore(res);
                    this.loadingFlag = true;
                });
            },
            selectReview(id){
                wx.navigateTo({
                    url: `/pages/review_detail/main?id=${id}`
                })
            }
        },
        onReachBottom () { // 上拉加载
            this.loadMore()
        },  
    }
</script>
<style lang="less" scoped>

</style>