const Sale = require("../model/sale.model");

// create sale
exports.create = async (req, res) => {
  try {
    await Sale.create({ ...req.body }).then((data) => {
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

// get all sales
exports.getAll = async (req, res) => {
  try {
    await Sale.findAndCountAll().then((data) => {
      if (data.rows.length > 0) {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: "NOT FOUND DATA" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get sale by id
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    await Sale.findOne({ where: { id: id } }).then((data) => {
      if (data) {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: "NOT FOUND DATA" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update sale
exports.updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    await Sale.update({ ...req.body }, { where: { id: id } }).then((updated) => {
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

// delete sale
exports.deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    await Sale.destroy({ where: { id: id } }).then((deleted) => {
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
