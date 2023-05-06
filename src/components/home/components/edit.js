
import React , {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { editUser } from '../../../services/api';

export default function Edit(props) {
    const [inputs, setInputs] = useState({
        fname:props.data.fname,
        lname:props.data.lname,
        email:props.data.email,
        number:props.data.number,
        address:props.data.address,
        photo: "add"
    });

    // To update modal
    useEffect(() => {
        setInputs({
            fname:props.data.fname,
            lname:props.data.lname,
            email:props.data.email,
            number:props.data.number,
            address:props.data.address,
            photo: "add"
        })
    },[props.data]);
    

    const handleInputChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputs(values => ({...values, [name]: value}))
  
    }
  
    const handleSubmit  = () => {
        editUser(props.data._id,inputs);
        props.onHide();
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form">
            <div className="form-body">
                <div className="mb-2">
                    <label className="form-label">First Name </label>
                    <input className="form-control" type="text" name="fname" value={inputs.fname || ""} onChange = {(e) => handleInputChange(e)} placeholder="First Name" required/>
                </div>
                <div className="mb-2">
                    <label className="form-label">Last Name </label>
                    <input className="form-control" type="text" name="lname" value={inputs.lname || ""} onChange = {(e) => handleInputChange(e)} placeholder="Last Name" required/>
                </div>
                <div className="mb-2">
                    <label className="form-label">Email </label>
                    <input className="form-control"type="email" name="email"  value={inputs.email || ""} onChange = {(e) => handleInputChange(e)} placeholder="Email" required/>
                </div>
                <div className="mb-2">
                    <label className="form-label" >Number</label>
                    <input className="form-control" type="number" name="number" value={inputs.number || ""} onChange = {(e) => handleInputChange(e)} placeholder="Number" required/>
                </div>
                <div className="mb-4">
                    <label className="form-label">Address</label>
                    <input className="form-control" type="text" name="address" value={inputs.address || ""} onChange = {(e) => handleInputChange(e)} placeholder="Address" required/>
                </div>
            </div>
            <div className="text-center">
                <button onClick={()=>handleSubmit()} type="submit" className="btn btn-primary">Update</button>
            </div>
        </div>
        </Modal.Body>
      </Modal>
    );
  }