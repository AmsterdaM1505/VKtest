# Описание проекта
Данный проект предоставляет отображение репозиториев в виде списка элементов поддерживающего плавный бесконечный скролл.

## Features
- **React**: Библиотека для создания пользовательских интерфейсов.
- **TypeScript**: Надмножество JS поддерживающее статическую типизацию.
- **Vite**: Инструмент сборки, оптимизированный для современной веб-разработки.
- **HMR (Hot Module Replacement)**: Мгновенные обновления пользовательского интерфейса во время разработки.
- **ESLint Integration**: Обеспечивает стабильное качество кода с поддержкой линтинга с учетом типов.

## Шаги для начала работы

### Предустановка
- Node.js (v16 или выше)
- npm

### Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/AmsterdaM1505/VKtest.git
```

2. Navigate to the project directory:
```bash
cd https://github.com/AmsterdaM1505/VKtest.git
```

3. Install dependencies:
```bash
npm install
```

### Запуск сервера

Для запуска сервера разработки:
```bash
npm run dev
```
Затем открыть [http://localhost:5173](http://localhost:5173) чтобы увидеть приложение в браузере.

### Build

Для создания готовой к производству сборки:
```bash
npm run build
```

# React + TypeScript + Vite

Этот шаблон обеспечивает минимальную настройку для работы React в Vite с HMR и некоторыми правилами ESLint.

В настоящее время доступны два официальных плагина:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Расширение конфигурации ESLint

Если вы разрабатываете производственное приложение, мы рекомендуем обновить конфигурацию, чтобы включить правила линтинга с учетом типов:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Замените `tseslint.configs.recommended` на `tseslint.configs.recommendedTypeChecked` или `tseslint.configs.strictTypeChecked`
- При желании добавьте `...tseslint.configs.stylisticTypeChecked`
- Установите [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) и обновите конфигурацию:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
