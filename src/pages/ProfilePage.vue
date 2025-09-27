<template>
  <div class="profile-page">
    <v-container class="py-8">
      <div class="text-center mb-8">
        <h1 class="text-h3 font-weight-bold text-white mb-4">
          Профиль пользователя
        </h1>
      </div>

      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card v-if="user" rounded="lg" elevation="12">
            <v-card-title class="pa-6">
              <v-avatar color="primary" size="56" class="mr-4">
                <span class="text-h5 text-white">{{ user.name.charAt(0) }}</span>
              </v-avatar>
              <div>
                <h2 class="text-h5">{{ user.name }}</h2>
                <p class="text-body-1 text-medium-emphasis">
                  {{ user.userType === 'seller' ? 'Продавец' : 'Покупатель' }}
                </p>
              </div>
            </v-card-title>

            <v-divider />

            <v-card-text class="pa-6">
              <v-list-item>
                <template #prepend>
                  <v-icon color="primary">mdi-email</v-icon>
                </template>
                <v-list-item-title>{{ user.email }}</v-list-item-title>
                <v-list-item-subtitle>Email</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template #prepend>
                  <v-icon color="primary">mdi-calendar</v-icon>
                </template>
                <v-list-item-title>{{ new Date(user.createdAt).toLocaleDateString() }}</v-list-item-title>
                <v-list-item-subtitle>Дата регистрации</v-list-item-subtitle>
              </v-list-item>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Объявления продавца -->
      <v-row v-if="user?.userType === 'seller' && userApartments.length > 0" justify="center" class="mt-8">
        <v-col cols="12" md="10">
          <h2 class="text-h4 font-weight-bold text-white mb-6 text-center">
            Ваши объявления
          </h2>
          <v-row>
            <v-col
              v-for="apartment in userApartments"
              :key="apartment.id"
              cols="12"
              md="6"
            >
              <ApartmentCard :apartment="apartment" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row v-else-if="user?.userType === 'seller'" justify="center" class="mt-8">
        <v-col cols="12" md="8" class="text-center">
          <v-card rounded="lg" elevation="12" class="pa-8">
            <v-icon color="grey" size="64" class="mb-4">mdi-home-plus-outline</v-icon>
            <h3 class="text-h6">У вас пока нет объявлений</h3>
            <p class="text-medium-emphasis mb-4">Начните продавать свою недвижимость прямо сейчас!</p>
            <v-btn color="primary" to="/create">Создать объявление</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useApartmentsStore } from '../stores/apartments'
import ApartmentCard from '../components/ApartmentCard.vue'

const router = useRouter()
const userStore = useUserStore()
const apartmentsStore = useApartmentsStore()

const user = computed(() => userStore.user)

const userApartments = computed(() => {
  if (user.value?.userType === 'seller') {
    return apartmentsStore.apartments.filter(apt => apt.sellerId === user.value?.id)
  }
  return []
})

onMounted(() => {
  if (!userStore.isAuthenticated) {
    router.push('/login')
  }
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
}
</style>
