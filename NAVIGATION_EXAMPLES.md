# Навигация в Expo Router

## Основные способы навигации:

### 1. Программная навигация через `useRouter`

```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

// Переход на страницу
router.push('/category/123');

// Замена текущей страницы (без возможности вернуться назад)
router.replace('/login');

// Назад
router.back();

// Переход на главную
router.push('/(tabs)');
```

### 2. Декларативная навигация через `Link`

```typescript
import { Link } from 'expo-router';
import { Text } from 'react-native';

<Link href="/category/123">
  <Text>Перейти к категории</Text>
</Link>
```

### 3. Получение параметров маршрута

```typescript
import { useLocalSearchParams } from 'expo-router';

const { id } = useLocalSearchParams<{ id: string }>();
```

### 4. Методы навигации:

- `router.push(path)` - добавить новый экран в стек
- `router.replace(path)` - заменить текущий экран
- `router.back()` - вернуться назад
- `router.canGoBack()` - проверить, можно ли вернуться назад
- `router.dismiss()` - закрыть модальное окно
- `router.dismissAll()` - закрыть все модальные окна

### 5. Файловая структура маршрутов:

```
app/
  _layout.tsx          → Корневой layout
  (tabs)/
    index.tsx          → / (главная)
  category/
    [id].tsx           → /category/:id (динамический маршрут)
```

### 6. Stack навигация работает автоматически!

Expo Router автоматически создает Stack навигацию на основе структуры папок.
Не нужно создавать NavigationContainer вручную!

