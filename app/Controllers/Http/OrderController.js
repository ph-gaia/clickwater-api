'use strict'

class OrderController {

    index({ request, response }) {
        response.json("Hello world");
    }

}

module.exports = OrderController
