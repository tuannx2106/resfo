# Real Estate FO

## Engines

- Node >= 12.x

## Add env

### For development

- Create .env.local file
- Copy .env.example and paste to .env.local

### For production

- Create .env.production file
- Env will be share between FE dev with devops

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run dev
```

### Compiles and minifies for production

```
yarn run build
```

### Lints and fixes files

```
npm run lint
```

## Editor config in need

### Vscode settings

Copy config bellow and paste to .vscode/settings.json

```js
{
  "eslint.validate": ["javascript", "typescript"],
  "editor.tabSize": 2,
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  "files.trimTrailingWhitespace": true,
  "cSpell.words": ["sourcemap"],
  "eslint.lintTask.enable": true,
  "prettier.enable": true,
  "prettier.configPath": ".prettierrc.js",
  "files.exclude": {
    "node_modules/": true
  }
}
```

### Vscode extensions in need

- Eslint
- Tslint
- Prettier
