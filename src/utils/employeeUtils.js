export const calculateNextEmployeeId = (employees) => {
  return Math.max(...employees.map((employee) => employee.id), 0) + 1;
};

export const prepareEmployeeData = (data, id) => {
  return {
    id,
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: new Intl.DateTimeFormat("en-US").format(data.birthDate),
    street: data.street,
    city: data.city,
    state: data.state.value,
    zipCode: data.zipCode,
    startDate: new Intl.DateTimeFormat("en-US").format(data.startDate),
    department: data.department.value,
  };
};
