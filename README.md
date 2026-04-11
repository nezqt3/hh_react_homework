# Домашнее задание HH.ru React + Redux

## Проект построен с использованием современных инструментов и библиотек:

- React — UI библиотека
- Vite — быстрый сборщик и dev-сервер
- Redux Toolkit — управление состоянием
- TypeScript — типизация
- CSS — стилизация
- ESLint — анализ кода
- Prettier — форматирование кода
- EditorConfig — единый стиль файлов

## Установка:

### Установка окружения

```bash
yarn install
```

### Запуск проекта

```bash
yarn dev
```

### Билд

```bash
yarn build
```

## Деплой на GitHub Pages

Проект настроен на автоматический деплой через GitHub Actions:

- workflow: `.github/workflows/cd.yml`
- ветки для запуска: `main`, `homework`
- опубликованный сайт: https://nezqt3.github.io/hh_react_homework/

В настройках репозитория GitHub нужно выбрать:

```text
Settings -> Pages -> Source -> GitHub Actions
```

Для GitHub Pages сборка запускается с `GITHUB_PAGES=true`, чтобы Vite использовал корректный `base` для репозитория `hh_react_homework`.
