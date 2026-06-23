# HubSpot Integrating With HubSpot I: Foundations Practicum

A Node.js application that integrates with the HubSpot CRM API to display and create custom object records.

## Custom Object List View

Link to the custom object list in HubSpot test account:

```
https://app.hubspot.com/contacts/246502677/objects/2-231549011/views/all/list
```

> \*\*TODO:\*\* Replace `<YOUR\_TEST\_ACCOUNT\_ID>` and `<YOUR\_CUSTOM\_OBJECT\_ID>` with your actual values from HubSpot.

\---

## Features

* **Homepage (`/`)** — Displays all custom object records in a table with 3 custom properties: Name, Publisher, Price
* **Add Record (`/update-cobj`)** — HTML form to create a new CRM record via HubSpot API
* **POST handler** — Submits form data to HubSpot and redirects back to homepage

## Custom Object

This app uses a **Video Games** custom object with the following properties:

* `name` (string) — Game title **(required)**
* `publisher` (string) — Game publisher
* `price` (string) — Game price

## Setup Instructions

### 1\. Clone this repo

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2\. Install dependencies

```bash
npm install
```

### 3\. Create your `.env` file

```bash
cp .env.example .env
```

Then edit `.env` and add your values:

```
PRIVATE\_APP\_ACCESS\_TOKEN=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CUSTOM\_OBJECT\_TYPE=2-XXXXXXX
```

**Where to find these values:**

* `PRIVATE\_APP\_ACCESS\_TOKEN`: HubSpot account → Settings → Integrations → Private Apps → your app → Show Token
* `CUSTOM\_OBJECT\_TYPE`: HubSpot account → Settings → Objects → Custom Objects → your object → copy the ID (starts with `2-`)

### 4\. HubSpot Setup

In your HubSpot developer test account:

1. **Create a Private App** named `<YourName>'s Practicum Private App` with scopes:

   * `crm.schemas.custom` (read \& write)
   * `crm.objects.custom` (read \& write)
   * `crm.objects.contacts` (read \& write)
2. **Create a Custom Object** (Video Games) with 3 properties:

   * `name` — Single-line text
   * `publisher` — Single-line text
   * `price` — Single-line text
3. **Add at least 3 records** to the custom object in HubSpot.
4. **Associate** the custom object with the Contacts object type.

### 5\. Run the app

```bash
node index.js
```

Open your browser at: `http://localhost:3000`

\---

## Project Structure

```
├── public/
│   └── css/
│       └── style.css
├── views/
│   ├── homepage.pug     ← Table view of all custom object records
│   └── updates.pug      ← Form to add new records
├── .env.example
├── .gitignore
├── index.js             ← Express app with 3 routes
├── package.json
└── README.md
```

## Routes

|Method|Route|Description|
|-|-|-|
|GET|`/`|Homepage — fetch \& display all records in a table|
|GET|`/update-cobj`|Render the add-record form|
|POST|`/update-cobj`|Submit form → create CRM record → redirect to `/`|

## Tech Stack

* **Node.js** + **Express** — web server
* **Axios** — HTTP requests to HubSpot API
* **Pug** — HTML templating
* **dotenv** — environment variable management

