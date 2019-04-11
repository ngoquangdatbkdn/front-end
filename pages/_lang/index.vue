<template>
  <div class="Content">
    <div class="container">
      <h1 class="Content__Title">
        {{ $t('common.keyword') }}
      </h1>
      <p>{{ $t('common.all_major') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return { title: this.$t('home.title') }
  }
}
</script>


