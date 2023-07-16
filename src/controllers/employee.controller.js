const employee = require("../model/employee.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// create
exports.create = async (req, res) => {
  try {
    const { first_name, last_name, gender, address, tel, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const data = {
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      address: address,
      tel: tel,
      password: hashPassword,
    };
    await employee
      .create(data)
      .then((data) => {
        if (data) {
          return res.status(201).json(data);
        }
      })
      .catch((error) => {
        return res.status(404).json({ message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// login
exports.signIn = async (req, res) => {
  try {
    const { tel, password } = req.body;
    if (!tel || !password) {
      return res
        .status(404)
        .json({ message: "telephone and password can't be null" });
    }
    await employee.findOne({ where: { tel: tel } }).then(async (data) => {
      const comparePassword = await bcrypt.compare(password, data.password);
      if (comparePassword) {
        const info = {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          gender: data.gender,
          address: data.address,
        };
        const token = await jwt.sign(info, "LMCOMPUTER", {
          expiresIn: "120d",
        });
        return res.status(201).json({ message: "success", token: token });
      } else {
        return res.status(400).json({ message: "Login Failed" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all employee
exports.getAll = async (req, res) => {
  try {
    await employee.findAndCountAll().then((data) => {
      if (data.rows.length > 0) {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: "NOT FOUND DATA" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get employee by id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    await employee.findOne({ where: { empId: id } }).then((data) => {
      if (data) {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: "NOT FOUND DATA" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// update employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body)
    await employee
      .update({ ...req.body }, { where: { id: id } })
      .then((updated) => {
        if (updated) {
          return res.status(200).json({ message: "Updated Success" });
        } else {
          return res.status(404).json({ message: "NOT FOUND DATA" });
        }
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await employee.destroy({ where: { id: id } }).then((deleted) => {
      if (deleted) {
        return res.status(200).json({ message: "Deleted Success" });
      } else {
        return res.status(404).json({ message: "NOT FOUND DATA" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
