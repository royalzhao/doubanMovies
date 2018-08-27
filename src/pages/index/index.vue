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
        <div v-show="currentIndex === 0">
          <movielist></movielist>
        </div>
        <div v-show="currentIndex === 1">

        </div>
      </div>
  </div>
</template>
<script>
import Switches from '@/components/switch';
import Movielist from '@/components/movie-list';
export default {
    data(){
      return{
        switches:[
          {name:'正在热映'},
          {name:'即将上映'}
        ],
        currentIndex:0
      }
    },
    components:{
      Switches,Movielist
    },
    methods:{
      switchItem(index){  //切换tab栏
        this.currentIndex = index

      }
    }
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

}
      
        
          
</style>