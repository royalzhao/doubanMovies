<template>
    <div class="suggest-wrapper">
        <div class="suggest">
            <ul class="suggest-list">
                <li class="suggest-item" v-for="item in result" v-if="item.subtype !== 'tv'" @click="selectItem(item)">
                    <div class="item-pic">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="item-info">
                        <div class="title">
                            {{item.title}}
                        </div>
                        <div class="info">
                            <span class="rating">{{getRating(item.rating)}}</span>
                            <span class="pubdate">{{getPubdate(item.pubdate)}}</span>
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
        }
    }
</script>
<style lang="less" scoped>
    
</style>