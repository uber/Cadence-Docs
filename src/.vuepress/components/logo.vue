<script>
export default {
  name: 'logo',
  props: {
    href: {
      type: String,
    },
    label: {
      type: String,
      default: 'Cadence Slack Workspace',
    },
    img: {
      type: String,
    },
    width: {
      type: String,
    }
  },
};
</script>

<template>
<a
  class="logo"
  :href="href"
  target="_blank"
  rel="noopener noreferrer"
  :title="label"
  v-if="img"
>
  <img :src="img" :width="width" />
</a>
<a
  class="logo-text"
  :href="href"
  target="_blank"
  rel="noopener noreferrer"
  v-else
>{{label}}</a>
</template>
