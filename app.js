const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes');
const errorHandler = require('./middleware/error-handler.js');
const path = require('path');

const morgan = require('morgan');
app.use(morgan('tiny'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)
app.use(errorHandler)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
