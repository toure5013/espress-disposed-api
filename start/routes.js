'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.group(() => {

  //Authentication
  Route.post('login', "AuthController.login");
  Route.get('logout', 'AuthController.logout').middleware('auth')



  //User routes
  Route.get('users', "UserController.index").middleware('auth');
  Route.post('user', 'UserController.store');
  Route.get('user/:id', "UserController.show").middleware('auth');
  Route.put('user/:id', 'UserController.update').middleware('auth');
  Route.delete('user/id', 'UserController.delete').middleware('auth');




  //For all payement route
  Route.get('payement', "PayementController.index");
  Route.post('payement', "PayementController.store");
}).prefix('api');
