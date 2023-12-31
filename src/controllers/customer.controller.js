const Customer = require("../model/customer.model");

// Create customer
exports.create = async (req, res) => {
  try {
    await Customer.create({ ...req.body }).then((data) => {
      if (data) {
        return res.status(201).json(data);
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all customers
exports.getAll = async (req, res) => {
  try {
    await Customer.findAndCountAll().then((data) => {
      if (data.rows.length > 0) {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: "NOT FOUND DATA" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get customer by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findOne({ where: { id: id } }).then((data) => {
      if (data) {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: "NOT FOUND DATA" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.update({ ...req.body }, { where: { id: id } }).then((updated) => {
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

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.destroy({ where: { id: id } }).then((deleted) => {
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
