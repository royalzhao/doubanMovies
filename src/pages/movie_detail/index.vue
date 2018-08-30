<template>
    <div class="detail-wrapper">
        <div class="fixed-title">
            <span class="back" @click="back">
                <i class="icon-back"></i>
            </span>
            <span class="type">
                <span class="icon" v-show="!this.changeFix">
                    <i class="icon-video-camera"></i>
                    电影
                </span>
                <span v-if="changeFix" v-text="movieDetail.title" class="movie-name"></span>
            </span>
        </div>
    </div>
</template>
<script>
    import { getMovieDetail } from '@/api/api'
    export default {
        data(){
            return{
                id:null,
                movieDetail: {},
                fullScreen: true, // 用于loadmore组件全屏加载效果
                switches: [
                {name: '短评'},
                {name: '影评'}
                ],
                currentIndex: 0,
            }
        },
        created() {
            const id = this.$root.$mp.query.id;
            console.log(id)
            this._getDetail(id);      //获取电影详细信息
        },  
        methods:{
            back(){
                wx.navigateBack({
                    delta: 1
                })
            },
            _getDetail(id){
                console.log(id)
                if(!id){     //在当前页面刷新回到主页面
                    wx.navigateBack({
                        delta: 1
                    });
                    return;
                }else{
                    getMovieDetail(id).then((res)=>{ //获取电影详细
                        this.movieDetail = res;
                        console.log(res)
                    })
                }
               
            }
        }
    }
</script>
<style lang="less" scoped>

</style>