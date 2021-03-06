"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Authenticated {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth, session }, next) {
    try {
      await auth.check();
      await next();
    } catch (error) {
      session.flash({ errorMsg: "দয়া করে আগে লগইন করুন" });
      response.route("auth.login");
    }

  }
}

module.exports = Authenticated;
