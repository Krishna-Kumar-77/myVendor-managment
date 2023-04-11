import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { createVendor } from "../features/vendors/vendorSlice";

function AddVendor() {
  const [vendor, setVendor] = useState({
    Vendor_Name: "",
    Bank_Account_No: "",
    Bank_Name: "",
    Address1: "",
    Address2: "",
    City: "",
    Country: "",
    Zip_Code:"",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    Vendor_Name,
    Bank_Account_No,
    Bank_Name,
    Address1,
    Address2,
    City,
    Country,
    Zip_Code } = vendor;
  
  const onChange = (e) => {
    setVendor((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value,
    }));
  };
  const addVendors = (e) => {
    e.preventDefault();
    if ( !Vendor_Name || !Bank_Name || !Bank_Account_No || !Address1 || !Country || !City || !Zip_Code) {
      alert("Enter All the fields");
    } else {
      const vendorData = {
        Vendor_Name,
        Bank_Account_No,
        Bank_Name,
        Address1,
        Address2,
        City,
        Country,
        Zip_Code
      }
      dispatch(createVendor(vendorData));
      setVendor({
        Vendor_Name:"",
        Bank_Account_No:"",
        Bank_Name: "",
        Address1:"",
        Address2:"",
        City:"",
        Country:"",
        Zip_Code:""
      });
      navigate('/')
    }
  };
  return (<>
    <section className="form">
      <form onSubmit={addVendors}>
        <div className="form-group">
          <label htmlFor="Vendor_Name">Vendor name : </label>
          <input
            type="text"
            id="Vendor_Name"
            name="Vendor_Name"
            value={Vendor_Name}
            placeholder="Enter Your Name"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Bank_Name">Bank Name : </label>
          <input
            type="text"
            id="Bank_Name"
            name="Bank_Name"
            value={Bank_Name}
            placeholder="Bank Name"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Bank_Account_No">Bank Account No. : </label>
          <input
            type="number"
            id="Bank_Account_No"
            name="Bank_Account_No"
            value={Bank_Account_No}
            placeholder="Account No."
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Address1">Address 1 : </label>
          <input
            type="text"
            id="Address1"
            name="Address1"
            value={Address1}
            placeholder="Address"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
        <label htmlFor="Address2">Address 2 : </label>
          <input
            type="text"
            id="Address2"
            name="Address2"
            value={Address2}
            placeholder="Address 2"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="City">City : </label>
          <input
            type="text"
            id="City"
            name="City"
            value={City}
            placeholder="City"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Country">Country : </label>
          <input
            type="text"
            id="Country"
            name="Country"
            value={Country}
            placeholder="Country"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Zip_Code">Zip Code : </label>
          <input
            type="number"
            id="Zip_Code"
            name="Zip_Code"
            value={Zip_Code}
            placeholder="Zip Code"
            onChange={onChange}
          />
        </div>

        <div className="form-group btn-form">
          <button className="btn btn-form" type="submit">
            Add Vendor
          </button>
        </div>
      </form>
    </section>
      <Footer/>
    </>
  );
}

export default AddVendor;
