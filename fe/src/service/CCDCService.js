import axios from "axios";

export const getAllCCDC = async (searchName, searchManu, page) => {
    try {
        let response = await axios.get(`http://localhost:8080/api-ccdc/list?page=${page}&searchName=${searchName}&searchManu=${searchManu}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getAllEmployee= async () => {
    try {
        let rs = await axios.get(`http://localhost:8080/api-employee/list`);
        return rs.data
    } catch (e) {
        return undefined
    }
}
export const createBorrow= async (employeeId,ccdcId,quantity) => {
    try {
        let rs = await axios.post(`http://localhost:8080/api-borrow/create?employeeId=${employeeId}&ccdcId=${ccdcId}&quantity=${quantity}`);
        return rs.data
    } catch (e) {
        return undefined
    }
}
export const createCCDC= async (ccdc) => {
    try {
        const res= await axios.post(`http://localhost:8080/api-ccdc/create`,ccdc);
        return true;
    } catch (e) {
        return undefined
    }
}