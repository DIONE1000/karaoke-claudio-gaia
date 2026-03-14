# 🎤 Karaokê do Cláudio Gaia - Sistema de Gestão Musical

[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![Django](https://img.shields.io/badge/Django-4.2-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/)

Um sistema moderno e robusto para gestão de catálogos musicais, desenvolvido com arquitetura desconectada (Decoupled Architecture) para garantir escalabilidade, performance e uma experiência de usuário premium.

## 🚀 Tecnologias Utilizadas

### **Back-End (O Motor)**
*   **Django 4.2 & Django REST Framework:** API robusta e segura para manipulação de dados.
*   **MySQL 8.0:** Banco de dados relacional para persistência de alta confiabilidade.
*   **Gunicorn:** Servidor de aplicação de nível de produção.
*   **CORS Headers:** Configuração de segurança para comunicação entre domínios.

### **Front-End (A Experiência)**
*   **React 19 & Vite:** Interface ultraveloz e reativa.
*   **Tailwind CSS:** Design moderno com foco em UX/UI customizado.
*   **Lucide React:** Icons premium para melhor navegabilidade.
*   **React Toastify:** Notificações em tempo real para feedback do usuário.

### **Infraestrutura (O Contêiner)**
*   **Docker & Docker Compose:** Todo o ecossistema (Front, Back e DB) é orquestrado em contêineres, garantindo que o projeto rode perfeitamente em qualquer servidor Linux ou Windows.

---

## ✨ Funcionalidades Principais

*   ✅ **Gestão Completa (CRUD):** Cadastro, edição, visualização e exclusão de músicas.
*   🔍 **Busca Inteligente:** Filtros dinâmicos por Nome, Cantor, Local ou Versão em tempo real.
*   🛡️ **Feedback de Erros:** Sistema de notificações para sucesso ou falhas de comunicação.
*   ⏳ **Loading States:** Proteção de botões durante o processamento para evitar duplicidade.
*   🔗 **Hiperlinks Dinâmicos:** Suporte a links externos para informações sobre artistas ou canções.
*   📱 **Design Responsivo:** Adaptado para tablets e desktops.

---

## 🛠️ Como Executar o Projeto

### **Pré-requisitos**
*   Docker e Docker Compose instalados.

### **Passo a Passo**
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/musica-gaia.git
   ```
2. Inicie os serviços:
   ```bash
   docker-compose up -d --build
   ```
3. Acesse as interfaces:
   *   **Front-End:** [http://localhost:5173](http://localhost:5173)
   *   **API (Docs):** [http://localhost:8000/api/musicas/](http://localhost:8000/api/musicas/)

---

## ☁️ Deployment (Cloud Ready)

O projeto já está configurado para ambientes de nuvem (como **Oracle Cloud**, AWS ou DigitalOcean). 
*   **Arquitetura:** Multi-container (Front, Back, DB).
*   **Segurança:** Variáveis de ambiente isoladas.
*   **Escalabilidade:** Pronto para ser colocado atrás de um Nginx com SSL.

---

## 📄 Organização do Código

```text
/backend/      # Lógica de API, Modelos e Banco de Dados (Django)
/frontend/     # Interface do Usuário (React + Vite)
/docker-compose.yml  # Orquestração de todos os serviços
```

---

Desenvolvido com foco em **Boas Práticas de Engenharia de Software**. 🚀🎤
