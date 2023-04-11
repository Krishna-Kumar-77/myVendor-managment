import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import Vendors from '../components/Vendors';
import Spinner from '../components/Spinner';
import { getVendors, reset } from '../features/vendors/vendorSlice'
 
function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { vendorList, isLoading, isError, message } = useSelector(
    (state) => state.vendor
  )

  useEffect(() => {

    if (isError) {
      console.log(message)
      console.log(isError)
    }

    if (!user) {
      navigate('/login')
    }

   dispatch(getVendors())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const onClick = () => {
    navigate('/addnote')
  }
  
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Vendors Dashboard</p>
      </section>

      {/* <AddVendor />    */}
      <div className="form-group">
          <button className="btn btn-block1" type="submit" onClick={onClick}>
            Add Vendor
          </button>
        </div>
      <section className='content'>
        {vendorList.length > 0 ? (
          <div className='goals'>
            {vendorList.map((vendor) => (
              <Vendors key={vendor._id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <h3> No vendor's account found please create</h3>
        )}
      </section>
      <Footer/>
    </>
  )
}

export default Dashboard
