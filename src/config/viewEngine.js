import express from 'express';

const configViewEngine = (app) => {
  // Thiết lập view engine
  app.set('view engine', 'ejs');
  
  // Thiết lập thư mục chứa views
  app.set('views', './src/views');
  
  // Thiết lập thư mục chứa static files (images, css, js, ...)
  app.use(express.static('./src/public'));
};

export default configViewEngine;
