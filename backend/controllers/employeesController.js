import Employee from "../models/Employee.js";

export const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees) res.status(204).json({ message: "no emplyoees" });
  res.json(employees);
};

export const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res.status(400).json({ message: "First and last name required" });
  }

  // add check for unique firstname and lastname maybe by id?
  const already_employee = await Employee.findOne({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
  console.log(already_employee);

  if (already_employee) {
    return res.status(409).json({
      message: `Employee ${already_employee.firstname} already in DB`,
    });
  }

  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json({ "employee created": result });
  } catch (error) {
    console.error(error);
  }
};

export const updateEmployee = async (req, res) => {
  console.log(req.body);
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID required" });
  }
  const employee = await Employee.findOne({ _id: req.body.id });
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;

  const result = await employee.save();
  res.json({ "update employee result": result });
};

export const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID required" });
  }
  const employee = await Employee.findOne({ _id: req.body.id });
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}` });
  }
  const result = await employee.deleteOne({ _id: req.body.id });
  res.json({ "delete employee result": result });
};

export const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "ID required" });
  }
  const employee = await Employee.findOne({ _id: req.params.id });
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.params.id}` });
  }
  res.json({ "find employee result": employee });
};
