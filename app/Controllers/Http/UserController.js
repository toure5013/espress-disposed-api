'use strict'
const User = use('App/Models/User');
const Wallet = use('App/Models/Wallet');
const Logger = use('Logger');
// Bring in validator
// const { validate } = use('Validator')

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

    // console.log(request.post())
    let users;
    let userlength ;
    if(await User.count()){
      users = await User.count('id')
       userlength = +(users[0]["count"]) + 1;
    }else{
      userlength = 1;
    }
    // console.log(userlength);
    // console.log(request.body)
    //user.name = request.input('name')
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
      const user = await User.create({user_id : userlength, firstname: firstname, lastname:lastname, phone: phone, username : username, email: email , password: password, isactive: isactive, status: status, longitude: longitude, latitude: latitude});
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

      const wallet = await Wallet.create({user_id : userlength, usermongoid: user['_id'], amount:0, wallet_number:wallet_number , paypal: null, bank: null, mobile: user.phone, is_active:true});
      response.status(200).json({
        error: false,
        message : "User & Wallet created",
        id: userlength,
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
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, auth,  response, view }) {
    try {
      const isauth = await auth.check()
      if(isauth){
        const user_id = params.id;
        const user = await User.find(user_id);
        if(user){
          response.status(200).json({
            error: false,
            message : "User got",
            id : user.id,
            user: user,
          });
        }else{
          response.status(401).json({
              error: true,
              message : "This user don't exit!",
          });
        }

      }else{
        response.status(401).json({
          error: true,
          message : "Can't get user ! please send valid token",
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
   * Update payement details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth, response }) {

    try {
      const id = params.id;
      var { firstname, lastname,phone, username, email, password, isactive, longitude, latitude} = request.post();
      //check if email not took

      if(!request.post()){
        response.status(401).json({
          error : true,
          message : "Data invalid",
        });
      }
      //update
      const user = await User.find(params.id);
      if(!user){
        response.status(401).json({
          error : true,
          message : "User don't exist, retry!",
        });
      }

      user.firstname = firstname == null ?user.firstname :  firstname ;
      user.lastname = lastname == null ? user.lastname : lastname ;
      user.phone = phone == null ? user.phone : phone ;
      user.username = username == null ?  user.username : username ;
      user.email = email == null ?  user.email : email ;
      user.password = password == null ?  user.password : password ;
      user.isactive = isactive == null ? user.isactive : isactive ;
      user.longitude = longitude == null ?   user.longitude : longitude ;
      user.latitude = latitude == null ? user.latitude : latitude ;

      //Logger
      Logger.info('Updated one user' + new Date() );

      //save new information
      const resp = await user.save()
      console.log('resp    ----' + resp);
      response.status(200).json({
        error: false,
        message : "User updated",
        id : user.id,
        user: user,
      });
    } catch (error) {
      response.status(error.status).json({
        message : "An error occured",
      });
    }
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
    try {
      const isauth = await auth.check()
      if(isauth){
        const user_id = params.id;
        const user = await User.find(user_id);
        if(user){
          await user.delete()
          //delete user wallet && all his information
          response.status(200).json({
            error: false,
            message : "User deleted",
            id : user.id,
            user: user,
          });
        }else{
          response.status(401).json({
              error: true,
              message : "this user don't exit!",
          });
        }

      }else{
        response.status(401).json({
          error: true,
          message : "Can't delete, retry! please send valid token",
        });
      }
    } catch (error) {
      response.status(401).json( {
        error: true,
        message : 'Missing or invalid jwt token'
      });
    }

  }
}

module.exports = UserController
