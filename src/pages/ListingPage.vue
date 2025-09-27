<template>
  <div class="listing-page">
    <v-container class="py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-h3 font-weight-bold text-white mb-4">
          Объявления о продаже
        </h1>
        <p class="text-h6 text-white opacity-90">
          Найдите идеальную квартиру среди {{ apartments.length }} предложений
        </p>
      </div>

      <!-- Filters -->
      <v-card class="mb-6" rounded="lg" elevation="8">
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                v-model="filters.search"
                label="Поиск по адресу"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                clearable
              />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="filters.district"
                :items="districts"
                label="Район"
                prepend-inner-icon="mdi-map-marker"
                variant="outlined"
                density="compact"
                clearable
              />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="filters.rooms"
                :items="roomOptions"
                label="Количество комнат"
                prepend-inner-icon="mdi-home"
                variant="outlined"
                density="compact"
                clearable
              />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="filters.priceRange"
                :items="priceRanges"
                label="Цена"
                prepend-inner-icon="mdi-currency-rub"
                variant="outlined"
                density="compact"
                clearable
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Listings Grid -->
      <v-row>
        <v-col
          v-for="apartment in apartments"
          :key="apartment.id"
          cols="12"
          md="6"
          lg="4"
          class="mb-6"
        >
          <ApartmentCard :apartment="apartment" />
        </v-col>
      </v-row>

      <!-- Empty State -->
      <div v-if="apartments.length === 0" class="text-center py-12">
        <v-icon color="white" size="64" class="mb-4">mdi-home-search</v-icon>
        <h2 class="text-h5 text-white mb-2">Объявления не найдены</h2>
        <p class="text-body-1 text-white opacity-75">
          Попробуйте изменить фильтры поиска
        </p>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useApartmentsStore } from '../stores/apartments'
import ApartmentCard from '../components/ApartmentCard.vue'

const apartmentsStore = useApartmentsStore()

// Реактивный объект с фильтрами поиска
const filters = ref({
  search: '',
  district: null,
  rooms: null,
  priceRange: null
})

// Справочные данные для фильтров
const districts = [
  'Тверской',
  'Мещанский', 
  'Хамовники',
  'Арбат',
  'Таганский',
  'Замоскворечье'
]

const roomOptions = [1, 2, 3, 4, '5+']

const priceRanges = [
  { title: 'До 5 млн', value: 'under-5' },
  { title: '5-10 млн', value: '5-10' },
  { title: '10-15 млн', value: '10-15' },
  { title: '15+ млн', value: 'over-15' }
]

/**
 * Вычисляемое свойство для фильтрации квартир
 * Применяет все активные фильтры к списку квартир
 */
const apartments = computed(() => {
  let filtered = apartmentsStore.apartments

  // Фильтр по тексту поиска (адрес, район, заголовок)
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(apt => 
      apt.address.toLowerCase().includes(search) ||
      apt.district.toLowerCase().includes(search) ||
      apt.title.toLowerCase().includes(search)
    )
  }

  // Фильтр по району
  if (filters.value.district) {
    filtered = filtered.filter(apt => apt.district === filters.value.district)
  }

  // Фильтр по количеству комнат
  if (filters.value.rooms) {
    const rooms = filters.value.rooms
    if (rooms === '5+') {
      filtered = filtered.filter(apt => apt.rooms >= 5)
    } else {
      filtered = filtered.filter(apt => apt.rooms === rooms)
    }
  }

  // Фильтр по ценовому диапазону
  if (filters.value.priceRange) {
    const range = filters.value.priceRange
    filtered = filtered.filter(apt => {
      const price = apt.price / 1000000 // в млн
      switch (range) {
        case 'under-5': return price < 5
        case '5-10': return price >= 5 && price < 10
        case '10-15': return price >= 10 && price < 15
        case 'over-15': return price >= 15
        default: return true
      }
    })
  }

  return filtered
})
</script>

<style scoped>
.listing-page {
  min-height: 100vh;
}
</style>