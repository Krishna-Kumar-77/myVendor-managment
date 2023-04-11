import { FaTrashAlt, FaPen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { deleteVendor } from "../features/vendors/vendorSlice";

 
function Vendors({ vendor}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const onClicked = async (e) => {
    e.preventDefault()
    const choice = window.confirm("Are You sure you want to delete this vendor")
    if (!choice) return;
    dispatch(deleteVendor(vendor._id))
    window.location.reload()
  
  }
 
  const editPage = (e) => {
    e.preventDefault()
    navigate(`/edit/${vendor._id}`)
    
    }
    return (
      <div className="goal">
        <h2>Name : {vendor.Vendor_Name}</h2>
        <h3>Bank Name : {vendor.Bank_Name}</h3>
        <h4>Bank A/C No :-  {vendor.Bank_Account_No} </h4>
        <br />
        <div>{new Date(vendor.createdAt).toLocaleString("en-US")}</div>
        <button onClick={onClicked} className="close">
          <FaTrashAlt />
        </button>
        <button onClick={editPage} className='edit'>
          <FaPen />
        </button>
     
      </div>
    );
  }

export default Vendors;
