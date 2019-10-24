'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/login', 'UserController.login').prefix('api/v1')
Route.post('/users', 'UserController.create')

// route users
Route.group(() => {
  Route.get('/users', 'UserController.findAll')
  Route.get('/users/:id', 'UserController.findById')
  Route.put('/users/:id', 'UserController.update')
  Route.delete('/users/:id', 'UserController.destroy')
}).prefix('api/v1');

// route address
Route.group(() => {
  Route.get('/address', 'AddressController.findAll')
  Route.get('/address/:id([0-9]+)', 'AddressController.findById')
  Route.post('/address', 'AddressController.create')
  Route.put('/address/:id([0-9]+)', 'AddressController.update')
  Route.delete('/address/:id([0-9]+)', 'AddressController.destroy')
}).prefix('api/v1').middleware('auth')

// route seller
Route.group(() => {
  Route.get('/seller', 'SellerController.findAll')
  Route.get('/seller/:id([0-9]+)', 'SellerController.findById')
  Route.post('/seller', 'SellerController.create')
  Route.put('/seller/:id([0-9]+)', 'SellerController.update')
  Route.delete('/seller/:id([0-9]+)', 'SellerController.destroy')
  Route.get('/seller/popular', 'SellerController.popular')
  Route.get('/seller/offers', 'SellerController.offers')
  Route.get('/seller/news', 'SellerController.news')
}).prefix('api/v1').middleware('auth')

// route product
Route.group(() => {
  Route.get('/product', 'ProductController.findAll')
  Route.get('/product/:id', 'ProductController.findById')
  Route.post('/product', 'ProductController.create')
  Route.put('/product/:id', 'ProductController.update')
  Route.delete('/product/:id', 'ProductController.destroy')
}).prefix('api/v1').middleware('auth')

// route brand
Route.group(() => {
  Route.get('/brand', 'BrandController.findAll')
  Route.get('/brand/:id', 'BrandController.findById')
  Route.post('/brand', 'BrandController.create')
  Route.put('/brand/:id', 'BrandController.update')
  Route.delete('/brand/:id', 'BrandController.destroy')
}).prefix('api/v1').middleware('auth')

// route product category
Route.group(() => {
  Route.get('/category', 'CategoryController.findAll')
  Route.get('/category/:id', 'CategoryController.findById')
  Route.post('/category', 'CategoryController.create')
  Route.post('/category/images', 'CategoryController.store')
  Route.put('/category/:id', 'CategoryController.update')
  Route.delete('/category/:id', 'CategoryController.destroy')
}).prefix('api/v1').middleware('auth')

// route orders
Route.get('/orders', 'OrderController.findAll')
Route.get('/orders/:id', 'OrderController.findById')
Route.post('/orders', 'OrderController.create')
Route.put('/orders/:id', 'OrderController.update')
Route.delete('/orders/:id', 'OrderController.destroy')

