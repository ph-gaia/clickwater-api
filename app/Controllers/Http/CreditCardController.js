'use strict'

const Card = use("App/Models/CreditCard")

class CreditCardController {

    async findAll({ auth, response }) {
        const card = await Card.query().where("user_id", auth.user.user_id).fetch()

        if (!card) {
            return response.status(401).json({
                "status": "error",
                "message": "Credit Card not found",
                "data": []
            })
        }

        return response.json({
            "status": "success",
            "message": "",
            "data": card
        })
    }

    async findById({ params, response }) {
        const card = await Card.find(params.id)

        if (!card) {
            return response.status(401).json({
                "status": "error",
                "message": "Credit Card not found",
                "data": []
            })
        }

        return response.json({
            "status": "success",
            "message": "",
            "data": card
        })
    }

    async create({ request, auth, response }) {
        const bodyParser = request.all()

        const card = new Card()
        card.user_id = auth.user.user_id
        card.number = bodyParser.number
        card.enterprise = bodyParser.enterprise
        card.owner_full_name = bodyParser.ownerFullName
        card.owner_reg_number = bodyParser.ownerRegNumber
        card.expiry_month = bodyParser.expiryMonth
        card.expiry_year = bodyParser.expiryYear
        card.security_number = bodyParser.securityNumber

        await card.save()

        return response.json({
            "status": "success",
            "message": "Registry created successfully",
            "data": card
        })
    }

    async destroy({ params, auth, response }) {
        const card = await Card.find(params.id)

        if (!card) {
            return response.status(401).json({
                "status": "error",
                "message": "Credit Card not found",
                "data": []
            })
        }

        if (address.user_id !== auth.user.user_id) {
            return response.status(401).send({
                "status": "error",
                "message": "Not authorized",
                "data": []
            })
        }

        await address.delete()
    }
}

module.exports = CreditCardController
