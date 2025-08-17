import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initDB, insertInteraction, getInteractions } from './db.js';
import { classify } from './classifier.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

initDB();

app.get('/interactions', async (req, res) => {
  const interactions = await getInteractions();
  res.json(interactions);
});

app.post('/interactions', async (req, res) => {
  const { text } = req.body;
  const classification = classify(text);
  await insertInteraction(text, classification);
  res.json({ text, classification });
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
