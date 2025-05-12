const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('put your own stripe secret key here');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const amount = req.body.amount || 1000;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});