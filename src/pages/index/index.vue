<template>
    <div class="movie-show">
      <div class="go-search" @click="goSearch">
        <div class="logo">
          <img src="./douban-logo.png" width="35" height="35">
        </div>
        <div class="search-content">
          <span class="icon-search"></span>
          <span>电影/影人/标签</span>
        </div>
      </div>
      <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
      <div class="list-wrapper">
        <div class="list-item" v-show="currentIndex === 0">
          <movielist :movies="hotMovies" :hasMore="hasMoreHotMovies" @select="selectMovie"></movielist>
        </div>
        <div class="list-item" v-show="currentIndex === 1">
          <movielist :movies="comingMovies" :needDate="needDate" :hasMore="hasMoreComingMovies" @select="selectMovie"></movielist>
        </div>
        <!-- <loadmore :fullScreen="fullScreen"
                v-show="currentIndex===1&&!comingMovies.length||currentIndex===0&&!hotMovies.length">
        </loadmore> -->
      </div>
  </div>
</template>
<script>
import Switches from '@/components/switch';
import Movielist from '@/components/movie-list';
import { getMovie,getComingMovie } from '@/api/api'
import { createMovieList } from '@/utils/movieList.js'
import Loadmore from '@/components/loadmore';
export default {
    data(){
      return{
        switches:[
          {name:'正在热映'},
          {name:'即将上映'}
        ],
        currentIndex:0,
        in_theaters:{
          start:0,
          count:10
        },
        coming_soon:{
          start:0,
          count:10
        },
        hotMovies:[],
        hasMoreHotMovies:true,
        comingMovies:[],
        hasMoreComingMovies:true,
        fullScreen: true, // 加载动画全屏
        loadingFlag: true, // 控制滚动加载速度
        needDate: true, // 电影列表显示日期栏
      }
    },
    components:{
      Switches,Movielist,Loadmore
    },
    created() {
      this.getMovies()
    },
    methods:{
      switchItem(index){  //切换tab栏
        this.currentIndex = index
        if(index === 1 && !this.comingMovies.length){
          getComingMovie(this.coming_soon.start,this.coming_soon.count).then((res)=>{
            this.comingMovies = createMovieList(res.subjects);    //格式化数据
            this._checkMore(res);   //检查是否还存在更多数据
          })
        }
      },
      selectMovie(movie) { // 转入电影详情
        wx.navigateTo({
            url: `/pages/movie_detail/main?id=${movie.id}`
        })
      },
      getMovies(){
        if (this.currentIndex === 0) {
          getMovie(this.in_theaters.start,this.in_theaters.count)
            .then((response)=>{
              this.hotMovies = createMovieList(response.subjects);
              this._checkMore(response); // 检查是否还存在更多数据
            })
        }else{
          getComingMovie(this.coming_soon.start,this.coming_soon.count)
            .then((response)=>{
              this.comingMovies.push(createMovieList(response.subjects));
              this._checkMore(response); // 检查是否还存在更多数据
            })
        }
        
      },
      _checkMore(data) {
        const movies = data.subjects;
        if (!movies.length || data.start + data.count > data.total) {
          if (this.currentIndex === 0) {
            this.hasMoreHotMovies = false;
          } else {
            this.hasMoreComingMovies = false;
          }
          this.loadingFlag = true;
        }
      },
      loadMore(){   //加载更多数据
        if(!this.loadingFlag){    // 上一次加载还未完成时候，忽略此次事件
          return;
        }
        this.loadingFlag = false; //重置加载标志位
        if(this.currentIndex === 0){
          if(!this.hasMoreHotMovies){   //不存在更多电影
            this.loadingFlag = true;
            return;
          }
          
          this.in_theaters.start += this.in_theaters.count;
          getMovie(this.in_theaters.start,this.in_theaters.count).then((res)=>{
            this.hotMovies = this.hotMovies.concat(createMovieList(res.subjects));
            this._checkMore(res)
            this.loadingFlag = true;
          })
        }else{
          if(!this.hasMoreComingMovies){
            this.loadingFlag = true
            return;
          }
          this.coming_soon.start += this.coming_soon.count;
          getComingMovie(this.coming_soon.start,this.coming_soon.count).then((res)=>{
            this.comingMovies = this.comingMovies.concat(createMovieList(res.subjects));
            this._checkMore(res)
            this.loadingFlag = true;
          })
        }
      }
    },
    // async onPullDownRefresh () { // 下拉刷新
    //   await this.getMovies()
    //   wx.stopPullDownRefresh()
    // },

    onReachBottom () { // 上拉加载
      this.loadMore()
    },  
}
</script>
<style scoped lang="less">
@import url("~@/styles/color.less");
.movie-show{
  height: 100%;
    .go-search{
      height: 50px;
      box-sizing: border-box;
      padding: 10px 10px 5px 60px;
      text-align: center;
      .logo{
        position: absolute;
        left: 10px;
        img{
          width:35px;
          height: 35px;
        }
      }
        
      .search-content{
        background-color: @color-background-d;
        font-size: @font-size-medium-x;
        line-height: 35px;
        border-radius: 5px;
        span{
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    /* .list-wrapper{
      position: relative;
      height: 500px;
      overflow: auto;
      width: 100%;
      .list-item{
        position: absolute;
      }
    } */
}
      
        
          
</style>