<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import FilterItem from './FilterItem.vue'

import "swiper/css";
import { typesList, nationsList } from '../data/lists';
import { getAllShips } from '../data/queries';
import { ShipType, ShipsData, Nations, NationsFilter, ShipTypes, TypesFilter } from '../types/types';

const data = ref<ShipsData[]>([])

const filteredData = computed(() => {
    return data.value.filter(item => {
        return (
            Object.keys(typesFilter.value).some((type: ShipType) => {
                return typesFilter.value[type] && item.type.name === type
            }) &&
            Object.keys(nationsFilter.value).some((nation: Nations) => {
                return nationsFilter.value[nation] && item.nation.name === nation
            }) &&
            item.level >= levelFilter.value.min &&
            item .level <= levelFilter.value.max
        )
    });
});

const translateType = (type: ShipType) => {
    switch (type) {
        case ShipTypes.SUBMARINE:
            return 'субмарина'
        case ShipTypes.DESTROYER:
            return 'разрушитель'
        case ShipTypes.CRUISER:
            return 'крейсер'
        case ShipTypes.BATTLESHIP:
            return 'боевой корабль'
        case ShipTypes.AIRCARRIER:
            return 'авианосец'
        default:
            return ''
    }
}

const typesFilter = ref<TypesFilter>({
    submarine: true,
    destroyer: true,
    cruiser: true,
    battleship: true,
    aircarrier: true,
});

const nationsFilter = ref<NationsFilter>({
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

const fetchReq = (query: string) => {
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

onMounted(() => {
    fetchReq(getAllShips);
});
</script>

<template>
    <div class="container">
        <h1>список Кораблей</h1>

        <!-- Фильтры -->
        <div class="filters__wrap">
            <FilterItem type="types" title="Типы кораблей">
                <label class="checkbox" v-for="item in typesList" :for="item.name">
                    <input type="checkbox" 
                        v-model="typesFilter[item.name]"
                        :name="item.name" 
                        :id="item.name"
                    >
                    <span>{{ item.translate }}</span>
                </label>
            </FilterItem>

            <FilterItem type="nations" title="Нации">
                <label class="checkbox" v-for="item in nationsList" :for="item.name">
                    <input type="checkbox" 
                        v-model="nationsFilter[item.name]"
                        :name="item.name" 
                        :id="item.name"
                    >
                    <span>{{ item.translate }}</span>
                </label>
            </FilterItem>

            <FilterItem type="levels" title="Уровень">
                <div class="range-slider">
                    <span class="range-slider__number min">{{ levelFilter.min }}</span>
                    <span class="range-slider__number max">{{ levelFilter.max }}</span>
                    <input type="range" v-model="levelFilter.min" min="1" max="11" @input="setRangeSliderMin">
                    <input type="range" v-model="levelFilter.max" min="1" max="11" @input="setRangeSliderMax">
                </div>
            </FilterItem>
        </div>

        <!-- Список кораблей -->
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
