# meekolony-metrics

A web application to certain metrics of the Tatsumeeko: Meekolony Pass collection and check the market trends of it.

# Backend
- [x] Get floor price for Meekolony on Magic Eden
- [x] Get listings on Magic Eden
- [x] Get sales on Magic Eden
- [x] Get Meekolony NFTs for a particular user address*
- [] Get number of unique holders for the Meekolony collection* (WIP)

# Frontend
- [x] Meekolony Collection Page
- [x] Meekolony Holder Page

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

- Node.js v12.* or later [how to install](https://nodejs.org/en/)
- MacOS, Windows (including WSL), and Linux are supported
- Git [how to install](https://git-scm.com/)

### Installing

1. Clone the project.

```
git clone https://github.com/yenyih/meekolony-metrics.git
```

2. Go into the project directory.

```
cd meekolony-metrics
```

3. Install backend dependancies.

```
cd backend

npm install
```

4. Define environment variables.
Create a `.env` file in the backend directory. To view the available environment variables, please refer `.env.example` file.

5. Install frontend dependacies.

```
cd frontend

npm install
```

### Running the backend

1. To run the project,

```
npm run start:dev
```

> * Note: /_docs to access swagger API documentation

## Running the frontend

```
npm run dev
```

> * Note: Frontend default port is running on 8080, it can be change under package.json.

## Built With

* [Nestjs](https://nestjs.com/) - The backend API framework used.
* [MagicEden API](https://api.magiceden.dev/) - API used to get Meekolony Pass Collections and Sales.
* [Metaplex JavaScript SDK](https://github.com/metaplex-foundation/js#readme) - Javascript SDK for dealing with NFT.
* [Nuxtjs](https://nuxtjs.org/) - The frontend app framework used.
* [Vuetify](https://vuetifyjs.com/en/) - Material Design Framework.

## Authors

* **Soo Yen Yih** - *Initial work* - [meekolony-metrics](https://github.com/yenyih)
