<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, onMounted } from "vue";

import "swiper/css";

const data = ref([]);

const fetchReq = (query: any) => {
    return fetch("https://vortex.korabli.su/api/graphql/glossary/", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ query }),
    })
        .then((res) => res.json())
        .then((something) => (data.value = something.data.vehicles));
};

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
}`;

onMounted(() => {
    fetchReq(some);
});
</script>

<template>
    <div class="container">
        <h1>Корабли</h1>

        <!-- <swiper
            :slides-per-view="3"
            :space-between="10"
            >
            <swiper-slide v-for="item in data">
                <div class="slide-box" :class="{
                'japan': item.nation.name === 'japan',
                'usa': item.nation.name === 'usa',
                }">
                <img :src="`https:${item.icons.medium}`" alt="">
                <p>Название: {{ item.title }}</p>
                <p>Описание: {{ item.description }}</p>
                <p>Уровень: {{ item.level }}</p>
                <p>Нация: {{ item.nation.name }}</p>
                <p>Тип: {{ item.type.name }}</p>
                </div>
            </swiper-slide>
        </swiper> -->

        <div class="flex">
            <div
                v-for="item in data"
                class="slide-box"
                :class="{
                    japan: item.nation.name === 'japan',
                    usa: item.nation.name === 'usa',
                    ussr: item.nation.name === 'ussr',
                    germany: item.nation.name === 'germany',
                    uk: item.nation.name === 'uk',
                    france: item.nation.name === 'france',
                    asia: item.nation.name === 'pan_asia',
                    italy: item.nation.name === 'italy',
                    common: item.nation.name === 'commonwealth',
                    america: item.nation.name === 'pan_america',
                    europe: item.nation.name === 'europe',
                    netherlands: item.nation.name === 'netherlands',
                    spain: item.nation.name === 'spain',
                }"
            >
                <img :src="`https:${item.icons.medium}`" alt="" />
                <p>Название: {{ item.title }}</p>
                <p>Описание: {{ item.description }}</p>
                <p>Уровень: {{ item.level }}</p>
                <p>Нация: {{ item.nation.name }}</p>
                <p>Тип: {{ item.type.name }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    padding: 0 20px;
}

.flex {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.swiper-slide {
    width: auto !important;
}

.slide-box {
    width: 190px;
    height: 220px;
    background: rgba(0, 0, 0, 0.15);
    border: 1px solid #ffffff8d;
    color: #fff;
    background-size: contain;
    background-repeat: no-repeat;

    &.japan {
        background-image: url("./flag_japan.jpeg");
    }
    &.usa {
        background-image: url("./flag_usa.jpeg");
    }
    &.ussr {
        background-image: url("./flag_ussr.png");
    }
    &.germany {
        background-image: url("./flag_germany.jpeg");
    }
    &.uk {
        background-image: url("./flag_uk.png");
    }
    &.france {
        background-image: url("./flag_france.webp");
    }
    &.asia {
        background-image: url("./flag_asia.jpeg");
    }
    &.italy {
        background-image: url("./flag_italy.webp");
    }
    &.common {
        background-image: url("./flag_common.png");
    }
    &.america {
        background-image: url("./flag_america.jpeg");
    }
    &.europe {
        background-image: url("./flag_europe.jpg");
    }
    &.netherlands {
        background-image: url("./flag_netherlands.jpeg");
    }
    &.spain {
        background-image: url("./flag_spain.jpeg");
    }
}
</style>
