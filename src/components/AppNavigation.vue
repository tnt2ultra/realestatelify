<template>
  <div>
    <!-- Mobile App Bar -->
    <v-app-bar
      v-if="mobile"
      color="primary"
      density="compact"
      flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>RealEstate AI</v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="!userStore.isAuthenticated"
        icon="mdi-login"
        @click="$router.push('/login')"
      />
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :permanent="!mobile"
      :temporary="mobile"
      color="surface"
      width="280"
    >
      <div class="px-4 py-6">
        <div class="d-flex align-center mb-6">
          <v-icon color="primary" size="32" class="mr-3">mdi-home-city</v-icon>
          <div>
            <h2 class="text-primary">RealEstate</h2>
            <p class="text-caption text-medium-emphasis">AI Platform</p>
          </div>
        </div>

        <v-list nav>
          <v-list-item
            v-for="item in navigationItems"
            :key="item.to"
            :to="item.to"
            :prepend-icon="item.icon"
            :title="item.title"
            color="primary"
            rounded="xl"
            class="mb-2"
          />
        </v-list>

        <v-divider class="my-4" />

        <div v-if="userStore.isAuthenticated" class="px-2">
          <div class="d-flex align-center mb-3">
            <v-avatar color="primary" size="40" class="mr-3">
              <span class="text-white">{{ userStore.user?.name?.charAt(0) }}</span>
            </v-avatar>
            <div>
              <p class="font-weight-medium">{{ userStore.user?.name }}</p>
              <p class="text-caption text-medium-emphasis">
                {{ userStore.user?.userType === 'seller' ? 'Продавец' : 'Покупатель' }}
              </p>
            </div>
          </div>
          
          <v-btn
            color="error"
            variant="outlined"
            block
            prepend-icon="mdi-logout"
            @click="handleLogout"
          >
            Выйти
          </v-btn>
        </div>

        <div v-else class="px-2">
          <v-btn
            color="primary"
            variant="flat"
            block
            prepend-icon="mdi-login"
            @click="$router.push('/login')"
          >
            Войти
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const { mobile } = useDisplay()
const router = useRouter()
const userStore = useUserStore()
const drawer = ref(!mobile.value)

/**
 * Вычисляемое свойство для формирования навигационного меню
 * Меню адаптируется в зависимости от статуса аутентификации и типа пользователя
 */
const navigationItems = computed(() => [
  { title: 'Главная', icon: 'mdi-home', to: '/' },
  { title: 'Объявления', icon: 'mdi-view-list', to: '/listings' },
  { title: 'ИИ Оценка', icon: 'mdi-calculator', to: '/valuation' },
  // Условные пункты меню для аутентифицированных пользователей
  ...(userStore.isAuthenticated 
    ? [
        { title: 'Профиль', icon: 'mdi-account', to: '/profile' },
        // Пункт "Создать объявление" только для продавцов
        ...(userStore.user?.userType === 'seller' 
          ? [{ title: 'Создать объявление', icon: 'mdi-plus', to: '/create' }]
          : []
        )
      ]
    : []
  )
])

/**
 * Обработчик выхода из системы
 * Выполняет logout и перенаправляет на главную страницу
 */
const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>