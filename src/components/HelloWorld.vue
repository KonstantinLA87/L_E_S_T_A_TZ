<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref, onMounted } from 'vue';

import 'swiper/css';

const data = ref([])

const fetchReq = (query: any) => {
  return fetch('https://vortex.korabli.su/api/graphql/glossary/', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ query })
  }).then(res => res.json()).then(something => data.value = something.data.vehicles)
}

const some = `query All {
  vehicles {
    title
    description
    icons {
      large
      medium
    }
    level
    type {
      name
    	title
      icons {
        default
      }
    }
    nation {
      name
      title
      color
      icons {
        small
        medium
        large
      }
    }
  }
}`

onMounted(() => {
  fetchReq(some)
})
</script>

<template>
  <h1>Корабли</h1>

  <swiper
    :slides-per-view="3"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="item in data">
      <img :src="`https:${item.icons.medium}`" alt="">
    </swiper-slide>
  </swiper>
</template>

<style scoped>

</style>
