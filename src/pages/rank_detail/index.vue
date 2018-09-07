<template>
    <div class="rank-wrapper">
        <switches v-if="rankType==='豆瓣 Top250'"
            :switches="switches"
            :currentIndex="currentIndex"
            :smallFont="smallFont"
            @switch="switchTab"
        >
        </switches>
        <div v-for="(scrollItem,index) in switches"
            :key="index"
            v-show="currentIndex === index"
            class="rank-list-wrapper"
        >
            <div class="rank-content" :class="{'more-padding':rankType==='豆瓣 Top250'}">
                <rank-list :rankItems="rankList[index]"
                            @select="selectMovie"
                            :page="index"
                            :hasMore="hasMore[index]"></rank-list>
            </div>
            <loadmore :fullScreen="fullScreen" v-if="!rankList[index].length"></loadmore>
        </div>
    </div>
</template>
<script>
    import Switches from '@/components/switch';
    import Loadmore from '@/components/loadmore';
    import rankList from '@/components/rank-list';
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
                SEARCH_MORE:10,
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
        mounted() {
            this.loadingFlag = true; // 控制滚动加载速度
            this._selectType();
            this._getRankList();
           
        },
        beforeMount() {
            // 由于top250榜单分栏的存在，需要添加排行列表的子对象作为各排名区间的数据
            // dom挂载前添加属性，防止挂载后由于属性未添加报错
            for (let i = 0; i < this.switches.length; i++) {
                this.$set(this.rankList, i, []);
            }
        },
        methods:{
            switchTab(index){   //切换tab选项卡
                this.currentIndex = index;
                this.loadingFlag = true;
                // console.log(this.rankList)
                // console.log(this.rankList[index])
                if(this.rankList[index].length === 0){
                    this.hasMore[index] = true;
                    this.dataFn(this.movieIndex[index],this.SEARCH_MORE).then((res)=>{
                        this.rankList[index] = createRankList(res.subjects)
                    });
                }
            },
            _selectType(){
                let type = this.$root.$mp.query.type;
                switch (type) {
                    case 'top250':
                        this.dataFn = top250Rank;
                        this.rankType = '豆瓣 Top250';
                        break;
                    case 'weekly':
                        this.dataFn = weeklyRank;
                        this.rankType = '本周口碑榜';
                        break;
                    case 'newMovie':
                        this.dataFn = newMoviesRank;
                        this.rankType = '新片榜';
                        break;
                    case 'usBox':
                        this.dataFn = usBoxRank;
                        this.rankType = '北美票房榜';
                        break;
                
                    default:
                        break;
                }
            },
            _getRankList(){
                if (this.rankType !== '豆瓣 Top250') { // 非top250榜单
                    //console.log(1)
                    this.dataFn().then((res) => {
                      this.rankList[0] = createRankList(res.subjects);
                    });
                  } else {
                   // console.log(2)
                    this.dataFn(this.movieIndex[0], this.SEARCH_MORE).then((res) => {
                      this.rankList[0] = createRankList(res.subjects);
                      this.hasMore[0] = true;
                      // 第一次可以不进行检查
                    });
                  }
            },
            loadMore(){     //加载更多数据
                const index = this.currentIndex;    //获取当前分页页数
                if(!this.loadingFlag){  //上一次加载未完成忽略此次事件
                    return;
                }
                this.loadingFlag = false;
                if(!this.hasMore[index]){
                    return;
                }
                this.movieIndex[index] += this.SEARCH_MORE;
                this.dataFn(this.movieIndex[index],this.SEARCH_MORE).then((res)=>{
                    this.rankList[index] = this.rankList[index].concat(createRankList(res.subjects))
                    this._checkMore(res);
                    this.loadingFlag = true;
                })
            },
            _checkMore(data){
                let movies = data.subjects;
                let end = 50 * (this.currentIndex + 1);
                if(!movies.length || data.start + data.count >= end){
                    this.hasMore[this.currentIndex] = false
                }
            },
            selectMovie(movie){ // 跳转进入电影详细
                wx.navigateTo({
                    url: `/pages/movie_detail/main?id=${movie.id}&name=${movie.title}`
                })
            }
            
        },
        onReachBottom () { // 上拉加载
            this.loadMore()
        },  
        components:{
            Switches,Loadmore,rankList
        }
        
    }
</script>
<style lang="less" scoped>

</style>