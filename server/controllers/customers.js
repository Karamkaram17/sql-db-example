const sql = require("mssql");

const getAllCustomer = async (req, res) => {
  try {
    const result = await sql.query`up_get_all_customers`;
    return res.status(200).send(result.recordset);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getAllBloodTypes = async (req, res) => {
  try {
    const result = await sql.query`select * from blood_type`;
    return res.status(200).send(result.recordset);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getAllCountries = async (req, res) => {
  try {
    const result = await sql.query`select * from country_name`;
    return res.status(200).send(result.recordset);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const addCustomer = async (req, res) => {
  const { firstName, lastName, countryId, bloodTypeId } = req.body;
  if (!firstName || !lastName || !countryId || !bloodTypeId) {
    return res.status(200).send("plz provide all details");
  }
  try {
    const result = await sql.query(
      `insert into customers (first,last,country_id,blood_type_id) values ('${firstName}','${lastName}',${parseInt(
        countryId
      )},${parseInt(bloodTypeId)})`
    );
    return res.status(200).send(result.recordset);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateCustomer = async (req, res) => {
  const customerId = req.params.id;
  const { firstName, lastName, countryId, bloodTypeId } = req.body;
  if (!firstName || !lastName || !countryId || !bloodTypeId) {
    return res.status(200).send("plz provide all details");
  }
  try {
    const result = await sql.query(
      `update customers 
        set first = '${firstName}', 
        last = '${lastName}', 
        country_id = ${parseInt(countryId)}, 
        blood_type_id = ${parseInt(bloodTypeId)} 
        where id = '${customerId}'`
    );
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteCustomer = async (req, res) => {
  const customerId = req.params.id;
  try {
    const result = await sql.query(
      `delete from customers where id='${customerId}'`
    );
    console.log(result);
    return res.status(200).send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

module.exports = {
  getAllCustomer,
  getAllBloodTypes,
  getAllCountries,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
