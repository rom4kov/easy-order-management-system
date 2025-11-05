# Easy Order Management System (EOMS)

**Easy Order Management System** ist ein Übungsprojekt, das ich zur Vertiefung meiner Kenntnisse in **Angular** und **NestJS** entwickelt habe. Es handelt sich um ein einfaches Order-Management-System (OMS) für kleine bis mittlere Unternehmen (KMUs).  

Das Projekt zeigt die Integration moderner Frontend- und Backend-Technologien sowie den Deployment-Prozess auf einem Linux-Server.

---

## 🚀 Features

- Verwaltung von Kunden und Aufträgen
- Übersichtliche Tabellenansichten für Kunden und Orders
- Statusverwaltung von Aufträgen (`angelegt`, `in Bearbeitung`, `abgeschlossen`, `storniert`)
- Filterung und Sortierung von Kunden- und Order-Daten
- Responsive Frontend mit **Angular**, **TailwindCSS** und **Angular Material**
- REST-API Backend mit **NestJS**, **TypeORM** und **PostgreSQL**
- Deployed auf einem **Hetzner VPS** mit **nginx** als Reverse Proxy

---

## 🛠 Tech Stack

**Frontend:**
- Angular
- Angular Material
- TailwindCSS
- TypeScript

**Backend:**
- NestJS
- TypeORM
- PostgreSQL

**Deployment:**
- Hetzner VPS
- nginx (Reverse Proxy)
- Systemd für Service Management

---

## 📦 Installation

### Backend
1. Repository klonen:
```bash
git clone [REPO_URL]
cd backend
```

2. Abhängigkeiten installieren:
```
pnpm install
```

3 .env Datei erstellen (Beispiel):

```
DATABASE_URL=postgres://user:password@localhost:5432/eoms
PORT=3000
```

Datenbankmigrationen ausführen:

```
pnpm run typeorm:migrate
```

Backend starten:

```
pnpm run start:dev
```

Frontend
In das Frontend-Verzeichnis wechseln:

```
cd frontend
```

Abhängigkeiten installieren:

```
pnpm install
```

Frontend starten:

```
pnpm run start
```

Standardmäßig erreichbar unter http://localhost:4200

📂 Projektstruktur

frontend/        # Angular + RxJS + TailwindCSS + Angular Material
backend/         # NestJS + TypeORM + PostgreSQL


🎬 Demo
Ein kurzes Video zur Präsentation der Funktionalität:
https://youtu.be/n0Dl4qS727A

📌 Hinweis
Dieses Projekt wurde im Rahmen einer Eigeninitiative entwickelt, um die Arbeit mit Angular, NestJS, TypeORM und modernen Deployment-Workflows zu vertiefen. Es ist nicht für den produktiven Einsatz gedacht.
