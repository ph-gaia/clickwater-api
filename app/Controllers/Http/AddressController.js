'use strict'

const Address = use("App/Models/Address")

class AddressController {

    async findAll({ auth, response }) {
        const address = await Address.query().where("user_id", auth.user.user_id).fetch()

        if (!address) {
            return response.status(401).json({
                "status": "error",
                "message": "Address not found",
                "data": []
            })
        }

        return response.json({
            "status": "success",
            "message": "",
            "data": address
        })
    }

    async findById({ params, response }) {
        const address = await Address.find(params.id)

        if (!address) {
            return response.status(401).json({
                "status": "error",
                "message": "Address not found",
                "data": []
            })
        }

        return response.json({
            "status": "success",
            "message": "",
            "data": address
        })
    }

    async create({ request, auth, response }) {
        const bodyParser = request.all()

        const address = new Address()
        address.user_id = auth.user.user_id
        address.name = bodyParser.name
        address.zip_code = bodyParser.zipCode
        address.address = bodyParser.address
        address.number = bodyParser.number
        address.neighborhood = bodyParser.neighborhood
        address.city = bodyParser.city
        address.state = bodyParser.state
        address.gps_lat = bodyParser.latitude
        address.gps_long = bodyParser.longitude

        await address.save()

        return response.json({
            "status": "success",
            "message": "Registry created successfully",
            "data": address
        })
    }

    async update({ params, request, response }) {
        const bodyParser = request.all()
        const address = await Address.find(params.id)

        if (!address) {
            return response.status(401).json({
                "status": "error",
                "message": "Address not found",
                "data": []
            })
        }
        address.name = bodyParser.name
        address.zip_code = bodyParser.zipCode
        address.address = bodyParser.address
        address.number = bodyParser.number
        address.neighborhood = bodyParser.neighborhood
        address.city = bodyParser.city
        address.state = bodyParser.state
        address.gps_lat = bodyParser.latitude
        address.gps_long = bodyParser.longitude

        await address.save()

        return response.json({
            "status": "success",
            "message": "Registry updated successfully",
            "data": address
        })
    }

    async destroy({ params, auth, response }) {
        const address = await Address.find(params.id)

        if (!address) {
            return response.status(401).json({
                "status": "error",
                "message": "Address not found",
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

module.exports = AddressController
