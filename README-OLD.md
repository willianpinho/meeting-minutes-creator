# Criador de Atas de Reunião

Uma aplicação React completa para criar, gerenciar e exportar atas de reunião de forma simples e eficiente.

## Funcionalidades

### ✨ Características Principais

- **Criação de Atas Completas**: Formulário intuitivo com todos os campos necessários
- **Gerenciamento de Participantes**: Adicione participantes com nome, email e cargo
- **Pauta Dinâmica**: Crie e organize itens da pauta facilmente
- **Discussões Detalhadas**: Registre discussões com tópicos e observações
- **Decisões Estruturadas**: Documente decisões tomadas com justificativas
- **Ações e Tarefas**: Gerencie tarefas com responsáveis, prazos e status
- **Armazenamento Local**: Dados salvos automaticamente no navegador
- **Exportação PDF**: Gere PDFs profissionais das atas
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile

### 📋 Campos da Ata

#### Informações Básicas
- Título da reunião
- Data e horários (início e fim)
- Local da reunião
- Participantes (nome, email, cargo)

#### Conteúdo da Reunião
- Pauta/agenda com múltiplos itens
- Discussões detalhadas por tópico
- Decisões tomadas com justificativas
- Ações/tarefas com:
  - Descrição da tarefa
  - Responsável
  - Prazo
  - Status (Pendente, Em Andamento, Concluída)

#### Observações
- Campo livre para observações gerais

## Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e desenvolvimento
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Componentes UI modernos

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **@hookform/resolvers** - Integração Zod + React Hook Form

### Exportação e Utilitários
- **jsPDF** - Geração de PDFs
- **html2canvas** - Captura de tela para PDF
- **date-fns** - Manipulação de datas
- **lucide-react** - Ícones
- **uuid** - Geração de IDs únicos

## Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passos

1. **Clone ou inicialize o projeto**
   ```bash
   # Se clonando
   git clone <url-do-repositorio>
   cd meeting-minutes-document

   # Se já está no diretório
   npm install
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Executar em desenvolvimento**
   ```bash
   npm run dev
   ```
   Acesse: http://localhost:5173

4. **Fazer build para produção**
   ```bash
   npm run build
   ```

5. **Visualizar build de produção**
   ```bash
   npm run preview
   ```

## Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── ui/              # Componentes base (shadcn/ui)
│   ├── MeetingForm.tsx  # Formulário de criação/edição
│   ├── MeetingList.tsx  # Lista de atas
│   └── MeetingPreview.tsx # Visualização para PDF
├── hooks/               # Custom hooks
│   └── useMeetings.ts   # Hook para gerenciar atas
├── types/               # Tipos TypeScript
│   └── meeting.ts       # Interfaces da aplicação
├── utils/               # Utilitários
│   ├── localStorage.ts  # Gerenciamento do localStorage
│   └── pdfExport.ts     # Exportação para PDF
├── lib/                 # Bibliotecas auxiliares
│   └── utils.ts         # Utilitários do shadcn/ui
└── App.tsx              # Componente principal
```

## Como Usar

### 1. Criando uma Nova Ata

1. Clique em "Nova Ata" na tela principal
2. Preencha as informações básicas (título, data, horário)
3. Adicione participantes usando o formulário na seção correspondente
4. Crie itens da pauta conforme necessário
5. Adicione discussões, decisões e ações durante ou após a reunião
6. Salve a ata - ela será armazenada automaticamente

### 2. Gerenciando Atas Existentes

- **Visualizar**: Todas as atas aparecem na lista principal
- **Editar**: Clique no ícone de edição para modificar uma ata
- **Excluir**: Clique no ícone de lixeira (com confirmação)
- **Exportar**: Clique no ícone de download para gerar PDF

### 3. Exportando para PDF

1. Clique no botão de exportar PDF em uma ata
2. O sistema gerará automaticamente um PDF formatado
3. O arquivo será baixado com nome baseado no título e data da reunião

## Armazenamento de Dados

Os dados são armazenados localmente no navegador usando `localStorage`:

- **Persistência**: Dados permanecem mesmo após fechar o navegador
- **Privacidade**: Nenhum dado é enviado para servidores externos
- **Backup**: Para backup, exporte as atas em PDF

## Personalização

### Modificando Estilos
- Edite `src/index.css` para alterar variáveis CSS
- Personalize componentes em `src/components/ui/`
- Use classes Tailwind para mudanças rápidas

### Adicionando Campos
1. Modifique interfaces em `src/types/meeting.ts`
2. Atualize o formulário em `src/components/MeetingForm.tsx`
3. Ajuste a visualização em `src/components/MeetingPreview.tsx`

## Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Visualizar build de produção
- `npm run lint` - Executar ESLint

## Limitações Conhecidas

- Armazenamento limitado ao localStorage do navegador
- PDFs dependem da renderização do navegador
- Não há sincronização entre dispositivos
- Exportação funciona melhor em desktop

## Licença

Este projeto é de código aberto e pode ser usado livremente para fins pessoais e comerciais.

## Suporte

Para dúvidas ou problemas:
1. Verifique se todas as dependências estão instaladas
2. Confirme que está usando Node.js 18+
3. Tente limpar cache com `npm ci`

---

**Desenvolvido com React + TypeScript + shadcn/ui**