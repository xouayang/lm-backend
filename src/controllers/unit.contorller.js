const Unit = require("../model/unit.model");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: error });
    }
    const data = {
      name: name,
    };
    await Unit.create(data)
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
exports.getAll = async (req, res) => {
  try {
    await Unit.findAndCountAll().then((data) => {
      if (data.rows.length > 0) {
        return res.status(200).json(data);
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// update employee
exports.updateUnit = async (req, res) => {
  try {
    const { id } = req.params;
    await Unit.update({ ...req.body }, { where: { id: id } }).then(
      (updated) => {
        if (updated) {
          return res.status(200).json({ message: "Updated Success" });
        } else {
          return res.status(404).json({ message: "NOT FOUND DATA" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// delete employee
exports.deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;
    await Unit.destroy({ where: { id: id } }).then((deleted) => {
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
