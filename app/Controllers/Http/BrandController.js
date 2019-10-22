'use strict'

const Brand = use("App/Models/Brand")

class BrandController {

    async findAll({ response }) {
        const brand = await Brand.all()

        return response.json({
            "status": "success",
            "message": "",
            "data": brand
        })
    }

    async findById({ params, response }) {
        const brand = await Brand.find(params.id)

        if (!brand) {
            return response.status(401).json({
                "status": "error",
                "message": "Brand not found",
                "data": []
            })
        }

        return response.json({
            "status": "success",
            "message": "",
            "data": brand
        })
    }

    async create({ request, response }) {

        const bodyParser = request.all()

        const brand = new Brand()
        brand.name = bodyParser.name

        await brand.save()

        return response.status(201).json({
            "status": "success",
            "message": "Registry created successfully",
            "data": brand
        })
    }

    async update({ params, request, response }) {
        const bodyParser = request.all()
        const brand = await Brand.find(params.id);

        if (!brand) {
            return response.status(401).json({
                "status": "error",
                "message": "Brand not found",
                "data": []
            })
        }

        brand.name = bodyParser.name

        await brand.save()

        return response.json({
            "status": "success",
            "message": "Registry updated successfully",
            "data": brand
        })
    }

    async destroy({ params, auth, response }) {
        const brand = await Brand.find(params.id)

        if (!brand) {
            return response.status(401).json({
                "status": "error",
                "message": "Brand not found",
                "data": []
            })
        }

        await brand.delete()
    }

}

module.exports = BrandController
