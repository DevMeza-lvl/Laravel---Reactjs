import axios from "axios";

const base_api_url = "http://127.0.0.1:8000/api/v1/";

export default {
    //AUTH
    getRegister: (data) => axios.post(base_api_url + "auth/register", data),
    getLogin: (data) => axios.post(base_api_url + "auth/login", data),
    getLogout: () => axios.post(base_api_url + "auth/login", {}),

    //ROL ADMIN
        //USUARIOS
        getUserAll: (token) => axios.get(base_api_url + "admin/user", {headers: {Authorization: `Bearer ${token}`}}),
        getUserById: (id, token) => axios.get(base_api_url + "admin/user/" + id, {headers: {Authorization: `Bearer ${token}`}}),
        getUserUpdate: (id, data, token) => axios.put(base_api_url + "admin/user/" + id, data, {headers: {Authorization: `Bearer ${token}`}}),

        //ADMIN
        getCategoriaAll: (token) => axios.get(base_api_url + "admin/categoria", {headers: {Authorization: `Bearer ${token}`}}),
        getCategoriaStore: (token, data) => axios.post(base_api_url + "admin/categoria", data, {headers: {Authorization: `Bearer ${token}`}}),
        getCategoriaById: (id, token) => axios.get(base_api_url + "admin/categoria/" + id, {headers: {Authorization: `Bearer ${token}`}}),
        getCategoriaUpdate: (id, data, token) => axios.put(base_api_url + "admin/categoria/" + id, data, {headers: {Authorization: `Bearer ${token}`}}),
        getCategoriaDeleteById: (id, token) => axios.delete(base_api_url + "admin/categoria/" + id, {headers: {Authorization: `Bearer ${token}`}}),

        getEmpresaAll: (token) => axios.get(base_api_url + "admin/empresa", {headers: {Authorization: `Bearer ${token}`}}),
        getEmpresaById: (id, token) => axios.get(base_api_url + "admin/empresa/" + id, {headers: {Authorization: `Bearer ${token}`}}),
        getEmpresaUpdate: (id, data, token) => axios.put(base_api_url + "admin/empresa/" + id, data, {headers: {Authorization: `Bearer ${token}`}}),

    //ROL CLIENTE
        getEmpresaAllClient: (token) => axios.get(base_api_url + "client/empresa", {headers: {Authorization: `Bearer ${token}`}}),
        getEmpresaStoreClient: (token, data) => axios.post(base_api_url + "client/empresa", data, {headers: {Authorization: `Bearer ${token}`}}),
        getEmpresaByIdClient: (id, token) => axios.get(base_api_url + "client/empresa/" + id, {headers: {Authorization: `Bearer ${token}`}}),
        getEmpresaUpdateClient: (id, data, token) => axios.put(base_api_url + "client/empresa/" + id, data, {headers: {Authorization: `Bearer ${token}`}}),
        getEmpresaDeleteByIdClient: (id, token) => axios.delete(base_api_url + "client/empresa/" + id, {headers: {Authorization: `Bearer ${token}`}}),

    //PUBLIC
        getEmpresaAllPublic: (data) => axios.get(base_api_url + "public/empresas/" + data),
}