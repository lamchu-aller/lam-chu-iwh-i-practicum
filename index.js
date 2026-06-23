require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');

// ─── Config ──────────────────────────────────────────────────────────────────
const PRIVATE_APP_TOKEN = process.env.PRIVATE_APP_ACCESS_TOKEN;

// TODO: Replace with your actual custom object type ID after creating it
// Format: p{portal_id}_{object_label}  e.g. p12345678_videogames
// Find this in HubSpot > Settings > Objects > Custom Objects
const CUSTOM_OBJECT_TYPE = process.env.CUSTOM_OBJECT_TYPE || '2-XXXXXXX';

const headers = {
  Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
  'Content-Type': 'application/json',
};

// ─── ROUTE 1: Homepage — GET "/" ─────────────────────────────────────────────
// Fetches all custom object records and renders them in a table
app.get('/', async (req, res) => {
  const url = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;
  const params = {
    // Request all three custom properties
    properties: 'name,publisher,price',
    limit: 100,
  };

  try {
    const response = await axios.get(url, { headers, params });
    const records = response.data.results;

    res.render('homepage', {
      title: 'Custom Object Table | Integrating With HubSpot I Practicum',
      records,
    });
  } catch (error) {
    console.error('Error fetching custom objects:', error.response?.data || error.message);
    res.status(500).send(`
      <h2>Error fetching data</h2>
      <pre>${JSON.stringify(error.response?.data, null, 2)}</pre>
      <p>Check your PRIVATE_APP_ACCESS_TOKEN and CUSTOM_OBJECT_TYPE in .env</p>
    `);
  }
});

// ─── ROUTE 2: Form page — GET "/update-cobj" ─────────────────────────────────
// Renders the HTML form for adding a new custom object record
app.get('/update-cobj', (req, res) => {
  res.render('updates', {
    title: 'Update Custom Object Form | Integrating With HubSpot I Practicum',
  });
});

// ─── ROUTE 3: Create record — POST "/update-cobj" ────────────────────────────
// Receives form data, POSTs to HubSpot CRM API, redirects to homepage
app.post('/update-cobj', async (req, res) => {
  const { name, publisher, price } = req.body;

  const url = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;
  const payload = {
    properties: {
      name: name,
      publisher: publisher,
      price: price,
    },
  };

  try {
    await axios.post(url, payload, { headers });
    // After creating the record, redirect back to homepage to see updated table
    res.redirect('/');
  } catch (error) {
    console.error('Error creating custom object:', error.response?.data || error.message);
    res.status(500).send(`
      <h2>Error creating record</h2>
      <pre>${JSON.stringify(error.response?.data, null, 2)}</pre>
      <a href="/update-cobj">← Back to form</a>
    `);
  }
});

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅  App running at: http://localhost:${PORT}`);
  console.log(`   Homepage:   http://localhost:${PORT}/`);
  console.log(`   Add record: http://localhost:${PORT}/update-cobj\n`);
});
