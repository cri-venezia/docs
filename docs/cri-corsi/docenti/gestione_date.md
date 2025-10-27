---
title: Utilizzo Pannello Gestione Date
description: Guida per i Docenti su come aggiungere, modificare e rimuovere le date dei corsi assegnati tramite il pannello dedicato.
---

# Utilizzo del Pannello "Gestione Date"

Questo pannello è stato progettato specificamente per i **Docenti** per permettere un aggiornamento rapido e semplice delle date dei corsi senza dover accedere all'editor completo di WordPress.

!!! success "Prerequisito"
    Per accedere a questa funzionalità, il tuo utente deve avere il ruolo "Docente" assegnato da un Amministratore. Se non hai questo ruolo, la voce di menu non sarà visibile.

## 1. Accesso al Pannello

1.  Accedi alla bacheca di WordPress.
2.  Nel menu laterale, vedrai la voce dedicata: **Gestione Date**. Cliccaci sopra. Questa voce è visibile *solo* se hai il ruolo "Docente".

![Voce di menu Gestione Date per Docenti]({{ config.extra.cdn_url }}/img/gestione_date.png)

## 2. L'Interfaccia del Pannello

La pagina "Gestione Date" presenta un'interfaccia semplificata per concentrarti solo sulla gestione delle date dei corsi a te assegnati.

![Pannello Generale Gestione Date]({{ config.extra.cdn_url }}/img/pannello_gestione_date.png)

### Elementi Principali:

Seleziona Corso
:   Un menu a tendina (`<select>`) che elenca **solo i corsi a cui sei stato assegnato** come docente dall'Amministratore. Scegli il corso che vuoi modificare.
    ![Selezione del Corso dal menu a tendina]({{ config.extra.cdn_url }}/img/selezione_corso.png)

Tabella Date Esistenti
:   Una volta selezionato un corso, appare una tabella che elenca tutte le date attualmente configurate per quel corso. Mostra: Data, Durata, Posti Disponibili e un pulsante **"Rimuovi"** per ogni data.

Modulo "Aggiungi Nuova Data"
:   Un semplice modulo per inserire una nuova sessione per il corso selezionato. Contiene i campi: Data, Durata e Posti Disponibili.

## 3. Operazioni Comuni

### 3.1 Aggiungere una Nuova Data

1.  Seleziona il corso desiderato dal menu a tendina **"Seleziona Corso"**.
2.  Nel modulo **"Aggiungi Nuova Data"**:
    * Clicca sul campo **Data** per aprire il selettore del calendario (date picker) e scegli la data desiderata.
        ![Selettore Data (Date Picker)]({{ config.extra.cdn_url }}/img/inserimento_data_corso_picker.png)
    * Inserisci la **Durata** (es. "8 ore", "14:00 - 18:00").
    * Inserisci i **Posti Disponibili** (numero intero).
3.  Clicca sul pulsante **"Aggiungi Data"**.
4.  La nuova data apparirà immediatamente nella tabella **"Date Esistenti"** sottostante e sarà visibile sul sito pubblico.
    ![Tabella Date Esistenti dopo l'inserimento]({{ config.extra.cdn_url }}/img/inserimento_data_corso.png)

### 3.2 Rimuovere una Data Esistente

1.  Seleziona il corso desiderato dal menu a tendina.
2.  Individua la data che vuoi eliminare nella tabella **"Date Esistenti"**.
3.  Clicca sul pulsante **"Rimuovi"** corrispondente a quella riga.
4.  La data verrà eliminata immediatamente dal sistema e non sarà più prenotabile.

!!! danger "Attenzione"
    La rimozione di una data è **permanente**. Assicurati di volerla eliminare prima di cliccare "Rimuovi". Se ci sono già prenotazioni per quella data, queste non verranno cancellate automaticamente dal sistema (ma la data non sarà più visibile). Contatta la Segreteria se necessario.

### 3.3 Modificare una Data Esistente

!!! info "Funzionalità Attuale"
    Al momento, il pannello semplificato **non permette la modifica diretta** di una data esistente (es. cambiare l'orario o i posti).

Per modificare una data esistente:

1.  **Rimuovi** la data errata usando il pulsante "Rimuovi".
2.  **Aggiungi** una nuova data con le informazioni corrette usando il modulo "Aggiungi Nuova Data".