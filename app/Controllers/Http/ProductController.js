'use strict'

const Helpers = use('Helpers')
const Product = use("App/Models/Product")

class ProductController {

    async findAll({ response }) {
        const product = await Product.all()

        return response.json({
            "status": "success",
            "message": "",
            "data": product
        })
    }

    async findById({ params, response }) {
        const product = await Product.find(params.id)

        if (!product) {
            return response.status(401).json({
                "status": "error",
                "message": "Product not found",
                "data": []
            })
        }

        return response.json({
            "status": "success",
            "message": "",
            "data": product
        })
    }

    async create({ request, response }) {

        const bodyParser = request.all()

        const product = new Product()
        product.name = bodyParser.name
        product.description = bodyParser.description
        product.brand = bodyParser.brand
        product.brand_id = bodyParser.brandId
        product.category_id = bodyParser.categoryId
        product.addtional_info = bodyParser.addtionalInfo
        product.url = "produto/"
        product.active = 1
        
        const image = request.file('image', {
            types: ['image'],
            size: '2mb'
        })

        if (!image) {
            product.image_url = `${Date.now()}-${image.clientName}`

            await image.move(Helpers.publicPath('uploads/images'), {
                name: product.image_url,
                overwrite: true
            })

            if (!image.moved()) {
                return image.errors()
            }
        }

        await product.save()

        return response.status(201).json({
            "status": "success",
            "message": "Registry created successfully",
            "data": product
        })
    }

    async update({ params, request, response }) {
        const bodyParser = request.all()
        const product = await Product.find(params.id);

        if (!product) {
            return response.status(401).json({
                "status": "error",
                "message": "Product not found",
                "data": []
            })
        }

        product.name = bodyParser.name
        product.description = bodyParser.description
        product.brand = bodyParser.closeTime
        product.brand_id = bodyParser.pickupFromShop
        product.category_id = bodyParser.homeDelivery
        product.addtional_info = bodyParser.maxDeliveryDistance
        product.url = bodyParser.minOrder
        product.active = 1

        const image = request.file('image', {
            types: ['image'],
            size: '2mb'
        })

        product.image_url = `${Date.now()}-${image.clientName}`

        await image.move(Helpers.publicPath('uploads/images'), {
            name: product.image_url,
            overwrite: true
        })

        if (!image.moved()) {
            return image.errors()
        }

        await product.save()

        return response.json({
            "status": "success",
            "message": "Registry updated successfully",
            "data": product
        })
    }

    async destroy({ params, auth, response }) {
        const product = await Product.find(params.id)

        if (!product) {
            return response.status(401).json({
                "status": "error",
                "message": "Product not found",
                "data": []
            })
        }

        if (product.id !== auth.product.product_id) {
            return response.status(401).send({
                "status": "error",
                "message": "Not authorized",
                "data": []
            })
        }

        await product.delete()
    }

}

module.exports = ProductController
