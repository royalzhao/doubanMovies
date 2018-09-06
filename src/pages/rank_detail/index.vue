<template>
    <div class="rank-wrapper">
        <switches v-if="rankType==='豆瓣 Top250'"
            :switches="switches"
            :currentIndex="currentIndex"
            :smallFont="smallFont"
            @switch="switchTab"
        >
        </switches>
    </div>
</template>
<script>
    import Switches from '@/components/switch';
    import Loadmore from '@/components/loadmore';
    import { top250Rank, usBoxRank, weeklyRank, newMoviesRank } from '@/api/api';
    import { createRankList } from '@/utils/movieList.js'
    export default {
        data(){
            return{
                rankType: '',
                dataFn: null,
                top250Index: 0,
                rankList: {},
                fullScreen: true,
                currentIndex: 0,
                switches: [
                {name: '1-50'},
                {name: '51-100'},
                {name: '101-150'},
                {name: '151-200'},
                {name: '201-250'}
                ],
                smallFont: true, // tab栏目小字体
                hasMore: [false, false, false, false, false], // 是否存在更多数据，仅针对top250
                movieIndex: [0, 50, 100, 150, 200], // 每页起始索引
            }
        },
        components:{
            Switches,Loadmore
        }
    }
</script>
<style lang="less" scoped>

</style>