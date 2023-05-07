import Swal from 'sweetalert2'; 
import axios from 'axios';

// BASE URL
export const instance = axios.create({

  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000,
});

// Get User API
export const getUser = async() => {
    return await instance.get(`/user`)
    .then(response => {
      return response.data
    })
    .catch( error => {
      return error.response.data
    })
  }

// delete User Api
export const deleteUser = async(user_id) => {
    return await instance.delete(`/user/delete/${user_id}`)
    .then(response => {
      Swal.fire('Success!', response.data.message, 'success')
      .then((result) => {
        window.location.reload();
        return response.data
      })
    })
    .catch( error => {
      return error.response.data
    })
  }

// Upload Pic Api not working
  export const uploadPic = (user_id,form) => {
    instance.post(`user/upload/${user_id}`, form)
    .then(response => {
      Swal.fire('Success!', response.data.message, 'success')
      .then((result) => {
        window.location.reload();
        return response.data
      })
    })
    .catch( error => {
      return error.response.data
    })
  }

// Add User Api
export const addUser = async(form) => {
    return await instance.post(`user/add`, form)
    .then(response => {
      Swal.fire('Success!', response.data.message, 'success')
      .then((result) => {
        window.location.reload();
        return response.data
      })
    })
    .catch( error => {
      return error.response.data
    })
  }

// Edit User Api
export const editUser = async(user_id, form) => {
    return await instance.post(`user/update/${user_id}`, form)
    .then(response => {
      Swal.fire('Success!', response.data.message, 'success')
      .then((result) => {
        window.location.reload();
        return response.data
      })
      return response.data
    })
    .catch( error => {
      return error.response.data
    })
  }