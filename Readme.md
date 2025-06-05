# 📡 Comunica+ - Aplicativo Mobile

## 👥 Integrantes do Projeto

- **Bruno Da Silva Souza** – RM: 94346  
- **Julio Samuel De Oliveira** – RM: 557453  
- **Leonardo Da Silva Pereira** – RM: 557598  

---

## 📘 Descrição do Projeto

O **Comunica+** é um aplicativo móvel nativo Android, desenvolvido em **Java**, que visa oferecer uma solução de **comunicação offline** em situações críticas como desastres naturais, falhas de internet ou ausência de sinal. O sistema permite o cadastro de usuários e dispositivos, envio e leitura de mensagens, e gerenciamento dos dados localmente.

O objetivo principal é garantir **acesso à comunicação mesmo sem conexão com a internet**, simulando o funcionamento de um sistema de rede offline que pode ser adaptado para uso com tecnologias como LoRa, Bluetooth Mesh, entre outras.

---

## 🔑 Funcionalidades

### 1. Tela de Boas-Vindas
- Interface com animação e botões para cadastro ou login
- Navegação direta para as principais ações do app

### 2. Cadastro de Usuário
- Formulário para inserir nome, e-mail e senha
- Validação de campos obrigatórios
- Armazenamento de dados local com `SharedPreferences`

### 3. Login
- Verificação de credenciais com base nos dados armazenados localmente
- Redirecionamento para a tela de cadastro de dispositivos

### 4. Cadastro de Dispositivos
- Formulário para cadastrar dispositivos (ex: rádios ou módulos de comunicação)
- Campos como ID do dispositivo, status, etc.

### 5. Envio de Mensagens
- Campo para digitação e envio de mensagens
- Simulação de envio offline e armazenamento local

### 6. Leitura de Mensagens Recebidas
- Listagem das mensagens já armazenadas
- Organização cronológica e por remetente

---

## ✅ Requisitos Atendidos

- [x] Navegação entre telas com `Intent`
- [x] 5 ou mais telas funcionais e navegáveis
- [x] Armazenamento local com `SharedPreferences`
- [x] Formulários com validação
- [x] Layout responsivo e coerente (Dark Mode)
- [x] Código modular e comentado
- [x] Animações em algumas telas (ex: tela inicial com `ObjectAnimator`)

---

## 🛠️ Tecnologias Utilizadas

- Android Studio
- Java (Android SDK)
- XML (para layouts)
- SharedPreferences (para persistência local)
- `ObjectAnimator`, `AnimatorSet` (animações)
- `Intent` (navegação entre telas)

---

## 📱 Como Executar o Projeto

### Pré-requisitos

- Android Studio instalado (https://developer.android.com/studio)
- Emulador configurado ou dispositivo Android físico

### Passos

1. Clone este repositório ou abra o projeto no Android Studio:
git clone https://github.com/leosilper/comunicaplus-api.git

2. Abra o Android Studio e selecione a pasta do projeto.
3. Conecte um dispositivo Android ou inicie um emulador.
4. Clique em **Run ▶️** para compilar e executar o app.

---

## 🧪 Possibilidades Futuras

- Integração com módulos de hardware LoRa ou Bluetooth para comunicação real offline
- Backend com API REST para sincronização posterior
- Criptografia das mensagens locais
- Modo P2P com Nearby Connections API

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos na disciplina *MOBILE APPLICATION DEVELOPMENT*. Todos os direitos reservados aos autores.

