/*
 * adonis-hexa
 *
 * Contributor: Caleb Mathew <creatrixity@gmail.com>
 *
*/
const Routes = [
  {
    route: "users/",
    controller: "UserController.index",
    method: "get"
  },
  {
    route: "users/",
    controller: "UserController.store",
    method: "post"
  },
  {
    route: "users/:id",
    controller: "UserController.show",
    method: "get"
  },
  {
    route: "/",
    controller: "UserController.hello",
    method: "get"
  }

];

module.exports = Routes;
