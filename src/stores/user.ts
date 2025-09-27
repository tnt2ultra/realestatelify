import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types'

/**
 * Хранилище для управления пользователями и аутентификацией
 * Использует Pinia для централизованного управления состоянием
 */
export const useUserStore = defineStore('user', () => {
  // Реактивное состояние текущего пользователя
  const user = ref<User | null>(null)
  
  // Вычисляемое свойство для проверки аутентификации
  const isAuthenticated = computed(() => !!user.value)

  /**
   * Функция входа в систему
   * @param {string} email - Email пользователя
   * @param {string} password - Пароль пользователя  
   * @param {'buyer' | 'seller'} userType - Тип пользователя
   * @returns {Promise<boolean>} Результат операции входа
   */
  const login = async (email: string, password: string, userType: 'buyer' | 'seller') => {
    // Симуляция API запроса с задержкой
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Простая валидация email
    if (!email || !email.includes('@')) {
      throw new Error('Некорректный email адрес')
    }
    
    if (!password || password.length < 6) {
      throw new Error('Пароль должен содержать минимум 6 символов')
    }
    
    // Создание объекта пользователя
    user.value = {
      id: '1',
      email,
      name: email.split('@')[0],
      userType,
      createdAt: new Date()
    }
    
    // Сохранение в localStorage для персистентности
    localStorage.setItem('user', JSON.stringify(user.value))
    return true
  }

  /**
   * Функция регистрации нового пользователя
   * @param {string} email - Email пользователя
   * @param {string} password - Пароль пользователя
   * @param {string} name - Имя пользователя
   * @param {'buyer' | 'seller'} userType - Тип пользователя
   * @returns {Promise<boolean>} Результат операции регистрации
   */
  const register = async (email: string, password: string, name: string, userType: 'buyer' | 'seller') => {
    // Симуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Валидация входных данных
    if (!email || !email.includes('@')) {
      throw new Error('Некорректный email адрес')
    }
    
    if (!password || password.length < 6) {
      throw new Error('Пароль должен содержать минимум 6 символов')
    }
    
    if (!name || name.trim().length < 2) {
      throw new Error('Имя должно содержать минимум 2 символа')
    }
    
    // Создание нового пользователя
    user.value = {
      id: Math.random().toString(36),
      email,
      name,
      userType,
      createdAt: new Date()
    }
    
    // Сохранение в localStorage
    localStorage.setItem('user', JSON.stringify(user.value))
    return true
  }

  /**
   * Функция выхода из системы
   * Очищает состояние пользователя и localStorage
   */
  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  /**
   * Инициализация аутентификации при загрузке приложения
   * Восстанавливает состояние пользователя из localStorage
   */
  const initializeAuth = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        // Проверяем, что объект содержит необходимые поля
        if (parsedUser && parsedUser.id && parsedUser.email) {
          user.value = {
            ...parsedUser,
            createdAt: new Date(parsedUser.createdAt)
          }
        }
      } catch (error) {
        console.error('Ошибка при восстановлении пользователя:', error)
        localStorage.removeItem('user')
      }
    }
  }

  // Возвращаем публичный API хранилища
  return {
    user: computed(() => user.value),
    isAuthenticated,
    login,
    register,
    logout,
    initializeAuth
  }
})