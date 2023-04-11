import axios from 'axios'

const API_URL = '/vendors/' 

// Create new vendor
const createVendor = async (vendorData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, vendorData, config)

  return response.data
}

// Get user vendors
const getVendors = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data.data

}

// Delete user vendor
const deleteVendor = async (vendorId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + vendorId, config)

  return response.data
}

const vendorService = {
  createVendor,
  getVendors,
  deleteVendor, 
}

export default vendorService
