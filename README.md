# VaciKids 💉

**Aplicação no ar: [vacikids.web.app](https://vacikids.web.app)**

Carteirinha de vacinação infantil digital. Uma plataforma para pais e responsáveis acompanharem a jornada de vacinação dos filhos: cadastram as crianças, visualizam o calendário vacinal de cada uma, registram as vacinas aplicadas, consultam o histórico e ficam por dentro das campanhas de vacinação ativas.

## Screenshots

| Dashboard                           | Perfil da criança                                  |
| ----------------------------------- | -------------------------------------------------- |
| ![Dashboard](/public/dashboard.png) | ![Perfil da Criança](/public/detalhes-crianca.png) |

| Lista de Vacinas                | Campanhas                           |
| ------------------------------- | ----------------------------------- |
| ![Vacinas](/public/vacinas.png) | ![Campanhas](/public/campanhas.png) |

## Funcionalidades

- **Dashboard** — resumo geral da família, alertas de vacinas atrasadas e campanhas ativas.
- **Crianças** — lista de filhos com indicador visual da situação de cada um, perfil individual com calendário vacinal completo e formulário de cadastro/edição.
- **Vacinas** — informações detalhadas de cada vacina e do calendário recomendado por faixa etária.
- **Histórico vacinal** — registro de todas as aplicações.
- **Campanhas** — campanhas de vacinação ativas para o público infantil.
- **Múltiplos filhos** — cada criança tem perfil próprio, sem misturar históricos.
- **Responsivo** — desktop, tablet e mobile.

## Stack

- **Angular 22** — standalone components, signals, lazy loading por feature.
- **Ionic Framework v8** (`@ionic/angular/standalone`) — componentes de UI.
- **Tailwind CSS v4** — espaçamento e layout.
- **RxJS / Signals** — estado reativo nos services.
- **Firebase / Firestore** — fonte de dados (com seed automático de dados de exemplo).
- **Vitest** — testes unitários.

## Pré-requisitos

- **Node.js** 20+ (recomendado 22 ou superior)
- **npm** 10+

## Como rodar

### 1. Clonar o repositório

```bash
git clone https://github.com/gabrielportodev/VaciKids.git
cd VaciKids
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

As configurações de ambiente ficam em [`src/environments/`](src/environments/):

| Arquivo                      | Quando é usado                             |
| ---------------------------- | ------------------------------------------ |
| `environment.ts`             | Base / `ng serve` padrão                   |
| `environment.development.ts` | Build de desenvolvimento (`npm run watch`) |
| `environment.prod.ts`        | Build de produção (`npm run build`)        |

Preencha as credenciais do seu projeto Firebase. Cada arquivo segue o formato:

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: 'SUA_API_KEY',
    authDomain: 'SEU_PROJETO.firebaseapp.com',
    projectId: 'SEU_PROJECT_ID',
    storageBucket: 'SEU_PROJETO.firebasestorage.app',
    messagingSenderId: 'SEU_SENDER_ID',
    appId: 'SEU_APP_ID',
    measurementId: 'SEU_MEASUREMENT_ID',
  },
  seedOnStart: true,
};
```

### 4. Iniciar o servidor de desenvolvimento

```bash
npm start
```

A aplicação fica disponível em **http://localhost:4200**.

## Scripts disponíveis

```bash
npm start        # ng serve — servidor de desenvolvimento
npm run build    # build de produção (usa environment.prod.ts)
npm run watch    # build contínuo de desenvolvimento
npm test         # testes unitários (Vitest)
npm run lint     # análise estática (ESLint)
npm run format   # formatação (Prettier)
```

## Arquitetura de pastas

Organização por **features** com lazy loading, separando lógica de negócio (`core`), reúso (`shared`) e telas (`features`).

```
src/
├── app/
│   ├── core/                      # lógica de negócio e funções puras
│   │   ├── services/              # CRUD, cálculos — singletons (providedIn: 'root')
│   │   │   ├── child.service.ts               # CRUD de crianças
│   │   │   ├── vaccine.service.ts             # vacinas e calendário vacinal
│   │   │   ├── vaccination-record.service.ts  # registros + cálculo de status
│   │   │   ├── campaign.service.ts            # campanhas ativas
│   │   │   ├── notification.service.ts        # toasts / feedback ao usuário
│   │   │   └── firestore-seeder.ts            # popula o Firestore na 1ª execução
│   │   ├── utils/                 # funções puras e testáveis (sem Angular)
│   │   │   ├── age.util.ts        # idade em meses a partir da data de nascimento
│   │   │   ├── status.util.ts     # em dia / pendente / atrasada + agregação de status
│   │   │   ├── summary.util.ts    # resumo vacinal de uma criança (contagens e %)
│   │   │   ├── campaign.util.ts   # campanha ativa para uma data de referência
│   │   │   ├── date.util.ts       # helpers de data
│   │   │   ├── name.util.ts       # helpers de nome
│   │   │   └── index.ts           # barrel das funções puras
│   │   └── firestore.ts           # provider do Firestore + collectionSignal
│   │
│   ├── shared/                    # reúso entre features
│   │   ├── models/                # interfaces (Child, Vaccine, Campaign, ...)
│   │   ├── components/            # componentes de apresentação reutilizáveis
│   │   │   ├── status-badge/      # badge de situação vacinal
│   │   │   ├── child-card/
│   │   │   ├── vaccine-card/
│   │   │   ├── campaign-card/
│   │   │   ├── detail-header/
│   │   │   ├── empty-state/
│   │   │   └── loading/
│   │   ├── pipes/                 # age.pipe, date-format.pipe, vaccine-name.pipe
│   │   └── constants/             # calendário vacinal do SUS, filtros de idade + dados de seed
│   │
│   ├── features/                  # telas roteadas, carregadas por lazy loading
│   │   ├── dashboard/             # resumo, alertas e campanhas
│   │   ├── children/              # lista, perfil, formulário + components internos
│   │   ├── vaccines/              # lista e detalhes de vacina
│   │   ├── vaccination-history/   # histórico de aplicações
│   │   └── campaigns/             # lista e detalhes de campanha
│   │
│   ├── app.routes.ts              # rotas raiz com loadChildren por feature
│   └── app.config.ts              # providers da aplicação
│
└── environments/                  # environment.ts / .development.ts / .prod.ts
```

### Responsabilidade de cada camada

- **core/services** — concentram toda a regra de negócio. Os componentes não calculam status nem filtram dados; pedem aos services.
- **core/utils** — funções puras (cálculo de idade, derivação de status), testáveis isoladamente.
- **shared/models** — contratos de dados em inglês (`Child`, `Vaccine`, `VaccinationRecord`, `Campaign`, `VaccinationStatus`).
- **shared/components** — componentes de apresentação "burros" (recebem via `input()`, emitem via `output()`).
- **features** — telas independentes, cada uma com seu próprio arquivo de rotas e lazy loading.
