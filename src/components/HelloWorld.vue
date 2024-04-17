<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";

import "swiper/css";

const data = ref([])

const filteredData = computed(() => {
    return data.value.filter(item => {
        return (
            Object.keys(typesFilter.value).some(type => {
                return typesFilter.value[type] && item.type.name === type
            }) &&
            Object.keys(nationsFilter.value).some(nation => {
                return nationsFilter.value[nation] && item.nation.name === nation
            }) &&
            item.level >= levelFilter.value.min &&
            item .level <= levelFilter.value.max
        )
    });
});

const fetchReq = (query: any) => {
    return fetch("https://vortex.korabli.su/api/graphql/glossary/", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ query }),
    })
        .then((res) => res.json())
        .then((res) => (data.value = res.data.vehicles));
};

const query = `query All {
    vehicles {
        title
        name
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

const translateType = (type) => {
    switch (type) {
        case 'submarine':
            return 'субмарина'
        case 'destroyer':
            return 'разрушитель'
        case 'cruiser':
            return 'крейсер'
        case 'battleship':
            return 'боевой корабль'
        case 'aircarrier':
            return 'авианосец'
        default:
            return ''
    }
}

const typesList = [
    {
        name: 'submarine',
        translate: 'Субмарина',
    },
    {
        name: 'destroyer',
        translate: 'Разрушитель',
    },
    {
        name: 'cruiser',
        translate: 'Крейсер',
    },
    {
        name: 'battleship',
        translate: 'Боевой корабль',
    },
    {
        name: 'aircarrier',
        translate: 'Авианосец',
    },
]

const nationsList = [
    {
        name: 'japan',
        translate: 'Япония',
    },
    {
        name: 'usa',
        translate: 'США',
    },
    {
        name: 'ussr',
        translate: 'СССР',
    },
    {
        name: 'germany',
        translate: 'Германия',
    },
    {
        name: 'uk',
        translate: 'Британия',
    },
    {
        name: 'france',
        translate: 'Франция',
    },
    {
        name: 'pan_asia',
        translate: 'Азия',
    },
    {
        name: 'italy',
        translate: 'Италия',
    },
    {
        name: 'commonwealth',
        translate: 'Общий',
    },
    {
        name: 'pan_america',
        translate: 'Америка',
    },
    {
        name: 'europe',
        translate: 'Европа',
    },
    {
        name: 'netherlands',
        translate: 'Нидерланды',
    },
    {
        name: 'spain',
        translate: 'Испания',
    },
]

const typesFilter = ref({
    submarine: true,
    destroyer: true,
    cruiser: true,
    battleship: true,
    aircarrier: true,
});

const nationsFilter = ref({
    japan: true,
    usa: true,
    ussr: true,
    germany: true,
    uk: true,
    france: true,
    pan_asia: true,
    italy: true,
    commonwealth: true,
    pan_america: true,
    europe: true,
    netherlands: true,
    spain: true,
});

const levelFilter = ref({
    min: 1,
    max: 11,
})

const setRangeSliderMin = () => {
    if (levelFilter.value.min > levelFilter.value.max) {
        levelFilter.value.min = levelFilter.value.max
    }
}
const setRangeSliderMax = () => {
    if (levelFilter.value.max < levelFilter.value.min) {
        levelFilter.value.max = levelFilter.value.min
    }
}

const isTypesFilterShow = ref(false)
const isNationsFilterShow = ref(false)
const isLevelsFilterShow = ref(false)

onMounted(() => {
    fetchReq(query);
});
</script>

<template>
    <div class="container">
        <h1>список Кораблей</h1>
        <div class="filters__wrap">
            <div class="filters__item filters__item--types">
                <span class="filters__item-title">Типы кораблей</span>
                <label class="checkbox" v-for="item in typesList" :for="item.name">
                    <input type="checkbox" 
                        v-model="typesFilter[item.name]"
                        :name="item.name" 
                        :id="item.name"
                    >
                    <span>{{ item.translate }}</span>
                </label>
            </div>
    
            <div class="filters__item filters__item--nations">
                <span class="filters__item-title">Нации</span>
                <label class="checkbox" v-for="item in nationsList" :for="item.name">
                    <input type="checkbox" 
                        v-model="nationsFilter[item.name]"
                        :name="item.name" 
                        :id="item.name"
                    >
                    <span>{{ item.translate }}</span>
                </label>
            </div>
    
            <div class="filters__item filters__item--level">
                <span class="filters__item-title">Уровень</span>
                <div class="range-slider">
                    <span class="range-slider__number min">{{ levelFilter.min }}</span>
                    <span class="range-slider__number max">{{ levelFilter.max }}</span>
                    <input type="range" v-model="levelFilter.min" min="1" max="11" @input="setRangeSliderMin">
                    <input type="range" v-model="levelFilter.max" min="1" max="11" @input="setRangeSliderMax">
                </div>
            </div>
        </div>

        <div class="flex">
            <template v-if="filteredData.length">
                <div
                    v-for="item in filteredData"
                    class="item"
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
                    :key="item.icons.large"
                >
                    <img class="item__img" :src="`https:${item.icons.medium}`" alt="" />
                    <p class="p-level">Ур. {{ item.level }}</p>
                    <p class="p-title">{{ item.name.slice(8).replace('_', ' ') }}</p>
                    <p class="p-type">{{ translateType(item.type.name) }}</p>
                    <p class="p-overview__title">Описание</p>
                    <p class="p-overview">Если бы здесь было описание, то оно бы не помещалось...</p>
                </div>
            </template>
            <template v-else>
                <h2>Нет результатов</h2>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>
