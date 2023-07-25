<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import {useSanityQuery} from "#imports";

const { data } = useSanityQuery(`*[_type == 'product']`)
console.log(data.value)
</script>

<style>

</style>
