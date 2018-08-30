<template>
  <div class="movie-list">
    
    <div class="movie-item" v-for="(movie,index) in movies" :key="index" @click="selectItem(movie)">
      <div class="date" v-if="needDate && !dateEqual(index)">{{movie.date}}</div>
      <div class="item">
        <div class="img">
          <img :src="movie.image" alt="">
        </div>
        <div class="content">
          <h2 class="head">{{movie.title}}</h2>
          <star :size="24" :score="movie.rating" :showScore="showScore"></star>
          <div class="director">导演: {{movie.director}}</div>
          <div class="casts">主演: {{movie.casts}}</div>
          <div class="hasWacthed">{{movie.collectCount}}人看过</div>
        </div>
      </div>
      
    </div>
    <loadmore :hasMore="hasMore" v-show="movies.length"></loadmore>
  </div>
</template>

<script>
  import Star from '@/components/star/star';
  import Loadmore from '@/components/loadmore';

  export default {
    props: {
      movies:{
        type:Array,
        default:[]
      },
      needDate:{
        type:Boolean,
        default:false
      },
      hasMore:{
        type:Boolean,
        default:true
      }
    },
    data() {
      return {
        casts: [],
        showScore: true
      }
    },
    created() {
     
    },
    computed: {},
    components:{
      Star,Loadmore
    },
    methods:{
      selectItem(movie){
        this.$emit('select',movie);
      },
      dateEqual(index) { // 确定相邻两部电影日期是否一样，划分日期分组
        if (index === 0) {
          return false;
        }
        return this.movies[index].date === this.movies[index - 1].date;
       
      },
    }
}

</script>
<style lang="less" scoped>
  @import url("~@/styles/color.less");
  .movie-list{
    .movie-item{
      .date{
        width: 100%;
        background-color: @color-background-d;
        padding-left: 5px;
        height: 30px;
        line-height: 30px;
        font-size:@font-size-small;
        color:@color-text;
      }
      .item{
        margin: 10px;
        display:flex;
        .img{
          img{
            width:80px;
            height: 120px;
          }
        }
        .content{
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          overflow: hidden;
          margin-left: 10px;
          .head{
            font-size: @font-size-medium-x;
            color:@color-text-f;
          }
          .director{
            font-size: @font-size-small;
            color:@color-text ;
          }
          .casts{
            font-size: @font-size-small;
            color:@color-text ;
          }
          .hasWacthed{
            color: @color-text-f;
            font-size:@font-size-small;
          }
        }
      }
    }
  }
</style>
      