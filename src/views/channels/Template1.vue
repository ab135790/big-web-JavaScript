<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <List/>
      </div>
      <div class="layui-col-md4">
        <HotList/>
        <Ads/>
        <Links/>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import List from '@/components/contents/List'
export default {
  name: 'Template1',
  components: {
    HotList,
    Ads,
    Links,
    List
  }
}
</script>

<style lang="scss" scoped>

</style>
