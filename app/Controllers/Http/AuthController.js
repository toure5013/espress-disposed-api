'use strict'

//../app/Controllers/Http/AuthController.js

const User = use('App/Models/User');
const Logger = use('Logger');
class AuthController {
  /*
      async register({request, auth, response}) {

        let user = await User.create(request.all())

        //generate token for user;
        let token = await auth.generate(user)

        Object.assign(user, token) //cci est utilisé pour concatener un objet à un autre, et l'objet user contient desormais user et token

        return response.json(user)
      }
   */
  async login({
    request,
    auth,
    response
  }) {

    // console.log(request.post())
    //to login user send phone number and password, get user, with phone number and create a login with email

    let {
      email,
      password
    } = request.all();

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email);
        let token = await auth.generate(user)
        var result = {
          error: false,
          user: user,
          token : token,
          message: "Login with success"
        }
        Object.assign(user, token)
        return response.json(user)
      }
    } catch (e) {
      console.log(e)
      return response.json({
        error: true,
        message: 'You are not registered!'
      })
    }
  };

  async loginphone({
    request,
    auth,
    response
  }) {

    // console.log(request.post())
    //to login user send phone number and password, get user, with phone number and create a login with email

    let {
      phone,
      password
    } = request.all();

    try {
      let regex = new RegExp(/^((\+)[1-9]{2})[1-9](\d{2}){4}$/);
      let isPhoneNumber = regex.test(phone);
      console.log(!isPhoneNumber);

      if(!isPhoneNumber){
        response.status(401).json({
          error : true,
          message : "The phone number is invalid!",
        });
      }

      Logger.info('Log user with phone : ' + phone + '  -------- ' + new Date());
      //Get user information using his phone
      let user = await User.findBy('phone', phone);
      if(user == null){
        return response.status(403).json({
          error: true,
          message: 'You are not registered!'
        })
      }

      console.log(user.email);

      //extract user email
      let email = user.email;

      //verify if, user credentiel is correct and log him
      if (await auth.attempt(email, password)) {
        let token = await auth.generate(user)
        var result = {
          error: false,
          user: user,
          token : token,
          message: "Login with success!"
        }
        Object.assign(user, token)
        return response.json(user)
      }
    } catch (e) {
      console.log(e)
      return response.json({
        error: true,
        message: 'You are not registered!'
      })
    }
  };

  async logout({
    request,
    auth,
    response
  }) {

    try {
      const token = auth.getAuthHeader();
      console.log(token)

      await auth.user
        .tokens()
        .where('type', 'api_token')
        .where('is_revoked', false)
        .update({
          is_revoked: true
        });
      //console.log(t);
      await auth
      .authenticator('jwt')
      .revokeTokens([token], true)

      return response.json({
        error: false,
        message: 'Logout successfully',
      });
    } catch (e) {
      console.log(e)
      return response.json({
        error: true,
        message: 'We are not been able to logout, retry please!'
      });
    }
  };

}

module.exports = AuthController
