<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <Top/>
        <List/>
      </div>
      <div class="layui-col-md4">
        <Tips/>
        <Sign/>
        <HotList/>
        <Ads/>
        <Links/>
      </div>
    </div>
  </div>
</template>

<script>
import Tips from '@/components/sidebar/Tips'
import Sign from '@/components/sidebar/Sign'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import List from '@/components/contents/List'
import Top from '@/components/contents/Top'
export default {
  name: 'index',
  components: {
    Tips,
    Sign,
    HotList,
    Ads,
    Links,
    List,
    Top
  }
}
</script>

<style lang="scss" scoped>

</style>
