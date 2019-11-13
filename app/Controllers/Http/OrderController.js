'use strict'

const Order = use("App/Models/Order")
const OrderItens = use("App/Models/OrderIten")

class OrderController {

    async findAll({ auth, response }) {
        const order = await Order.query().where("user_id", auth.user.user_id).fetch()

        if (!order) {
            return response.status(401).json({
                "status": "error",
                "message": "Order not found",
                "data": []
            })
        }

        return response.json({
            "status": "success",
            "message": "",
            "data": order
        })
    }

    async findById({ params, response }) {
        const order = await Order.find(params.id)

        if (!order) {
            return response.status(401).json({
                "status": "error",
                "message": "Order not found",
                "data": []
            })
        }

        return response.json({
            "status": "success",
            "message": "",
            "data": order
        })
    }

    async create({ request, auth, response }) {
        const bodyParser = request.all()

        const order = new Order()
        order.user_id = auth.user.user_id
        order.seller_id = bodyParser.seller_id
        order.address_id = bodyParser.address_id
        order.status_id = 1 // ACCEPTED
        order.delivery_tax = bodyParser.delivery_tax
        order.not_avaiable_amount = bodyParser.not_avaiable_amount
        order.total_amount = bodyParser.total_amount
        order.amount_payable = bodyParser.amount_payable
        order.requested_delivery_time = bodyParser.requested_delivery_time

        await order.save()

        bodyParser.products.forEach(element => {
            const orderItens = new OrderItens()

            orderItens.order_id = order.id
            orderItens.product_id = element.product_id
            orderItens.name = element.name
            orderItens.brand = element.brand
            orderItens.price = element.price
            orderItens.discount = element.discount
            orderItens.quantity = element.quantity
            orderItens.order_count = 50
    
            await orderItens.save() 
        });

        return response.json({
            "status": "success",
            "message": "Registry created successfully",
            "data": order
        })
    }

}

module.exports = OrderController
