'use strict'
const User = use('App/Models/User');
const Wallet = use('App/Models/Wallet');
const Logger = use('Logger');
class UserController {
    /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, auth,  response, view }) {
    try {
      const isauth = await auth.check()
      console.log(auth.check());

      if(isauth){
        const users = await User.all();
        response.json({
          error: false,
          message : "all users returned",
          users: users
        });
      }else{
        response.status(401).json( {
          error: true,
          message : 'Missing or d jwt token'
        });
      }

    } catch (error) {
      response.status(401).json( {
        error: true,
        message : 'Missing or invalid jwt token'
      });
    }


  }



  /**
   * Create/save a new payement.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    console.log(request.post())
    // console.log(request.body)

    if(!request.post()){
      response.status(401).json({
        error : true,
        message : "Data invalid",
      });
    }
    var { firstname, lastname,phone, username, email, password, isactive, longitude, latitude} = request.post();
    const status = 10000;
    longitude == null ? longitude = 0 : longitude = longitude;
    latitude == null ? latitude = 0 : latitude = latitude;
    isactive == null ? isactive = 0 : isactive = isactive;

    try {
      const user = await User.create({firstname: firstname, lastname:lastname, phone: phone, username : username, email: email , password: password, isactive: isactive, status: status, longitude: longitude, latitude: latitude});
      Logger.info('Saved one user' + new Date());
      //Create user Wallet here
      function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
      var wallet_number = makeid(12);
      console.log(wallet_number);

      const wallet = await Wallet.create({user_id : user.id, amount:0, wallet_number:wallet_number , paypal: null, bank: null, mobile: user.phone, is_active:true});
      response.status(200).json({
        error: false,
        message : "User & Wallet created",
        id : user.id,
        user: user,
        wallet : wallet
      });
    } catch (error) {
      response.status(error.status).json({
        message : "An error occured",
      });
    }
  }

  /**
   * Display a single payement.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, auth,  response, view }) {
    try {
      await auth.check()
      const user =  User.all();
      response.json({
        message : "all users returned",
        users: user
      });
    } catch (error) {
      response.send('Missing or invalid jwt token')
    }
  }


  /**
   * Update payement details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth, response }) {
  }

  /**
   * Delete a payement with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, auth, response }) {
  }
}

module.exports = UserController
