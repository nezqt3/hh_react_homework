#!/bin/bash

echo "🔧 Setting up pre-commit hook..."

# Проверяем, что мы в git репозитории
if [ ! -d .git ]; then
  echo "⚠️  Not a git repository. Initializing git..."
  git init
fi

# Создаем директорию .git/hooks если её нет
mkdir -p .git/hooks

# Создаем pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh

echo "🔍 Running pre-commit checks..."

# Получаем список измененных TypeScript файлов
STAGED_TS_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$' || true)

if [ -n "$STAGED_TS_FILES" ]; then
  echo "📝 Checking files:"
  echo "$STAGED_TS_FILES"
  
  # Проверка TypeScript
  echo "🔍 Running TypeScript check..."
  yarn tsc --noEmit
  if [ $? -ne 0 ]; then
    echo "❌ TypeScript check failed!"
    exit 1
  fi
  
  # Запуск ESLint
  echo "🔍 Running ESLint..."
  yarn lint
  if [ $? -ne 0 ]; then
    echo "❌ ESLint check failed!"
    exit 1
  fi
  
  # Форматирование
  echo "🎨 Formatting files..."
  echo "$STAGED_TS_FILES" | xargs yarn prettier --write 2>/dev/null
  
  # Добавляем обратно в стейдж
  echo "$STAGED_TS_FILES" | xargs git add
fi

echo "✅ All checks passed!"
exit 0
EOF

# Делаем хук исполняемым
chmod +x .git/hooks/pre-commit

echo "✅ Pre-commit hook has been set up successfully!"