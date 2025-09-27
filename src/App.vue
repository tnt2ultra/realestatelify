<template>
  <v-app>
    <AppNavigation />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from './stores/user'
import AppNavigation from './components/AppNavigation.vue'

const userStore = useUserStore()

/**
 * Инициализация приложения
 * Восстанавливает состояние аутентификации при загрузке
 */
onMounted(() => {
  userStore.initializeAuth()
})
</script>