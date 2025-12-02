# Сравнение навигации: React Navigation vs Expo Router

## 1. React Navigation (Stack.Navigator, Stack.Screen)

### Подход: Декларативный - вы явно описываете структуру навигации

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Главная' }}
        />
        <Stack.Screen 
          name="Category" 
          component={CategoryScreen}
          options={{ title: 'Категория' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Особенности:
- ✅ Полный контроль над навигацией
- ✅ Явное определение всех экранов
- ✅ Гибкая настройка опций для каждого экрана
- ❌ Больше кода для написания
- ❌ Нужно вручную управлять маршрутами
- ❌ Нет автоматической типизации маршрутов

---

## 2. Expo Router (файловая маршрутизация)

### Подход: Файловая структура автоматически создает маршруты

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

### Структура файлов:
```
app/
  _layout.tsx          → Корневой layout
  (tabs)/
    index.tsx          → / (главная)
  category/
    [id].tsx           → /category/:id
```

### Особенности:
- ✅ Автоматическое создание маршрутов из файлов
- ✅ Меньше кода
- ✅ Типизация маршрутов (с typed routes)
- ✅ Deep linking из коробки
- ✅ Похоже на Next.js (если знакомы)
- ⚠️ Меньше контроля над структурой навигации
- ⚠️ Нужно понимать файловую структуру

---

## 3. Гибридный подход: Stack.Screen в Expo Router

### Можно комбинировать оба подхода!

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Автоматические маршруты из файлов */}
      
      {/* Но можно явно настроить конкретные экраны */}
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="category/[id]" 
        options={{ 
          title: 'Категория',
          presentation: 'modal' // Модальное окно
        }} 
      />
    </Stack>
  );
}
```

### Или в самом компоненте экрана:

```tsx
// app/category/[id].tsx
import { Stack } from 'expo-router';

export default function CategoryScreen() {
  return (
    <>
      {/* Настройка опций для этого экрана */}
      <Stack.Screen 
        options={{ 
          title: 'Детали категории',
          headerShown: true 
        }} 
      />
      <View>
        {/* Контент экрана */}
      </View>
    </>
  );
}
```

---

## Сравнительная таблица:

| Критерий | React Navigation | Expo Router |
|----------|------------------|-------------|
| **Подход** | Декларативный (JSX) | Файловая структура |
| **Код** | Больше кода | Меньше кода |
| **Контроль** | Полный контроль | Автоматизация |
| **Типизация** | Ручная | Автоматическая |
| **Deep Linking** | Нужно настраивать | Из коробки |
| **Сложность** | Средняя | Низкая |
| **Гибкость** | Высокая | Средняя-Высокая |

---

## Когда что использовать:

### React Navigation (Stack.Navigator):
- ✅ Нужен полный контроль над навигацией
- ✅ Сложная логика навигации
- ✅ Не используете Expo Router
- ✅ Нужна кастомная настройка каждого экрана

### Expo Router:
- ✅ Используете Expo
- ✅ Хотите меньше кода
- ✅ Нужна автоматическая типизация
- ✅ Нужен deep linking
- ✅ Знакомы с Next.js

### Гибридный подход (Stack.Screen в Expo Router):
- ✅ Используете Expo Router
- ✅ Нужно настроить конкретные экраны
- ✅ Хотите модальные окна, кастомные заголовки и т.д.

---

## Примеры использования Stack.Screen в Expo Router:

### 1. Настройка опций экрана в _layout.tsx:

```tsx
<Stack>
  <Stack.Screen 
    name="(tabs)" 
    options={{ headerShown: false }} 
  />
  <Stack.Screen 
    name="category/[id]" 
    options={{ 
      title: 'Категория',
      headerStyle: { backgroundColor: '#f4511e' },
      headerTintColor: '#fff',
    }} 
  />
</Stack>
```

### 2. Динамическая настройка в компоненте:

```tsx
import { Stack, useLocalSearchParams } from 'expo-router';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: `Категория ${id}`,
        }} 
      />
      {/* Контент */}
    </>
  );
}
```

### 3. Модальные окна:

```tsx
<Stack.Screen 
  name="modal" 
  options={{ 
    presentation: 'modal',
    headerShown: true 
  }} 
/>
```

---

## Вывод:

**Expo Router** использует файловую маршрутизацию, но **внутри** использует React Navigation!
`Stack` из `expo-router` - это обертка над React Navigation.

Вы можете использовать `Stack.Screen` для тонкой настройки, но основная структура создается автоматически из файлов.

**Рекомендация**: Используйте Expo Router с файловой структурой, но добавляйте `Stack.Screen` там, где нужна кастомная настройка конкретных экранов.

