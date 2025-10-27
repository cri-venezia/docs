---
title: Creazione e Configurazione Corso
description: Guida dettagliata per gli Amministratori sulla creazione di un nuovo corso con il plugin CRI Corsi.
---

# Creare e Configurare un Corso

Questa guida è destinata agli **Amministratori del Sito (Segreteria)** e spiega come creare un nuovo corso e configurare tutti i dettagli necessari per la sua pubblicazione e prenotazione.

## 1. Creare un Nuovo Corso

Per iniziare, accedi alla bacheca di WordPress e naviga su:

**CRI Corsi > Aggiungi Nuovo**

Si aprirà l'editor standard di WordPress.

| Azione | Immagine (CDN) |
| :--- | :--- |
| Navigazione nel menu amministrativo. | ![]({{ config.extra.cdn_url }}/img/menu_admin_corsi.png) |
| Editor del nuovo corso. | ![]({{ config.extra.cdn_url }}/img/nuovo_corso.png) |

## 2. Campi Standard di WordPress

Compila i campi base nell'interfaccia standard di WordPress:

* **Titolo:** Il nome ufficiale del corso (es. "Corso BLSD per la popolazione").
* **Editor di Testo:** La descrizione completa del corso, cosa si impara, a chi è rivolto, ecc.
* **Immagine in Evidenza:** (Sul lato destro) L'immagine principale del corso che apparirà nella griglia.

## 3. Il Riquadro "Dettagli Corso"

Sotto l'editor di testo principale, troverai il riquadro **"Dettagli Corso"**. Qui si trova il cuore della configurazione del plugin.

!!! info "Nota"
    Questo riquadro è diviso in schede (Date e Orari, Configurazione Corso) per mantenere l'interfaccia pulita.

### 3.1 Date e Orari Corso

Questo campo è un **"ripetitore"** e gestisce le sessioni prenotabili del corso.

| Campo | Funzione | Importanza |
| :--- | :--- | :--- |
| **Data** | Seleziona la data della sessione dal calendario. | Obbligatorio |
| **Durata** | Un campo di testo per specificare la durata (es. "4 ore", "09:00 - 13:00"). | Indicativo |
| **Posti Disponibili** | Il numero massimo di persone che possono iscriversi a questa specifica sessione. | Cruciale |

### 3.2 Configurazione Corso

Questi campi definiscono le regole principali e il meccanismo di pagamento.

#### Destinazione

Seleziona il target del corso:

* **Popolazione:** Per corsi standard aperti a tutti.
* **Aziende:** Attiverà i campi "Ragione Sociale" e "P.IVA" nel modulo di prenotazione per la fatturazione.

#### Prezzo e Pagamenti

| Campo | Funzione | Note Importanti |
| :--- | :--- | :--- |
| **Prezzo** | Inserisci il costo del corso (es. `50.00`). | **Lascia vuoto se il corso è gratuito.** |
| **ID Prodotto WooCommerce** | L'ID numerico del prodotto creato nel catalogo WooCommerce. | Se compilato (e il Prezzo è impostato), l'utente viene reindirizzato al carrello per il pagamento. |

!!! warning "Attenzione"
    Per i corsi a pagamento, è **obbligatorio** creare il prodotto corrispondente in **WooCommerce > Prodotti** *prima* di compilare questo campo.

#### Indirizzo e Mappa

| Campo | Funzione |
| :--- | :--- |
| **Indirizzo (per Mappa)** | Inserisci l'indirizzo completo dove si terrà il corso (es. Via Porto di Cavergnago, 38/B, Venezia). |

Se questo campo è compilato, il widget di Elementor visualizzerà automaticamente una mappa Leaflet interattiva.

## 4. Pubblicazione

Una volta compilati tutti i campi, clicca sul pulsante **"Pubblica"** (in alto a destra) come faresti per un normale articolo di WordPress.

!!! success "Completato"
    Il tuo corso è ora attivo e pronto per essere prenotato. Ricorda di inserirlo in una pagina tramite il widget Elementor!


Adesso che la guida per gli Amministratori è completa, passiamo alla documentazione per i **Docenti** (Pannello "Gestione Date"). Sei pronto?