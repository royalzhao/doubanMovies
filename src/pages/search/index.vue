<template>
    <transition name="fade">
        <div class="search">
            <search-box @query="onQueryChange" :tagSearch="tagSearch" v-show="!tagSearch"></search-box>
            <div class="shortcut-wrapper" v-show="!query">
                <div class="tag-list">
                    <div class="douban-tag tag">
                        <span v-for="item in doubanTag" class="tag-item" @click="tagQuery(item)">{{item}}</span>
                    </div>
                    <div class="movie-tag tag">
                        <span v-for="item in movieTag" class="tag-item" @click="tagQuery(item)">{{item}}</span>
                    </div>
                    <div class="country-tag tag">
                        <span v-for="item in countryTag" class="tag-item" @click="tagQuery(item)">{{item}}</span>
                    </div>
                </div>
            </div>
            <div class="search-result" :class="{'trg-search':tagSearch}" v-show="query">
                
            </div>
        </div>
    </transition>
</template>
<script>
    import SearchBox from "@/components/search-box"
    export default {
        data(){
            return{

            }
        },
        components:{
            SearchBox
        }
    }
</script>
<style lang="less" scoped>

</style>