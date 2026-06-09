const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('combined'));

// Routes
app.use('/films', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true
}));

app.use('/projections', createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true
}));

app.use('/reservations', createProxyMiddleware({
    target: 'http://localhost:3003',
    changeOrigin: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway en écoute sur le port ${PORT}`);
});
