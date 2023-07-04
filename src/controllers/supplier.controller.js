const Supplier = require("../model/supplier.model");
// create
exports.create = async (req, res) => {
  try {
    await Supplier.create({ ...req.body }).then((data) => {
      if (data) {
        return res.status(201).json(data);
      } else {
        return res.status(200).json(data);
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all employee
exports.getAll = async (req, res) => {
  try {
    await Supplier.findAndCountAll().then((data) => {
      if (data.rows.length > 0) {
        return res.status(200).json(data);
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get employee by id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    await Supplier.findOne({ where: { empId: id } }).then((data) => {
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
    await Supplier
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
    await Supplier.destroy({ where: { id: id } }).then((deleted) => {
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
