"use strict";

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
const Route = use("Route");
const Role = use("Role");

(async function () {
  const count = await Role.getCount();

  if (!Number(count)) {
    const roleAdmin = new Role();
    roleAdmin.name = "Administrator";
    roleAdmin.slug = "administrator";
    roleAdmin.description = "manage administration privileges";
    await roleAdmin.save();

    const userRole = new Role();
    userRole.name = "Merchant";
    userRole.slug = "merchant";
    userRole.description = "manage merchantizer privileges";
    await userRole.save();
  }
})();

Route.on("/").render("welcome");

Route.group(() => {
  /**
   * ------------------------------------
   *  User Authentication
   * ------------------------------------
   */
  Route.on("login").render("auth.login").as("auth.login");
  Route.on("merchant/register")
    .render("auth.register")
    .as("auth.merchant.register");

  Route.post("login", "AuthController.login");

  Route.post("merchant/register", "AuthController.registerMerchant");

  /**
   * ------------------------------------
   *  Admin Authentication
   * ------------------------------------
   */
  Route.on("admin/login").render("auth.admin.login").as("auth.admin.login");
  Route.on("admin/register")
    .render("auth.admin.register")
    .as("auth.admin.register");

  Route.post("admin/register", "AuthController.registerAdmin");
})
  .prefix("auth")
  .middleware("UnAuthenticated");

/**
 * ------------------------------------------------
 *      Metchant Dashboard
 * ------------------------------------------------
 */
Route.group(() => {
  Route.get("/", "MerchantDashboardController.states").as("user.dashboard");
  Route.resource("parcels", "PercelController");
})
  .prefix("dashboard")
  .middleware(["is:merchant"]);

Route.post("auth/logout", "AuthController.logout")
  .as("auth.logout")
  .middleware(["Authenticated"]);

/**
 * ------------------------------------------------
 *      Admin Dashboard
 * ------------------------------------------------
 */

Route.group(() => {
  Route.get("/", "AdminDashboardController.states").as("admin.dashboard");
  Route.resource("zones", "ZoneController");
  Route.resource("areas", "AreaController");
})
  .prefix("admin-dashboard")
  .middleware(["is:administrator"]);
