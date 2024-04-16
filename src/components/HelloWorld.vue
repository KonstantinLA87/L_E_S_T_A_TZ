<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";

import "swiper/css";

const data = ref([]);

const filteredData = computed(() => {
    return data.value.filter(item => {
        for (const key in typesFilter.value) {
            if (typesFilter.value[key]) {
                return item.type.name === key
            }
        }
    })
})

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

const typesFilter = ref({
    submarine: true,
    destroyer: true,
    cruiser: true,
    battleship: true,
    aircarrier: true,
});

const countriesFilter = ref({
    japan: true,
    usa: true,
    ussr: true,
    germany: true,
    uk: true,
    france: true,
    asia: true,
    italy: true,
    common: true,
    america: true,
    europe: true,
    netherlands: true,
    spain: true,
});

onMounted(() => {
    fetchReq(query);
});
</script>

<template>
    <div class="container">
        <h1>Корабли</h1>
        <div class="filter__wrap">
            <label class="checkbox" v-for="item in typesList" :for="item.name">
                <input type="checkbox" 
                    v-model="typesFilter[item.name]"
                    :name="item.name" 
                    :id="item.name"
                >
                <span>{{ item.translate }}</span>
            </label>
        </div>

        <div class="filter__wrap">
            <label class="checkbox" v-for="item in countriesList" :for="item.name">
                <input type="checkbox" 
                    v-model="countriesFilter[item.name]"
                    :name="item.name" 
                    :id="item.name"
                >
                <span>{{ item.translate }}</span>
            </label>
        </div>

        <div class="flex">
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
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>
