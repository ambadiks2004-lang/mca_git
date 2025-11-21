const express = require('express');
const cors = require('cors');
const app = express();
const suppliersRoute = require('./routes/suppliers');

app.use(cors());
app.use(express.json());

app.use('/api/suppliers', suppliersRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
