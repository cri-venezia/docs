---
title: Panoramica
description: Documentazione per il plugin CRI Trasporti per la gestione delle richieste di trasporto sanitario.
hide:
  - toc
---

# Cos'è "CRI Trasporti"?

CRI Trasporti è un plugin personalizzato per WordPress, sviluppato per il Comitato di Venezia della Croce Rossa Italiana, con l'obiettivo di **automatizzare e digitalizzare il flusso delle richieste di trasporto sanitario** ricevute quotidianamente.

Il cuore del plugin è un **form multi-pagina** sul sito web istituzionale, che guida l'utente (cittadino, struttura sanitaria) nella compilazione di tutti i dettagli necessari per organizzare il trasporto. Le richieste vengono poi inviate alla Segreteria per la gestione e l'assegnazione.

---

## Il Form di Richiesta Frontend

Il processo di richiesta è suddiviso in tre passaggi guidati:

### Pagina 1: Informazioni sul Trasporto
* **Dati Richiedente:** Nome e Cognome.
* **Data del Trasporto:** Selezionata tramite calendario (datepicker).
* **Motivazione del Trasporto:** Menu a tendina (Visita, Trasferimento, Ricovero, Dimissioni, Altro) con campi condizionali.

### Pagina 2: Luogo di Prelievo Paziente
* **Domicilio:** Indirizzo, Piano, Ascensore (Sì/No), Larghezza Scale.
* **RSA / Ambulatorio / Ospedale:** Nome e Indirizzo struttura.

### Pagina 3: Dati Anagrafici Paziente
* Data e Luogo di Nascita, Codice Fiscale, Telefono, Email.

---

## Funzionamento Post-Invio

Una volta che l'utente completa e invia il form:

1.  **Notifica Utente:** L'utente riceve un'**email di conferma** automatica che attesta l'avvenuta ricezione della richiesta da parte del Comitato.
2.  **Notifica Segreteria:** La Segreteria riceve un'**email di notifica** contenente tutti i dettagli della richiesta inserita, pronta per essere processata.
3.  **Salvataggio Dati:** La richiesta viene salvata nel database di WordPress per la gestione da parte degli operatori.

---

## A chi serve questa documentazione?

<div class="grid cards" markdown>
<div class="md-typeset__card" markdown>
<h2>Utenti Richiedenti</h2>
<p>Cittadini o personale di strutture che devono compilare il form per richiedere un trasporto. <a href="compilazione_form/">Guida alla Compilazione &rarr;</a></p> <!-- Link alla sottocartella -->
</div>
<div class="md-typeset__card" markdown>
<h2>Operatori di Segreteria</h2>
<p>Personale responsabile della ricezione (anche via email), validazione, assegnazione e monitoraggio delle richieste. <a href="segreteria/">Guida alla Gestione &rarr;</a></p> <!-- Link alla sottocartella -->
</div>
<!-- Card Amministratori RIMOSSA -->
</div>

---