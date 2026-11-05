# VILA FLOR — Beachfront Holiday House

> **"Where the Ocean Becomes Home."**  
> An intimate beachfront escape in the heart of Ponta do Ouro, Mozambique.

[![Airbnb Superhost](https://img.shields.io/badge/Airbnb-Superhost%20%E2%98%85%204.98-FF385C?style=flat&logo=airbnb&logoColor=white)](https://www.airbnb.com.br/rooms/1133096153786064159)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Deployment%20Ready-000000?style=flat&logo=vercel&logoColor=white)](#deploy-na-vercel)
[![HTML5 / CSS3 / Vanilla JS](https://img.shields.io/badge/Architecture-Vanilla%20Stack-102C36?style=flat)](#arquitetura)

---

## 🌊 Sobre a Propriedade

**Vila Flor** é uma residência colonial histórica situada diretamente sobre a praia em **Ponta do Ouro**, Província de Maputo, Moçambique. Recentemente restaurada, a propriedade combina a dignidade da arquitetura colonial com o conforto contemporâneo e o acesso direto às águas mornas do Oceano Índico.

### Especificações Verificadas

* **Capacidade:** Até 8 hóspedes
* **Quartos:** 4 quartos
  * **Quarto 1:** 1 Cama Queen com dossel e mosquiteiro colonial
  * **Quarto 2:** 1 Cama King com vista para os jardins tropicais
  * **Quarto 3:** 2 Camas de solteiro individuais
  * **Quarto 4:** 2 Camas de solteiro individuais
* **Camas:** 6 camas
* **Banheiros:** 3 banheiros completos com chuveiros walk-in
* **Comodidades:** Piscina privativa com deck, acesso direto e privativo à praia, cozinha completa equipada, Wi-Fi e estacionamento gratuito no local.
* **Reputação Oficial Airbnb:** Nota **4,98 de 5,0** (81 avaliações verificadas), selo **Superhost** e classificação no **Top 10%** de acomodações elegíveis.

---

## 📸 Coleção Fotográfica Oficial

O projeto utiliza exclusivamente as **42 fotografias reais** extraídas do anúncio oficial do Airbnb:
[https://www.airbnb.com.br/rooms/1133096153786064159](https://www.airbnb.com.br/rooms/1133096153786064159).

* **Zero geração artificial:** Nenhuma imagem sintética ou renderização de IA.
* **Formatos Web modernos:** Versões WebP de alta fidelidade e miniaturas responsivas para carregamento instantâneo.
* **Categorias organizadas:**
  * Exterior & Arquitetura
  * Sala de Estar & Convivência
  * Quartos & Suítes
  * Banheiros
  * Cozinha
  * Piscina & Solário
  * Praia & Oceano
  * Jardins Tropicais
  * Detalhes de Marcenaria e Artesanato

Consulte o inventário detalhado em [`IMAGE_INVENTORY.md`](./IMAGE_INVENTORY.md).

---

## ✨ Recursos do Website

1. **Design de Hospitalidade de Luxo:** Paleta de cores exclusiva com *Deep Ocean*, *Warm Sand*, *Ivory*, *Tropical Green* e *Muted Gold*.
2. **Alternador de Temas Claro e Escuro:** Suporte nativo com persistência em `localStorage` e adaptação às preferências do sistema.
3. **Seletor de Perspectivas no Hero:** Permite alternar a foto principal entre *Gramado & Fachada*, *Deck & Mar* e *Piscina & Solário*.
4. **Experiência Interativa de Atmosfera:** Transições interativas mostrando os momentos do dia em Ponta do Ouro (*Manhã*, *Meio-Dia*, *Entardecer*, *Noite*).
5. **Galeria com Lightbox em Tela Cheia:**
   * Filtros por categoria.
   * Navegação por teclado (`Esc`, `←`, `→`).
   * Suporte a gestos de arrasto (*swipe touch*) em smartphones.
6. **Motor de Reserva com Redirecionamento Direto:**
   * Seletores de data de check-in e check-out com validação em tempo real.
   * Contador de noites automático.
   * Limite rígido de capacidade para até 8 hóspedes.
   * Redirecionamento direto com parâmetros preenchidos para a página oficial do Airbnb.
7. **Localização e Mapa Interativo:**
   * Coordenadas geográficas exatas (`-26.8357° S, 32.8855° E`).
   * Mapa interativo OpenStreetMap com marcador personalizado e destaques regionais.

---

## 🚀 Deploy na Vercel

O projeto foi construído em arquitetura estática pura (HTML, CSS e JavaScript puros), sem necessidade de etapas de compilação (*build step*).

### Método 1: Pela interface da Vercel (Recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login.
2. Clique em **"Add New..."** &rarr; **"Project"**.
3. Importe o repositório `appbuilderleo/vilaflor`.
4. Em **Framework Preset**, deixe selecionado **"Other"**.
5. Clique em **"Deploy"**. O site estará no ar em poucos segundos com SSL automático e CDN global.

---

## 💻 Execução Local

Para testar localmente antes do deploy:

```bash
# Iniciar o servidor local nativo
node server.mjs
```

Abra [http://127.0.0.1:3000](http://127.0.0.1:3000) no seu navegador.

---

## 📄 Direitos & Créditos

* **Propriedade:** Vila Flor, Ponta do Ouro, Moçambique.
* **Anúncio Oficial Airbnb:** [airbnb.com.br/rooms/1133096153786064159](https://www.airbnb.com.br/rooms/1133096153786064159)
* Todas as reservas oficiais são processadas de forma segura diretamente através do Airbnb.
