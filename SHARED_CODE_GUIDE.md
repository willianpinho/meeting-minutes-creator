# Guia de Código Compartilhado - React Web & React Native

Este documento descreve a implementação de código compartilhado entre as aplicações React Web e React Native do projeto Meeting Minutes.

## ✅ Problemas Resolvidos

### 1. Erro de Build Mobile (Zod v4)
- **Problema**: `Export namespace should be first transformed by @babel/plugin-transform-export-namespace-from`
- **Solução**: Adicionado plugin Babel necessário em `MeetingMinutesApp/babel.config.js`

### 2. Duplicação de Código
- **Problema**: Tipos e schemas duplicados entre web e mobile
- **Solução**: Código compartilhado em `./shared/src/`

### 3. Configuração Cross-Platform
- **Problema**: Falta de infraestrutura para código compartilhado
- **Solução**: Configuração Metro (RN) e Vite (Web) para resolução de módulos

## 📁 Estrutura do Código Compartilhado

```
shared/
├── src/
│   ├── types/
│   │   ├── meeting.ts      # Interfaces TypeScript
│   │   └── index.ts
│   ├── schemas/
│   │   ├── meeting.ts      # Schemas Zod para validação
│   │   └── index.ts
│   ├── utils/
│   │   ├── meeting.ts      # Utilitários de negócio
│   │   └── index.ts
│   └── index.ts            # Export principal
├── dist/                   # Build transpilado
├── package.json
└── tsconfig.json
```

## 🔧 Configurações Implementadas

### React Native (Metro)
- `metro.config.js`: Configurado para resolver módulos compartilhados via path absoluto
- `babel.config.js`: Adicionado `@babel/plugin-transform-export-namespace-from`
- `tsconfig.json`: Paths para resolução TypeScript

### React Web (Vite)
- `vite.config.ts`: Alias para resolução de módulos compartilhados
- `tsconfig.app.json`: Paths e includes para TypeScript

## 🚀 Como Usar

### Desenvolvimento
```bash
# Build inicial do código compartilhado
./scripts/setup-shared.sh

# Web
npm run dev

# Mobile
cd MeetingMinutesApp && npm start
```

### Importações
```typescript
// Em qualquer arquivo .ts/.tsx (Web ou Mobile)
import { MeetingMinutes, Participant } from '../types/meeting';
import { meetingFormSchema } from '../utils/validationSchemas';
```

Os arquivos locais (`src/types/meeting.ts`, `src/utils/validationSchemas.ts`) fazem re-export do código compartilhado.

## 📦 Dependências Adicionadas

### Mobile
- `@babel/plugin-transform-export-namespace-from`: Resolve export namespace do Zod v4

### Shared
- `zod`: Validação de schemas
- `date-fns`: Manipulação de datas
- `typescript`: Build TypeScript

## 🔄 Workflow de Desenvolvimento

1. **Modificar código compartilhado**: `./shared/src/`
2. **Build automático**: TypeScript compila para `./shared/dist/`
3. **Hot reload**: Ambas as plataformas detectam mudanças automaticamente

## 🛠️ Troubleshooting

### Metro não encontra módulo compartilhado
- Verificar `metro.config.js` watchFolders
- Reset cache: `npx react-native start --reset-cache`

### TypeScript não reconhece tipos
- Verificar paths em `tsconfig.json`
- Rebuild código compartilhado: `cd shared && npm run build`

### Vite não resolve alias
- Verificar configuração de alias em `vite.config.ts`
- Restart dev server

## 📋 Próximas Melhorias

- [ ] Symlinks para desenvolvimento mais fluido
- [ ] Testes unitários para código compartilhado
- [ ] CI/CD pipeline para validar ambas as plataformas
- [ ] Extracting mais utilitários de negócio para shared

## 🎯 Benefícios Alcançados

- ✅ **Zero duplicação** de tipos e schemas
- ✅ **Manutenibilidade** centralizada
- ✅ **Type safety** compartilhado
- ✅ **Validação consistente** entre plataformas
- ✅ **Build funcional** em ambas as plataformas
- ✅ **Development experience** melhorado

---

**Coordenado por**: Multi-Agent Coordinator
**Data**: 2025-09-16
**Status**: ✅ Implementado e testado