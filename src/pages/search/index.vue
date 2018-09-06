<template>
    <transition name="fade">
        <div class="search">
            <search-box @query="onQueryChange" @back="back" :tagSearch="tagSearch" v-show="!tagSearch"></search-box>
            <div class="shortcut-wrapper" v-show="!query">
                <div class="tag-list">
                    <div class="douban-tag tag">
                        <span v-for="item in doubanTag" :key="index" class="tag-item" @click="tagQuery(item)">{{item}}</span>
                    </div>
                    <div class="movie-tag tag">
                        <span v-for="item in movieTag" :key="index" class="tag-item" @click="tagQuery(item)">{{item}}</span>
                    </div>
                    <div class="country-tag tag">
                        <span v-for="item in countryTag" :key="index" class="tag-item" @click="tagQuery(item)">{{item}}</span>
                    </div>
                </div>
            </div>
            <div class="search-result" :class="{'tag-search':tagSearch}" v-show="query">
                <search-result :query="query" :tagSearch="tagSearch"></search-result>
            </div>
        </div>
    </transition>
</template>
<script>
    import SearchBox from "@/components/search-box"
    import SearchResult from "@/components/search-result"
    export default {
        data(){
            return{
                query: '',
                doubanTag: ['经典', '豆瓣高分', '冷门佳片'],
                movieTag: ['剧情', '爱情', '喜剧', '科幻', '动作', '悬疑', '治愈', '青春', '文艺'],
                countryTag: ['日本', '韩国'],
                tagSearch: false,
            }
        },
        components:{
            SearchBox,SearchResult
        },
        mounted() {
            wx.setNavigationBarTitle({ title: "搜索" }) 
        },
        methods:{
            onQueryChange(query){
                this.query = query
            },
            tagQuery(query) { // 搜索标签内容,按标签搜索
                // 隐藏搜索栏，区分关键字搜索和标签搜索
                this.tagSearch = true;
                this.query = query;
                // this.$refs.searchBox.setQuery(query);
            },
            back(){
                this.query = '';
            }
        },
        
        watch: {
            // 由于shortcut-wrapper会在搜索内容存在的时候隐藏，dom会重新发生变化，所以这里需要再次刷新scroll组件
            // query(newQuery) {
            //     if (!newQuery) {
            //     setTimeout(() => {
            //         this.$refs.shortcut.refresh();
            //     }, 20);
            //     }
            // }
        },
    }
</script>
<style lang="less" scoped>
    @import url("~@/styles/color.less");
    .search{
        background: @color-background;
        .shortcut-wrapper{
            .tag-list{
                padding:0 20px;
                .tag{
                    border-bottom:1px solid @color-line;
                    display:flex;
                    flex-wrap:wrap;
                    padding:40rpx 0;
                    &:nth-last-of-type(1){
                        border:0;
                    }
                    span{
                        border-radius: 5px;
                        padding: 5px 15px;
                        color: @color-theme-f;
                        border:1px solid @color-theme-f;
                        margin:5px;
                        font-size:@font-size-medium;
                    }
                }
            }
        }
    }
</style>