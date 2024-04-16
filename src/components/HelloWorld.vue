<script setup lang="ts">
import { ref, onMounted } from 'vue';

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
  <div class="flex">
    <div v-for="item in data">
      <img :src="`https:${item.icons.medium}`" alt="">
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  max-width: 100vw;
}
</style>
