# 📡 Comunica+ - Aplicativo Mobile + API Java

## 👥 Integrantes do Projeto

* **Bruno Da Silva Souza** – RM: 94346
* **Julio Samuel De Oliveira** – RM: 557453
* **Leonardo Da Silva Pereira** – RM: 557598

---

## 📘 Descrição do Projeto

O **Comunica+** é um aplicativo móvel desenvolvido em **React Native** (Expo) com o objetivo de fornecer uma solução de **comunicação offline** em situações de emergência, como desastres naturais, falhas de internet ou ausência de sinal.

O sistema permite que usuários:

✅ Cadastrem dispositivos
✅ Enviem e recebam mensagens
✅ Gerenciem dados localmente mesmo sem conexão

O app foi projetado para futura integração com tecnologias como **LoRa**, **Bluetooth Mesh** ou outras redes offline.

O backend da aplicação é uma **API REST em Java (Spring Boot)** que gerencia:

✅ Autenticação de usuários
✅ Cadastro de dispositivos
✅ Envio e listagem de mensagens

---

## 🔑 Funcionalidades

### 🏠 1. Tela de Boas-Vindas

* Interface animada
* Botões para login e funcionalidades principais

### 👤 2. Cadastro de Usuário

* Criação de conta com e-mail e senha
* Validação de campos

### 🔐 3. Login

* Autenticação via API (JWT Token)
* Persistência do token local (`AsyncStorage`)
* Controle de navegação com base na autenticação

### 📿 4. Cadastro de Dispositivos

* Formulário para cadastro de dispositivos
* Integração com API REST

### 📋 5. Listagem de Dispositivos

* Tela que exibe os dispositivos cadastrados

### ✉️ 6. Envio de Mensagens

* Formulário para envio de mensagem para um dispositivo

### 📨 7. Listagem de Mensagens

* Tela que exibe mensagens enviadas/recebidas

### 🚪 8. Logout

* Botão para sair e limpar token armazenado

---

## ✅ Requisitos Atendidos

* [x] Navegação entre telas com React Navigation
* [x] 6 ou mais telas funcionais e navegáveis
* [x] Autenticação com API (JWT Token)
* [x] Armazenamento local com `AsyncStorage`
* [x] Formulários com validação
* [x] Layout responsivo e consistente (Dark Mode)
* [x] Código modular e componentizado
* [x] Animações (com `react-native-animatable`)

---

## 🛠️ Tecnologias Utilizadas

### 📱 Mobile

* React Native (com Expo)
* TypeScript
* React Navigation
* Axios
* AsyncStorage
* react-native-animatable

### ☕ Backend (API Java)

* Java 21
* Spring Boot 3.5
* Spring Data JPA
* Maven
* Oracle Database

---

## 📱 Como Executar o Projeto

### 1⃣ × Pré-requisitos

* Node.js instalado
* Expo CLI (`npm install -g expo-cli`) ou usar `npx expo start`
* Java 21 instalado
* Maven (ou usar `mvnw.cmd`)
* Banco Oracle configurado

---

### 2⃣ × Executando o Backend (API Java)

```bash
cd C:\Users\Samsung\OneDrive\Área de Trabalho\java\comunicaplus-api\comunicaplus-api-main

# Rodar com Maven Wrapper:
mvnw.cmd spring-boot:run
```

A API vai rodar em:

```
http://localhost:8080
# ou:
http://192.168.X.X:8080
```

(Use seu IP local na rede Wi-Fi → veja com `ipconfig`)

---

### 3⃣ × Executando o Mobile (React Native)

```bash
cd C:\Users\Samsung\OneDrive\Área de Trabalho\mobile\ComunicaMais.web

# Instalar dependências:
npm install

# Rodar com Expo:
npx expo start
```

Abra o **Expo Go** no celular e escaneie o QR Code.

---

### 4⃣ × Configurar o IP no Mobile

No arquivo:

```ts
src/services/api.ts
```

Troque:

```ts
const BASE_URL = 'http://192.168.X.X:8080';
```

Por:

```ts
const BASE_URL = 'http://SEU_IP_LOCAL:8080';
```

(Esses IP deve ser o da sua máquina na rede Wi-Fi, visto com `ipconfig`)

---

## 🔪 Possibilidades Futuras

* Integração com LoRa ou Bluetooth Mesh
* Comunicação P2P
* Sincronização offline/online com a API
* Criptografia de mensagens
* Sistema de notificações offline
* Controle de permissões avançado
* Dashboard Web para administração

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos na disciplina **MOBILE APPLICATION DEVELOPMENT**.
Todos os direitos reservados aos autores.

---
