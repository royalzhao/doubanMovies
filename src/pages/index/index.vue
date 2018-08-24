<template>
  <div class="md-splash">
    <swiper class="md-splash__swiper" indicator-dots>
      <swiper-item class="md-splash__item" v-for="(item,index) in movies" :for-index="index" :key="item.id">
        <image :src="item.images.large" class="md-splash__image" mode="aspectFill"></image>
        <button class="md-splash__start" @click="handleStart" v-if="index === movies.length - 1">立即体验</button>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import { getStorage, setStorage } from '@/utils/wechat'
  import { getBoardData } from '@/api/api'
  const LAST_SPLASH_DATA = 'LAST_SPLASH_DATA'

  export default {
    data(){
      return{
        movies:[]
      }
    },
    mounted() {
      this.getInitData()
    },
    methods:{
      async getCache(){
        try{
          let res = await getStorage(LAST_SPLASH_DATA)
          const {movies,expires} = res.data
          // 有缓存，判断是否过期
          if(movies && expires > Date.now()){
            return res.data
          }

          // 已经过期
          console.log("uncached")
          return null
        } catch (error){
          return null
        }
      },
      async getInitData(){
        let cache = await this.getCache()
        if(cache){
          this.movies = cache.movies
          return
        }
        let data = await getBoardData({board:'coming_soon',page:1,count:3})
        this.movies = data.subjects
        await setStorage(LAST_SPLASH_DATA,{
          movies:data.subjects,
          expires:Data.now()+1*24*60*60*1000
        })
      },

      handleStart () {
        // TODO: 访问历史的问题
        wx.switchTab({
          url: '../board/main'
        })
      }
    }
  }
</script>