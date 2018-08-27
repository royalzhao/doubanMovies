<template>
  <div class="movie-list">
    <div class="movie-item">
      <div class="img">
        <img src="https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529389608.jpg" alt="">
      </div>
      <div class="content">
        <h2 class="head">父子雄兵</h2>
        <div class="">评分</div>
        <div>导演</div>
        <div>主演</div>
        <div>11505人看过</div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Star from '@/base/star/star';
  // import Loadmore from '@/base/loadmore/loadmore';

  export default {
    props: {
      
    },
    data() {
      return {
        casts: [],
        showScore: true
      };
    },
    created() {
     
    },
    computed: {}
   
}

</script>
<style lang="less" scoped>
  .movie-list{
    .movie-item{
      margin: 10px;
      display:flex;
      .img{
        img{
          width:120px;
          height: 160px;
        }
      }
      .content{

      }
    }
  }
</style>
      