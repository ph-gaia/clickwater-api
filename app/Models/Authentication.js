'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Authentication extends Model {
    static boot() {
        super.boot()

        this.addHook('beforeSave', async (UserInstance) => {
            if (UserInstance.dirty.password) {
                UserInstance.password = await Hash.make(UserInstance.password)
            }
        })
    }

    user() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Authentication
