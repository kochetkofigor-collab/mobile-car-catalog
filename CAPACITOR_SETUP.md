# Инструкция по настройке Capacitor для Android APK

## ✅ Уже установлено

- `@capacitor/core` - ядро Capacitor
- `@capacitor/cli` - инструменты командной строки
- `@capacitor/android` - платформа Android
- `capacitor.config.ts` - конфигурация приложения

## 📝 Шаги для создания APK

### 1. Скачайте проект через GitHub
В редакторе poehali.dev: **Скачать → Подключить GitHub** → скачайте репозиторий на компьютер

### 2. Установите зависимости
```bash
npm install
# или
bun install
```

### 3. Инициализируйте Capacitor (если еще не сделано)
```bash
npx cap init "Car Showroom" "com.carshowroom.app"
```

### 4. Добавьте платформу Android
```bash
npx cap add android
```

### 5. Соберите веб-проект
```bash
npm run build
```

### 6. Синхронизируйте с Android
```bash
npx cap sync android
```

### 7. Откройте проект в Android Studio
```bash
npx cap open android
```

### 8. Создайте APK в Android Studio
1. Дождитесь окончания синхронизации Gradle
2. **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. После сборки нажмите **locate** чтобы найти APK файл
4. APK будет в папке: `android/app/build/outputs/apk/debug/app-debug.apk`

## 🔧 Полезные команды

```bash
# Пересобрать и синхронизировать
npm run build && npx cap sync

# Только скопировать изменения
npx cap copy

# Обновить плагины
npx cap update

# Посмотреть статус
npx cap doctor
```

## 📱 Установка APK на телефон

1. Скопируйте `app-debug.apk` на телефон
2. Откройте файл на телефоне
3. Разрешите установку из неизвестных источников
4. Установите приложение

## ⚙️ Настройка приложения (опционально)

Отредактируйте `capacitor.config.ts`:

```typescript
const config: CapacitorConfig = {
  appId: 'com.yourcompany.yourapp', // измените ID
  appName: 'Your App Name',          // измените название
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};
```

## 🎨 Иконки и splash screen

Добавьте иконки в `android/app/src/main/res/`:
- `mipmap-hdpi/` - 72x72
- `mipmap-mdpi/` - 48x48
- `mipmap-xhdpi/` - 96x96
- `mipmap-xxhdpi/` - 144x144
- `mipmap-xxxhdpi/` - 192x192

Или используйте:
```bash
npm install @capacitor/assets
npx capacitor-assets generate --android
```

## 🚀 Production APK (для публикации)

В Android Studio:
1. **Build** → **Generate Signed Bundle / APK**
2. Выберите **APK**
3. Создайте keystore (первый раз)
4. Выберите **release** build type
5. Получите готовый APK для Google Play

## ❓ Требования

- Node.js 16+
- Android Studio (Arctic Fox или новее)
- JDK 17
- Android SDK (API 33+)

## 📚 Документация

- https://capacitorjs.com/docs/android
- https://capacitorjs.com/docs/cli
