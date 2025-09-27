<template>
  <v-card class="apartment-card h-100" rounded="lg" elevation="8">
    <div class="position-relative">
      <v-carousel
        v-if="apartment.images.length > 0"
        height="250"
        hide-delimiters
        show-arrows="hover"
      >
        <v-carousel-item
          v-for="(image, index) in apartment.images"
          :key="index"
          :src="image"
          cover
        />
      </v-carousel>
      
      <div class="position-absolute top-0 right-0 ma-3">
        <v-chip
          :color="conditionColors[apartment.condition]"
          variant="elevated"
          small
        >
          {{ apartment.condition }}
        </v-chip>
      </div>
      
      <div class="position-absolute bottom-0 left-0 ma-3">
        <v-chip color="success" variant="elevated">
          {{ formatPrice(apartment.price) }}
        </v-chip>
      </div>
    </div>

    <v-card-text class="pa-4">
      <h3 class="text-h6 font-weight-bold mb-2 text-truncate">
        {{ apartment.title }}
      </h3>
      
      <div class="d-flex align-center mb-2 text-body-2 text-medium-emphasis">
        <v-icon size="16" class="mr-1">mdi-map-marker</v-icon>
        {{ apartment.address }}, {{ apartment.district }}
      </div>

      <div class="d-flex align-center mb-3 text-body-2">
        <div class="d-flex align-center mr-4">
          <v-icon size="16" class="mr-1">mdi-home</v-icon>
          {{ apartment.rooms }} комн.
        </div>
        <div class="d-flex align-center mr-4">
          <v-icon size="16" class="mr-1">mdi-ruler-square</v-icon>
          {{ apartment.area }} м²
        </div>
        <div class="d-flex align-center">
          <v-icon size="16" class="mr-1">mdi-stairs</v-icon>
          {{ apartment.floor }}/{{ apartment.totalFloors }}
        </div>
      </div>

      <p class="text-body-2 text-medium-emphasis mb-3" style="height: 40px; overflow: hidden;">
        {{ apartment.description }}
      </p>

      <div class="d-flex flex-wrap gap-1 mb-3">
        <v-chip
          v-for="feature in apartment.features.slice(0, 3)"
          :key="feature"
          size="x-small"
          variant="outlined"
          color="primary"
        >
          {{ feature }}
        </v-chip>
        <v-chip
          v-if="apartment.features.length > 3"
          size="x-small"
          variant="outlined"
        >
          +{{ apartment.features.length - 3 }}
        </v-chip>
      </div>
    </v-card-text>

    <v-card-actions class="px-4 pb-4">
      <div class="d-flex align-center">
        <v-avatar size="32" class="mr-2">
          <span class="text-caption">{{ apartment.seller.name.charAt(0) }}</span>
        </v-avatar>
        <div class="text-body-2">
          <div class="font-weight-medium">{{ apartment.seller.name }}</div>
          <div class="text-medium-emphasis text-caption">Продавец</div>
        </div>
      </div>
      
      <v-spacer />
      
      <div class="d-flex gap-2">
        <v-btn
          icon
          variant="outlined"
          size="small"
          color="primary"
        >
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          variant="outlined"
          size="small"
          color="primary"
        >
          <v-icon>mdi-phone</v-icon>
        </v-btn>
        <v-btn
          variant="flat"
          size="small"
          color="primary"
        >
          Подробнее
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Apartment } from '../types'

/**
 * Интерфейс пропсов компонента карточки квартиры
 */
interface Props {
  apartment: Apartment
}

defineProps<Props>()

/**
 * Маппинг состояний квартир на цвета для отображения
 */
const conditionColors = {
  'новое': 'success',
  'хорошее': 'info',
  'требует ремонта': 'warning',
  'под снос': 'error'
}

/**
 * Форматирование цены для отображения в миллионах рублей
 * @param {number} price - Цена в рублях
 * @returns {string} Отформатированная строка с ценой
 */
const formatPrice = (price: number) => {
  return (price / 1000000).toFixed(1) + ' млн ₽'
}
</script>

<style scoped>
.apartment-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.apartment-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
}

.gap-1 {
  gap: 0.25rem;
}

.gap-2 {
  gap: 0.5rem;
}
</style>