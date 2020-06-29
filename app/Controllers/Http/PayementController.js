'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Logger = use('Logger')
/**
 * Resourceful controller for interacting with payements
 */
class PayementController {
  /**
   * Show a list of all payements.
   * GET payements
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    Logger.info('request details %j', {
      url: request.url(),
    });
    response.json({
      message : "Hello"
    });
  }

  /**
   * Create/save a new payement.
   * POST payements
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    //console.log(request);
    let data = request.headers;
    response.json({
      message : "Saved with success"
    });
  }

  /**
   * Display a single payement.
   * GET payements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }


  /**
   * Update payement details.
   * PUT or PATCH payements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a payement with id.
   * DELETE payements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PayementController
