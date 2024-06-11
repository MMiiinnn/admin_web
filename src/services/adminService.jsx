import * as httpRequest from "../api/request";

// Staff
export const getListStaff = async () => {
  try {
    const res = await httpRequest.get("staff");
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const updateStaff = async (id, body) => {
  try {
    console.log("ID: ", id);
    console.log("Body: ", body);
    const res = await httpRequest.put(`/staff/update/${id}`, body);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const addStaff = async (body) => {
  try {
    const res = await httpRequest.post("/auth/register/staff", body);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const editStaff = async (id, body) => {
  try {
    const res = await httpRequest.patch(`staff/${id}`, body);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const deleteStaff = async (id) => {
  try {
    const res = await httpRequest.del(`staff/delete/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

// Provider
export const getListProvider = async () => {
  try {
    const res = await httpRequest.get("provider");
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const updateProvider = async (id, body) => {
  try {
    console.log("Body: ", body);
    console.log("ID: ", id);
    const res = await httpRequest.put(`/provider/update/${id}`, body);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const addProvider = async (body) => {
  try {
    const res = await httpRequest.post("/provider/create", body);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const editProvider = async (id, body) => {
  try {
    const res = await httpRequest.patch(`/provider/update/${id}`, body);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const deleteProvider = async (id) => {
  try {
    const res = await httpRequest.del(`provider/delete/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

// Invoice
export const getListInvoice = async () => {
  try {
    const res = await httpRequest.get("invoice");
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const getConfirmInvoice = async (id) => {
  try {
    const res = await httpRequest.get(`invoice/confirm/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const getDetailInvoice = async (id) => {
  try {
    const res = await httpRequest.get(`invoice/detail/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
}


// Import
export const getListImport = async () => {
  try {
    const res = await httpRequest.get("import");
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const getListInOneImport = async (id) => {
  try {
    const res = await httpRequest.get(`import/list/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const getImportDetail = async (id) => {
  try {
    const res = await httpRequest.get(`import/detail/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const updateImport = async (id, body) => {
  try {
    console.log("Body: ", body);
    console.log("ID: ", id);
    const res = await httpRequest.put(`/import/update/${id}`, body);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const completeImport = async (id, body) => {
  try {
    console.log("Body: ", body);
    console.log("ID: ", id);
    const res = await httpRequest.put(`/import/complete/${id}`, body);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

export const deleteImport = async (id) => {
  try {
    console.log("ID: ", id);
    const res = await httpRequest.del(`/import/delete/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};

// Profile
export const updateProfile = async (body) => {
  console.log("Body: ", body);
  try {
    const res = httpRequest.put("/auth/updateprofile");
    return res;
  } catch (error) {
    console.log(error);
    return error.response && error.response.data;
  }
};
