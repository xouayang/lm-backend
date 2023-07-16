const SaleDetail = require("../model/sale_detail.model");

// Create sale detail
exports.create = async (req, res) => {
  try {
    await SaleDetail.create({ ...req.body }).then((data) => {
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

// Get all sale details
exports.getAll = async (req, res) => {
  try {
    await SaleDetail.findAndCountAll().then((data) => {
      if (data.rows.length > 0) {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: "NOT FOUND DATA" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get sale detail by id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    await SaleDetail.findOne({ where: { id: id } }).then((data) => {
      if (data) {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: "NOT FOUND DATA" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update sale detail
exports.updateSaleDetail = async (req, res) => {
  try {
    const { id } = req.params;
    await SaleDetail.update({ ...req.body }, { where: { id: id } }).then((updated) => {
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

// Delete sale detail
exports.deleteSaleDetail = async (req, res) => {
  try {
    const { id } = req.params;
    await SaleDetail.destroy({ where: { id: id } }).then((deleted) => {
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
