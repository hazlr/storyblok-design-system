<template>
  <div class="sb-sidebar-link-inner">
    <SbAvatar v-if="hasAvatar" v-bind="avatar" />

    <SbIcon v-else-if="hasIcon" :size="iconSize" :name="icon" />

    <div v-if="hasSeparator" class="sb-separator"></div>

    <span class="sb-sidebar-link__label">
      {{ label }}
    </span>

    <SbIcon
      v-if="iconRight"
      :size="iconRightSize"
      :name="iconRight"
      class="sb-icon__right"
    />
  </div>
</template>

<script>
import SbAvatar from '../../Avatar'
import SbIcon from '../../Icon'

export default {
  components: { SbAvatar, SbIcon },

  props: {
    avatar: {
      type: Object,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    iconSize: {
      type: String,
      default: 'normal',
    },
    iconRight: {
      type: String,
      default: null,
    },
    iconRightSize: {
      type: String,
      default: 'normal',
    },
    hasSeparator: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    hasAvatar() {
      return this.avatar !== null
    },

    hasIcon() {
      return this.icon
    },
  },
}
</script>
