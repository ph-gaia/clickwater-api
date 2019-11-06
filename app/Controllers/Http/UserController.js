'use strict'

const User = use("App/Models/User")
const Authentication = use("App/Models/Authentication")

class UserController {

    async findAll({ response }) {
        const user = await User.all()

        return response.json({
            "status": "success",
            "message": "",
            "data": user
        })
    }

    async findById({ params, response }) {
        const user = await User.find(params.id)

        if (!user) {
            return response.status(401).json({
                "status": "error",
                "message": "User not found",
                "data": []
            })
        }

        return response.json({
            "status": "success",
            "message": "",
            "data": user
        })
    }

    async create({ request, auth, response }) {

        const bodyParser = request.all()

        const user = new User()
        user.name = bodyParser.name
        user.email = bodyParser.email
        user.phone = bodyParser.phone
        user.date_birth = bodyParser.dateBirth

        await user.save()

        let dataAuth = new Authentication()
        dataAuth.username = bodyParser.username
        dataAuth.password = bodyParser.password
        dataAuth.active = 1
        dataAuth.user_id = user.id
        await dataAuth.save()

        return response.status(201).json({
            "status": "success",
            "message": "Registry created successfully",
            "data": user
        })
    }

    async login({ request, auth, response }) {
        const { username, password } = request.all()

        const token = await auth.attempt(username, password)

        const infoAuth = await Authentication.findBy('username', username)
        const user = await User.find(infoAuth.user_id)
        const result = Object.assign(user, { "token" : token.token });

        return response.json({
            "status": "success",
            "message": "User Autorized",
            "data": result
        })
    }

    async update({ params, request, response }) {
        const bodyParser = request.all()
        const user = await User.find(params.id);

        if (!user) {
            return response.status(401).json({
                "status": "error",
                "message": "User not found",
                "data": []
            })
        }

        user.name = bodyParser.name
        user.email = bodyParser.email
        user.phone = bodyParser.phone
        user.date_birth = bodyParser.dateBirth

        await user.save()

        return response.json({
            "status": "success",
            "message": "Registry updated successfully",
            "data": user
        })
    }

    async destroy({ params, auth, response }) {
        const user = await User.find(params.id)

        if (!user) {
            return response.status(401).json({
                "status": "error",
                "message": "User not found",
                "data": []
            })
        }

        if (user.id !== auth.user.user_id) {
            return response.status(401).send({
                "status": "error",
                "message": "Not authorized",
                "data": []
            })
        }

        await user.delete()
    }

}

module.exports = UserController
