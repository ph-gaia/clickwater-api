'use strict'

const Order = use("App/Models/Order")
const OrderItem = use("App/Models/OrderItem")
const User = use("App/Models/User")
const Seller = use("App/Models/Seller")
const Address = use("App/Models/Address")

class OrderController {

    async findAll({ auth, response }) {
        const order = await Order.query().where("orders.user_id", auth.user.user_id).fetch()
        
        var result = [];
        order.forEach(function(element) {
            const user = User.find(element.user_id)
            const seller = Seller.find(element.seller_id)
            const address = Address.find(params.id)

            result = {"user" : user, "seller" : seller, "address" : address};
            element.push(result);
        });

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
        order.total_amount = bodyParser.total_amount
        order.amount_payable = bodyParser.amount_payable
        order.requested_delivery_time = bodyParser.requested_delivery_time

        await order.save()

        bodyParser.products.forEach(element => {
            const itens = new OrderItem()

            itens.order_id = order.id
            itens.product_id = element.product_id
            itens.name = element.name
            itens.brand = element.brand
            itens.price = element.price
            itens.discount = element.discount
            itens.quantity = element.quantity
            itens.order_count = 8

            itens.save()
        });

        return response.json({
            "status": "success",
            "message": "Registry created successfully",
            "data": order
        })
    }

}

module.exports = OrderController
