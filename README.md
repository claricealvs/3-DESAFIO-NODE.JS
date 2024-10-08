# 🚘 FlexiLease Autos - API de Gerenciamento para Concessionária

## 🛠️ Tecnologias Utilizadas

<div>
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" />
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" /> 
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg" />
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original-wordmark.svg" />
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original-wordmark.svg" />
</div>

## 🚀 Como Executar o Projeto

### Pré-Requisitos

- Node.js
- Git
- Editor de Código (Recomenda-se o VsCode)

### Passos para Execução

1. **Clone o Repositório**

```bash
https://github.com/claricealvs/3-DESAFIO-NODE.JS.git
cd 3-DESAFIO-NODE.JS
```

2. **Instale as Dependências**

```bash
npm install
```

3. **Execute a Aplicação**

Execute a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

4. **Acesse a API**

   A aplicação estará disponível no endereço: `http://localhost:3000`.

## 🛠️ Ferramenta para testes

- Postman

## 🌐 Endpoints da API

Aqui estão os endpoints disponíveis na API:

<details>
<summary> Cars </summary>

`POST localhost:3000/v1/car`: Cadastrar um carro.

_Request:_

```JSON
{
    "model": "Gol",
    "color": "black",
    "year": 2010,
    "valuePerDay": 50,
    "acessories": ["Air Conditioner", "GPS"],
    "numberOfPassengers": 5
}
```

_Response:_

```JSON
{
    "id": 1,
    "model": "Gol",
    "color": "black",
    "year": 2010,
    "valuePerDay": 50,
    "acessories": [
        "Air Conditioner",
        "GPS"
    ],
    "numberOfPassengers": 5
}
```

**Acessórios disponíveis para carros:**

```TYPESCRIPT
- AIR_CONDITIONER = 'Air Conditioner',
- FOUR_PORTS = '4 Ports',
- SUNROOF = 'Sunroof',
- GPS = 'GPS',
- TRACION_4X4 = '4x4 traction',
- PARKING_SENSOR = 'Parking Sensor',
- AIRBAG = 'Airbag',
```

---

`GET localhost:3000/v1/car`: Listar todos os carros.

_Response:_

```JSON
[
    {
        "car": [
            {
                "id": 1,
                "model": "Gol",
                "color": "black",
                "year": 2010,
                "valuePerDay": 50,
                "acessories": [
                    "Air Conditioner",
                    "GPS"
                ],
                "numberOfPassengers": 5
            }
        ]
    },
    {
        "car": [
            {
                "id": 2,
                "model": "Gol Quadrado",
                "color": "gray",
                "year": 2010,
                "valuePerDay": 50,
                "acessories": [
                    "Air Conditioner",
                    "GPS"
                ],
                "numberOfPassengers": 5
            }
        ]
    }
]
```

---

`GET localhost:3000/v1/car/{id}`: Listar um carro pelo id.

_Response:_

```JSON
{
    "id": 1,
    "model": "Gol",
    "color": "black",
    "year": 2010,
    "valuePerDay": 50,
    "acessories": [
        "Air Conditioner",
        "GPS"
    ],
    "numberOfPassengers": 5
}
```

---

`PUT localhost:3000/v1/car/{id}`: Atualizar um carro pelo id.

_Request:_

```JSON
{
    "model": "Fiat Uno",
    "color": "red",
    "year": 2000,
    "valuePerDay": 50,
    "acessories": ["Air Conditioner", "GPS"],
    "numberOfPassengers": 5
}
```

_Response:_

```JSON
{
    "id": 2,
    "model": "Fiat Uno",
    "color": "red",
    "year": 2000,
    "valuePerDay": 50,
    "acessories": [
        "Air Conditioner",
        "GPS"
    ],
    "numberOfPassengers": 5
}
```

---

`PATCH localhost:3000/v1/car/{id}`: Atualizar um acessório pelo id do carro.

_Request:_

```JSON
{
  "acessories": ["Air Conditioner", "GPS", "4 Ports"]
}
```

_Response:_

```JSON
{
    "id": 2,
    "model": "Fiat Uno",
    "color": "red",
    "year": 2000,
    "valuePerDay": 50,
    "numberOfPassengers": 5,
    "acessories": [
        "Air Conditioner",
        "GPS",
        "4 Ports"
    ]
}
```

---

`DELETE localhost:3000/v1/car/{id}`: Deletar um carro pelo id.

_Response:_

> status code 204

---

</details>

<details>
<summary> Users </summary>

`POST localhost:3000/v1/user`: Cadastrar um usuário.

_Request:_

```JSON
{
    "name": "Carina",
    "cpf": "045.696.371-59",
    "birth": "14/01/2004",
    "cep": "90010510",
    "email": "carina1@gmail.com",
    "password": "123456"
}
```

