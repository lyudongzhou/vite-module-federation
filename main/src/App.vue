<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent } from "vue";
import { ElContainer, ElHeader, ElAside, ElMain, ElMenu, ElMenuItem, ElIcon } from 'element-plus';
import { Menu as IconMenu } from "@element-plus/icons-vue"

</script>

<template>
  <div class="common-layout">
    <el-container :style="{ height: '100%' }">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1" class="el-menu-vertical-demo">
            <router-link to="/">
              <el-menu-item index="1">
                <el-icon>
                  <icon-menu />
                </el-icon>
                <template #title>Local</template>
              </el-menu-item>
            </router-link>
            <router-link to="/project1">
              <el-menu-item index="2">
                <el-icon>
                  <icon-menu />
                </el-icon>
                <template #title>project1</template>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less">
.el-menu-vertical-demo {
  height: 100%
}

.common-layout {
  height: 100%
}
</style>
