const express = require("express");
const router = express.Router();

const {
  getAllCustomer,
  getAllBloodTypes,
  getAllCountries,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customers");

router.route("/").get(getAllCustomer);
router.route("/blood-types").get(getAllBloodTypes);
router.route("/countries").get(getAllCountries);
router.route("/customer").post(addCustomer);

router.route("/customer/:id").patch(updateCustomer).delete(deleteCustomer);

module.exports = router;