_Response:_

```JSON
{
    "id": 2,
    "name": "Carina",
    "cpf": "045.696.371-59",
    "birth": "14/01/2004",
    "email": "carina1@gmail.com",
    "cep": "90010510",
    "street": "Largo do Trabalho",
    "neighborhood": "Centro Histórico",
    "city": "Porto Alegre",
    "uf": "RS",
    "complement": ""
}
```

---

`POST localhost:3000/v1/auth`: Autenticar um usuário.

_Request:_

```JSON
{
    "email:": "carina1@gmail.com",
    "password": "123456"
}
```

---

`GET localhost:3000/v1/user`: Listar todos os usuários.

_Response:_

```JSON
[
    {
        "user": [
            {
                "id": 2,
                "name": "Carina",
                "cpf": "045.696.371-59",
                "birth": "2004-01-14",
                "cep": "90010510",
                "email": "carina1@gmail.com",
                "password": "$2a$10$kH8T8sKZBjboBR9twAq/Her2KYUKWBRjPQ1GTUmwbSfybN9jZ07qG"
            }
        ]
    }
]
```

---

`GET localhost:3000/v1/user/:id`: Listar um usuário pelo id.

_Response:_

```JSON
{
    "id": 2,
    "name": "Carina",
    "cpf": "045.696.371-59",
    "birth": "2004-01-14",
    "email": "carina1@gmail.com",
    "cep": "90010510",
    "street": "Largo do Trabalho",
    "neighborhood": "Centro Histórico",
    "city": "Porto Alegre",
    "uf": "RS",
    "complement": ""
}
```

---

`PUT localhost:3000/v1/user/{id}`: Atualizar um usuário pelo id.

_Request:_

```JSON
{
    "name": "Carina",
    "cpf": "045.696.371-59",
    "birth": "14/03/2004",
    "cep": "90010510",
    "email": "carina1@gmail.com",
    "password": "123456"
}
```

_Response:_

```JSON
{
    "id": 2,
    "name": "Carina",
    "cpf": "045.696.371-59",
    "birth": "13/03/2004",
    "cep": "90010510",
    "email": "carina1@gmail.com",
    "password": "123456"
}
```

---

`DELETE localhost:3000/v1/user/{id}`: Deletar um usuário pelo id.

_Response:_

> status code 204

---

</details>

<details>
<summary> Reserves </summary>

`POST localhost:3000/v1/reserve`: Cadastrar uma reserva.

_Request:_

```JSON
{
  "startDate": "05/10/2000",
  "endDate": "20/10/2000",
  "carId": 1,
  "userId": 1
}
```

_Response:_

```JSON
{
    "id": 4,
    "startDate": "06/10/2000",
    "endDate": "21/10/2000",
    "finalValue": 750,
    "carId": 1,
    "userId": 1
}
```

---

`GET localhost:3000/v1/reserve`: Listar todas as reservas.

_Response:_

```JSON
[
    {
        "reserve": [
            {
                "id": 3,
                "startDate": "05/10/2000",
                "endDate": "20/10/2000",
                "finalValue": 750,
                "carId": 1,
                "userId": 1
            }
        ]
    },
    {
        "reserve": [
            {
                "id": 4,
                "startDate": "05/10/2000",
                "endDate": "20/10/2000",
                "finalValue": 750,
                "carId": 1,
                "userId": 1
            }
        ]
    }
]
```

---

`GET /v1/reserve/{id}`: Listar uma reserva pelo id.

_Response:_

```JSON
{
    "id": 4,
    "startDate": "05/10/2000",
    "endDate": "20/10/2000",
    "finalValue": 750,
    "carId": 1,
    "userId": 1
}
```

---

`PUT localhost:3000/v1/reserve/{id}`: Atualizar uma reserva.

_Request:_

```JSON
{
  "startDate": "06/10/2020",
  "endDate": "21/10/2020",
  "carId": 1,
  "userId": 1
}
```

_Response:_

```JSON
{
    "id": 4,
    "startDate": "07/10/2020",
    "endDate": "22/10/2020",
    "finalValue": 750,
    "carId": 1,
    "userId": 1
}
```

---

`DELETE localhost:3000/v1/reserve/{id}`: Deletar uma reserva.

_Response:_

> status code 204

---

</details>

---

🔜🔜🔜🔜🔜🔜🔜🔜🔜

## 💻 Considerações e Melhorias

- A API possui a rota de autenticação de usuário, porém ela não funciona corretamente, fazendo com que fora necessário retirar a proteção das rotas.

- Devido a falta de autenticação, fora necessário adicionar a coluna `user_id` na tabela `reserves` para que a API funcionasse corretamente com o id do User.

- Algumas datas estão sendo retornadas de forma incorreta, porém estão sendo salvas corretamente no banco de dados.
