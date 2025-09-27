<template>
  <div class="login-page">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12" rounded="lg">
            <v-card-title class="text-center pa-6">
              <v-icon color="primary" size="48" class="mb-4">mdi-home-city</v-icon>
              <h2 class="text-h4 font-weight-bold">
                {{ isLogin ? 'Вход' : 'Регистрация' }}
              </h2>
            </v-card-title>

            <v-card-text class="pa-6">
              <v-form ref="form" @submit.prevent="handleSubmit">
                <v-text-field
                  v-if="!isLogin"
                  v-model="name"
                  label="Имя"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  :rules="nameRules"
                  class="mb-4"
                />

                <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  prepend-inner-icon="mdi-email"
                  variant="outlined"
                  :rules="emailRules"
                  class="mb-4"
                />

                <v-text-field
                  v-model="password"
                  label="Пароль"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-inner-icon="mdi-lock"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  variant="outlined"
                  :rules="passwordRules"
                  @click:append-inner="showPassword = !showPassword"
                  class="mb-4"
                />

                <v-radio-group
                  v-if="!isLogin"
                  v-model="userType"
                  label="Тип пользователя"
                  inline
                  class="mb-4"
                >
                  <v-radio label="Покупатель" value="buyer" />
                  <v-radio label="Продавец" value="seller" />
                </v-radio-group>

                <v-btn
                  type="submit"
                  color="primary"
                  size="large"
                  block
                  variant="flat"
                  :loading="loading"
                  class="mb-4"
                >
                  {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
                </v-btn>

                <div class="text-center">
                  <v-btn
                    variant="text"
                    @click="isLogin = !isLogin"
                  >
                    {{ isLogin ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти' }}
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

// Реактивные переменные состояния формы
const isLogin = ref(true)
const loading = ref(false)
const showPassword = ref(false)
const form = ref()

// Поля формы
const name = ref('')
const email = ref('')
const password = ref('')
const userType = ref<'buyer' | 'seller'>('buyer')

// Правила валидации для полей формы
const nameRules = [
  (v: string) => !!v || 'Имя обязательно',
  (v: string) => (v && v.length >= 2) || 'Имя должно содержать минимум 2 символа'
]

const emailRules = [
  (v: string) => !!v || 'Email обязателен',
  (v: string) => /.+@.+\..+/.test(v) || 'Email должен быть валидным'
]

const passwordRules = [
  (v: string) => !!v || 'Пароль обязателен',
  (v: string) => (v && v.length >= 6) || 'Пароль должен содержать минимум 6 символов'
]

/**
 * Обработчик отправки формы входа/регистрации
 * Выполняет валидацию и вызывает соответствующий метод из store
 */
const handleSubmit = async () => {
  // Валидация формы перед отправкой
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true

  try {
    if (isLogin.value) {
      // Вход в систему
      await userStore.login(email.value, password.value, userType.value)
    } else {
      // Регистрация нового пользователя
      await userStore.register(email.value, password.value, name.value, userType.value)
    }
    
    // Перенаправление на главную страницу после успешной аутентификации
    router.push('/')
  } catch (error) {
    console.error('Ошибка аутентификации:', error)
    // В реальном приложении здесь должно быть отображение ошибки пользователю
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>