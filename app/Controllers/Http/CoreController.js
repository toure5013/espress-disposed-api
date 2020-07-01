'use strict'

class CoreController {

  async index ({ request, auth,  response, view }) {
    response.json({
      error: true,
      message : "Route not exist",
      users: users
    });
  }
}

module.exports = CoreController
