<template>
    <div class="suggest-wrapper">
        <div class="suggest">
            <ul class="suggest-list">
                <li class="suggest-item" v-for="item in result" :key="index" v-if="item.subtype !== 'tv'" @click="selectItem(item)">
                    <div class="item-pic">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="item-info">
                        <div class="title">
                            {{item.title}}
                        </div>
                        <div class="info">
                            <span class="rating">{{item.rating}}分</span>
                            <span class="pubdate">{{getPubdate(item.pubdates)}}</span>
                        </div>
                    </div>
                </li>
                <loadmore :hasMore="hasMore" v-if="result.length"></loadmore>
            </ul>
            
            <div class="no-result" v-if="noResult">抱歉，暂无搜索结果 :(</div>
            <loadmore :fullScreen="fullScreen" v-if="!result.length && !noResult"></loadmore>
        </div>
    </div>
</template>
<script>
    import loadmore from "@/components/loadmore"
    import { movieSearch, tagSearch } from '@/api/api'
    import { createSearchList } from '@/utils/movieList.js'
    export default {
        props:{
            query:{
                type:String,
                default:''
            },
            tagSearch:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                searchIndex:0,
                SEARCH_MORE:20,
                result:[],
                hasMore:true,
                loadingFlag: true,
                fullScreen: true,
                noResult: false
            }
        },
        created() {
            this._selectType();
        },
        watch:{
            query(){
                this._selectType()
                if(this.query) {    //搜索框有数据
                    this.result = [];   //清空数据
                    this.search();  //获得检索数据
                }
            }
        },
        methods:{
            _selectType(){
                this.dataFn = this.tagSearch ? tagSearch : movieSearch;
            },
            search(){
                this.hasMore = true;
                this.loadingFlag = true;
                this.searchIndex = 0;   //变更搜索内容时重置
                this.dataFn(this.query,this.searchIndex,this.SEARCH_MORE).then((res)=>{
                    console.log(res)
                    const queryRet = res.title.split('"');
                    console.log(queryRet)
                    if(this.query !== queryRet[1]){ // 防止由于加载缓慢，之前废弃的数据篡改当前数据
                        console.log("old request +1",queryRet[1])
                        return;
                    }
                    if(!res.subjects.length){ // 判断是否存在搜索结果
                        this.noResult = true;
                    }else{
                        this.noResult = false;
                    }
                    this.result = createSearchList(res.subjects)
                    this._chechMore(res)
                })
            },
            _checkMore(data){
                let movies = data.subjects;
                if(!movies.length || data.start + data.count >= data.total){
                    this.hasMore = false;
                }
            },
            selectItem(item){
                wx.navigateTo({
                    url: `/pages/movie_detail/main?id=${item.id}&name=${item.title}`
                })
            },
            loadMore(){
                if(!this.loadingFlag){
                    return;
                }
                this.loadingFlag = false;
                if(!this.hasMore){
                    return;
                }
                this.searchIndex += this.SEARCH_MORE;
                this.dataFn(this.query,this.searchIndex, this.SEARCH_MORE).then((res)=>{
                    this.result = this.result.concat(createSearchList(res.subjects))
                    this._checkMore(res)
                    this.loadingFlag = true;
                })
            },
            getPubdate(date) {
                let pubdate = '';
                for (let i = 0; i < date.length; i++) {
                    if (date[i].indexOf('电影节') === -1) {
                        pubdate = date[i]; // 没有在中国大陆上映，取不为电影节的最后一个信息
                    }
                    if (date[i].indexOf('中国大陆') > -1) {
                        pubdate = date[i];
                        break;
                    }
                }
                if (!pubdate) {
                    return '';
                }
                return '/' + pubdate;
            },
            getRating(rate) {
                if (rate === 0) {
                    return '暂无评分';
                }
                return rate + '分';
            }
        },
        components:{
            loadmore
        },
        onReachBottom () { // 上拉加载
            this.loadMore()
        },  
    }
</script>
<style lang="less" scoped>
    @import url("~@/styles/color.less");
    .suggest-wrapper{
        width: 100%;
        .suggest{
            height: 100%;
            overflow: hidden;
            .suggest-list{
                padding:15px;
                .suggest-item{
                    margin-top:15px;
                    height: 70px;
                    display: flex;
                    &:first-child{
                        margin-top: 0px;
                    }
                    .item-pic{
                        flex:50px 0 0;
                        width: 50px;
                        margin-right:10px;
                        img{
                            width:50px;
                            height: 70px;
                        }
                    }
                    .item-info{
                        flex:1;
                        padding-bottom: 30px;
                        .title{
                            font-size: @font-size-medium;
                            color:@color-text-f;
                            margin-bottom:10px;
                        }
                        .info{
                            font-size: 0;
                            span{
                                font-size:@font-size-small;
                            }
                        }
                    }
                }
               
                
            }
            .no-result{
                position: absolute;
                top: 50%;
                width: 100%;
                text-align: center;
            }
        }
    }
</style>