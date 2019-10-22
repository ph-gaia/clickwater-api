'use strict'

const Seller = use("App/Models/Seller")

class SellerController {

    async findAll({ response }) {
        const seller = await Seller.all()

        return response.json({
            "status": "success",
            "message": "",
            "data": seller
        })
    }

    async findById({ params, response }) {
        const seller = await Seller.find(params.id)

        if (!seller) {
            return response.status(401).json({
                "status": "error",
                "message": "Seller not found",
                "data": []
            })
        }

        return response.json({
            "status": "success",
            "message": "",
            "data": seller
        })
    }

    async create({ request, auth, response }) {

        const bodyParser = request.all()

        const seller = new Seller()
        seller.name = bodyParser.name
        seller.open_time = bodyParser.openTime
        seller.close_time = bodyParser.closeTime
        seller.pickup_from_shop = bodyParser.pickupFromShop
        seller.home_delivery = bodyParser.homeDelivery
        seller.max_delivery_distance = bodyParser.maxDeliveryDistance
        seller.min_order = bodyParser.minOrder
        seller.delivery_charges = bodyParser.deliveryCharges
        seller.delivery_start_time = bodyParser.deliveryStartTime
        seller.delivery_end_time = bodyParser.deliveryEndTime
        seller.active = 1
        seller.address_id = bodyParser.addressId
        seller.user_id = auth.user.user_id

        await seller.save()

        return response.status(201).json({
            "status": "success",
            "message": "Registry created successfully",
            "data": seller
        })
    }

    async update({ params, request, response }) {
        const bodyParser = request.all()
        const seller = await Seller.find(params.id);

        if (!seller) {
            return response.status(401).json({
                "status": "error",
                "message": "Seller not found",
                "data": []
            })
        }

        seller.name = bodyParser.name
        seller.open_time = bodyParser.openTime
        seller.close_time = bodyParser.closeTime
        seller.pickup_from_shop = bodyParser.pickupFromShop
        seller.home_delivery = bodyParser.homeDelivery
        seller.max_delivery_distance = bodyParser.maxDeliveryDistance
        seller.min_order = bodyParser.minOrder
        seller.delivery_charges = bodyParser.deliveryCharges
        seller.delivery_start_time = bodyParser.deliveryStartTime
        seller.delivery_end_time = bodyParser.deliveryEndTime
        seller.active = 1
        seller.address_id = bodyParser.addressId

        await seller.save()

        return response.json({
            "status": "success",
            "message": "Registry updated successfully",
            "data": seller
        })
    }

    async destroy({ params, auth, response }) {
        const seller = await Seller.find(params.id)

        if (!seller) {
            return response.status(401).json({
                "status": "error",
                "message": "Seller not found",
                "data": []
            })
        }

        if (seller.user_id !== auth.user.user_id) {
            return response.status(401).send({
                "status": "error",
                "message": "Not authorized",
                "data": []
            })
        }

        await seller.delete()
    }

}

module.exports = SellerController
