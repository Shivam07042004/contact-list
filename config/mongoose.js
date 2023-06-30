const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/contact_list_db2')
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
