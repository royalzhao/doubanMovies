<template>
    <div class="movie-show">
      <!-- 搜索 -->
        <div class="go-search" @click="goSearch">
          <div class="logo">
            <img src="./douban-logo.png" alt="">
          </div>
          <div class="search-content">
            <span class="icon-search"></span>
            <span>电影人/影人/标签</span>
          </div>
        </div>
        <!-- 选项卡 -->
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
        <!-- 列表显示 -->
        <div class="list-wrapper">
          <scroll v-show="currentIndex === 0"
                  class="list-scroll"
                  :data="hotMovies"
                  :pullup="pullup"
                  @scrollToEnd="loadMore"
                  ref="hotMovies"
          >
            <div class="list-linner">
              <movie-list :movies="hotMovies" :hasMore="hasMoreHotMovies" @select="selectMovie"></movie-list>
            </div>
          </scroll>
          <scroll v-show="currentIndex === 1"
                  class="list-scroll"
                  :data="comingMovies"
                  :pullup="pullup"
                  :probeType="probeType"
                  :listenScroll="listenScroll"
                  @scroll="scroll"
                  @scrollToEnd="loadMore"
                  ref="comingMovies"
          >
            <div class="list-inner">
              <movie-list :movies="comingMovies" :needDate="needDate" @getHeight="getHeight" @getMap="getMap" :hasMore="hasMoreComingMovies" @select="selectMovie" ref="list"></movie-list>
            </div>
          </scroll>
          <loadmore :fullScreen="fullScreen"
                    v-show="currentIndex===1&&!comingMovies.length||currentIndex===0&&!hotMovies.length">
          </loadmore>
        </div>
        <div v-show="currentIndex === 1" class="list-fixed" v-if="fixedTitle" ref="fixed">
          <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
    </div>
</template>

<script>
import Switches from '@/base/switches/switches';
import { createMovieList } from '../../common/js/movieList';
import { getMovie, getComingMovie } from '../../api/movie-show';
export default {
  data () {
    return {
      switches: [
        {name: '正在热映'},
        {name: '即将上映'}
      ],
      comingMovies: [],
      comingMovieIndex: 0,
      scrollY: -1,
    }
  },

  components: {
    Switches,
  },

  methods: {
    // 切换tab栏
    switchItem(index){
      this.currentIndex = index;
      if(index === 1){  //重新计算各个区间的高度 
        this.$refs.list.recalculate();
      }
      // 第一次切换到即将上映选项卡后开始请求即将上映电影的数据
      if(index === 1 && !this.comingMovies.length){
        getComingMovie(this.comingMovieIndex,SEARCH_MORE).then((res)=>{
          this.comingMovies = createMovieList(res.subjects);    //格式化数据，创建包含电影类的数组
          this._checkMore(res); // 检查是否还存在更多数据
        })
      }
      if (index === 1) { // 重新载入之前的滚动位置
        this.$refs.comingMovies.scrollTo(0, this.scrollY);
      }
      setTimeout(() => { // scroll组件计算高度，确保正确滚动
        this.$refs.comingMovies.refresh();
        this.$refs.hotMovies.refresh();
      }, 20);
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
  },

  created () {
   
  }
}
</script>

<style scoped lang="less">
  @import url("~@/styles/color.less");
  .movie-show{
    height: 100%;
    .go-search{
      height: 50px;
      box-sizing:border-box;
      padding:10px 10px 5px 60px;
      text-align:center;
      .logo{
        position: absolute;
        left: 10px;
        img{
          width:35px;
          height: 35px;
        }
      }
      .search-content{
        background-color: #eee;
        font-size: @font-size-medium-x;
        line-height:35px;
        border-radius:5px;
        span{
          display: inline-block;
          verticla-align:middle;
        }
      }
    }
  }
</style>
