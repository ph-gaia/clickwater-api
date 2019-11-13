'use strict'

const Helpers = use('Helpers')
const ProductCategory = use("App/Models/ProductCategory")

class CategoryController {

    async findAll({ response }) {
        const category = await ProductCategory.all()

        return response.json({
            "status": "success",
            "message": "",
            "data": category
        })
    }

    async findById({ params, response }) {
        const category = await ProductCategory.find(params.id)

        if (!category) {
            return response.status(401).json({
                "status": "error",
                "message": "Product Category not found",
                "data": []
            })
        }

        return response.json({
            "status": "success",
            "message": "",
            "data": category
        })
    }

    async create({ request, response }) {

        const bodyParser = request.all()

        const category = new ProductCategory()
        category.name = bodyParser.name
        category.description = bodyParser.description
        category.sort_order = bodyParser.sortOrder
        category.active = 1

        await category.save()

        return response.status(201).json({
            "status": "success",
            "message": "Registry created successfully",
            "data": category
        })
    }

    async update({ params, request, response }) {
        const bodyParser = request.all()
        const category = await ProductCategory.find(params.id);

        if (!category) {
            return response.status(401).json({
                "status": "error",
                "message": "ProductCategory not found",
                "data": []
            })
        }

        category.name = bodyParser.name
        category.description = bodyParser.description
        category.sort_order = bodyParser.sortOrder
        category.active = 1

        const image = request.file('image', {
            types: ['image'],
            size: '2mb'
        })

        category.image_url = `${Date.now()}-${image.clientName}`

        await image.move(Helpers.publicPath('uploads/images'), {
            name: category.image_url,
            overwrite: true
        })

        if (!image.moved()) {
            return image.errors()
        }

        await category.save()

        return response.json({
            "status": "success",
            "message": "Registry updated successfully",
            "data": category
        })
    }

    async destroy({ params, auth, response }) {
        const category = await ProductCategory.find(params.id)

        if (!category) {
            return response.status(401).json({
                "status": "error",
                "message": "Product Category not found",
                "data": []
            })
        }

        await category.delete()
    }

}

module.exports = CategoryController
