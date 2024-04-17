<script setup lang="ts">
interface Props {
    type: string
    title: number
}

const props = defineProps<Props>()
</script>

<template>
    <div 
        class="filters__item"
        :class="{
            'filters__item--types': props.type === 'types',
            'filters__item--nations': props.type === 'nations',
            'filters__item--levels': props.type === 'levels',
        }"
    >
        <span class="filters__item-title">{{ props.title }}</span>
        <slot />
    </div>
</template>