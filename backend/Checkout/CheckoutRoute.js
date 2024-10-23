const express = require('express');
const router = express.Router();
const checkoutController = require('./CheckoutFlow');

module.exports = (pool) => {
    router.post('/', checkoutController.processCheckout(pool));
    return router;
};
