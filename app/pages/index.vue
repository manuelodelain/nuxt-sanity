<script setup lang="ts">
const query = groq`*[_type=='home']{
  ...,
  modules[]{
    ...,
    productWithVariant{
      ...,
      'title': product->store.title,
      'previewImageUrl': product->store.previewImageUrl,
      'slug': product->store.slug.current
    }
  }
}[0]`;
const {data} = await useSanityQuery(query)
const {hero, modules} = data.value
const products = modules.filter(module => 'productWithVariant' in module)

</script>

<template>
  <h1>{{ hero.title }}</h1>
  <section>
    <div v-for="product in products">
      <a :href="`/product/${product.productWithVariant.slug}`"><img :src="product.productWithVariant.previewImageUrl" /></a>
      <a :href="`/product/${product.productWithVariant.slug}`">{{ product.productWithVariant.title }}</a>
    </div>
  </section>
</template>
