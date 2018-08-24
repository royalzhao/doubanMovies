<template>
    <div class="md-board">
        <view class="md-board__slide">
            <swiper class="md-board__swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
                <swiper-item v-for="(movie, index) in movies" :key="index">
                    <image class="md-board__slide-image" :src="movie.images.large" mode="aspectFill"/>
                </swiper-item>
            </swiper>
        </view>
        <view class="md-board__list" :scroll-y="true">
            <block v-for="(item, index) in boards" :key="item.key">
              <view class="md-board__item">
                <navigator :url="'../list/main?type=' + item.key + '&title=' + item.title" hover-class="none">
                  <view class="md-board__title">
                    <text class="md-board__title-text">{{ item.title }}</text>
                    <image class="md-board__title-image" src="../../../static/images/arrowright.png" mode="aspectFill"/>
                  </view>
                </navigator>
                <scroll-view class="md-board__content" :scroll-x="true">
                  <view class="md-board__inner" v-if="item.key !== 'us_box'">
                    <navigator v-for="(movie, i) in item.movies" :key="movie.id + index + i" :url="'../item/main?id=' + movie.id">
                      <view class="md-board__movie">
                        <image class="md-board__movie-image" :src="movie.images.large" mode="aspectFill"/>
                        <text class="md-board__movie-text">{{ movie.title }}</text>
                      </view>
                    </navigator>
                  </view>
                  <view class="md-board__inner" v-else>
                    <navigator v-for="(movie, i) in item.movies" :key="movie.rank + index + i" :url="'../item/main?id=' + movie.subject.id">
                      <view class="md-borad__movie">
                        <image class="md-board__movie-image" :src="movie.subject.images.large" mode="aspectFill"/>
                        <text class="md-board__movie-text">{{ movie.subject.title }}</text>
                      </view>
                    </navigator>
                  </view>
                </scroll-view>
              </view>
            </block>
          </view>
    </div>
</template>
