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

<style lang="stylus">
.logo {
  display: flex;
  margin: auto 15px;

  &:hover {
    opacity: 0.6;
  }
}

.logo-text {
  display: flex;
  font-weight: 1000;
  font-size: 30px;
  line-height: 100px;
  margin: 0 15px;

  &:hover {
    opacity: 0.6;
    text-decoration: underline;
  }
}
</style>