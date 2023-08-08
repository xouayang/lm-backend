const Sale = require("../model/sale.model");
const { Op } = require("sequelize");
const Customer = require("../model/customer.model"); // Import the Customer model
const Employee = require("../model/employee.model"); // Import the Employee model

exports.getSalesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let whereCondition = {};
    if (startDate && endDate) {
      // Convert dates to include time component (start time: 00:00:00, end time: 23:59:59)
      const startDateTime = new Date(startDate).setHours(0, 0, 0, 0);
      const endDateTime = new Date(endDate).setHours(23, 59, 59, 999);

      whereCondition = {
        Sale_date: {
          [Op.between]: [new Date(startDateTime), new Date(endDateTime)],
        },
      };
    }

    const data = await Sale.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["Fname", "Lname"],
        },
        {
          model: Employee,
          as: "employee",
          attributes: ["first_name", "last_name"],
        },
      ],
    });

    // Process the data to modify the response format
    const modifiedData = data.rows.map((sale) => ({
      ...sale.toJSON(),
      customerFname: sale.customer ? sale.customer.Fname : null,
      customerLname: sale.customer ? sale.customer.Lname : null,
      employeeFirst_name: sale.employee ? sale.employee.first_name : null,
      employeeLast_name: sale.employee ? sale.employee.last_name : null,
      // Remove the nested objects customer and employee
      customer: undefined,
      employee: undefined,
    }));

    return res.status(200).json({ count: data.count, rows: modifiedData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get sale by id with additional details
exports.getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    await Sale.findByPk(id, {
      include: [
        {
          model: Customer,
          as: 'customer',
        },
        {
          model: Employee,
          as: 'employee',
        },
      ],
    }).then((sale) => {
      if (sale) {
        const {
          id,
          Cus_id,
          Em_id,
          Sale_date,
          Totalkip,
          Totalbath,
          Totaldollar,
          createdAt,
          updatedAt,
          customer,
          employee,
        } = sale;

        const customerData = customer ? customer.dataValues : null; // Get the customer data values
        const employeeData = employee ? employee.dataValues : null; // Get the employee data values

        const result = {
          id,
          Cus_id,
          Em_id,
          Sale_date,
          Totalkip,
          Totalbath,
          Totaldollar,
          createdAt,
          updatedAt,
          customerFname: customerData ? customerData.Fname : null,
          customerLname: customerData ? customerData.Lname : null,
          customergender: customerData ? customerData.gender : null,
          customervillage: customerData ? customerData.village : null,
          customerprovince: customerData ? customerData.province : null,
          customertel: customerData ? customerData.tel : null,
          customeremail: customerData ? customerData.email : null,
          employeefirst_name: employeeData ? employeeData.first_name : null,
          employeelast_name: employeeData ? employeeData.last_name : null,
          employeegender: employeeData ? employeeData.gender : null,
          employeeaddress: employeeData ? employeeData.address : null,
          employeetel: employeeData ? employeeData.tel : null,
        };

        res.status(200).json({ result });
      } else {
        res.status(404).json({ result: 'Sale not found' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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
      return res.status(404).json({ message: "NOT FOUND DATA for all" });
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
      return res.status(404).json({ message: "NOT FOUND DATA by id" });
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
