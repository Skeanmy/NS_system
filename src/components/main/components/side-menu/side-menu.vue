<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`"><common-icon :type="item.children[0].icon || ''"/><span>{{ showTitle(item.children[0]) }}</span></menu-item>
        </template>
        <template v-else>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><common-icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
        </template>
      </template>
    </Menu>
  </div>
</template>
<script>
import SideMenuItem from './side-menu-item.vue'
// import CollapsedMenu from './collapsed-menu.vue'
import { getUnion } from '@/libs/tools'
import mixin from './mixin'

export default {
  name: 'SideMenu',
  mixins: [ mixin ],
  components: {
    SideMenuItem,
    // CollapsedMenu
  },
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
   // 是否显示小菜单栏
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'dark'
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
    // 可折叠
    accordion: Boolean,
    // 可以选中指定的菜单
    activeName: {
      type: String,
      default: ''
    },
    // 可以展开指定的子菜单
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      openedNames: []
    }
  },
  methods: {
    handleSelect (name) {
      this.$emit('on-select', name)
    }
  },
  computed: {
   
  },
  watch: {
    
  },
  mounted () {
  }
}
</script>
<style lang="less">
@import './side-menu.less';
</style>
