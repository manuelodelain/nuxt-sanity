<script setup lang="ts">
const route = useRoute()
const query = groq`*[
  _type=='product'
  && store.slug.current == 'funny-garden-gnome'
 ]{
  store{
    ...,
    title,
    previewImageUrl,
      descriptionHtml,
      priceRange,
      variants[]->
  }
 }[0]`;
const {data} = await useSanityQuery(query)
const { title, previewImageUrl, variants } = data.value.store
const { addLineItems } = useCart()

</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <img :src="previewImageUrl" />
    <button @click="addLineItems([{variantId: variants[0].store.gid, quantity: 1}])">Add to cart</button>
  </div>
</template>
