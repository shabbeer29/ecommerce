import axios from 'axios';
import { useState } from 'react';
import { Button,Modal,Form, ToastContainer, Toast, ToastHeader, ToastBody } from 'react-bootstrap';
export default function AddMobile({show, setShow}) {
    const handleClose = () => setShow(false);
    // To Handle Form Inputs
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({}); //For Error Message
    const [successMsg, setSuccessMsg] = useState(""); //To Store Success Message
    const [showToast, setShowToast] = useState(false); //To show in Toast Modal
    const addMobile = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('name', inputs.name || '');
        formdata.append('model', inputs.model || '');
        formdata.append('color', inputs.color || '');
        if (inputs.image) {
            formdata.append('image', inputs.image);
        }
        axios.post('http://192.168.1.24/ecommerce/public/ecommerceCategory/addMobile', formdata,{
            headers: {
                "Content-Type":"multipart/form-data",
            },
        }).then((response) => {
                if (response.data.status) {
                    setSuccessMsg(response.data.message);
                    setInputs({});
                    setErrors({});
                    handleClose();
                    setShowToast(true);
                    setTimeout(() => {
                        window.location.reload();

                        // navigate('/mobiles', {replace: true});
                    }, 3000);
                } else if (response.data.errors) {
                    setErrors(response.data.errors);
                }
            }).catch((error) => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    setSuccessMsg('An error occurred while submitting the form.');
                    setShowToast(true);
                }
            });
    }
    const onChangeValue = (e) => {
        const name = e.target.name;
        const value = name === "image" ? e.target.files[0]:e.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    }
  return (
    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Mobile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={addMobile}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter name" name="name" value={inputs.name || ""} onChange={onChangeValue} />
                        {errors.name && <span style={{color:"red"}}>{ errors.name }</span>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                          <Form.Control type="text" placeholder="Model" name="model" value={inputs.model || ""} onChange={onChangeValue} />
                        {errors.model && <span style={{color:"red"}}>{ errors.model }</span>}
                      </Form.Group>
                      <Form.Group className='mb-3'>
                          <Form.Label>Color</Form.Label>
                          <Form.Control type='text' name='color' placeholder='Color' value={inputs.color || ""} onChange={onChangeValue} />
                         {errors.color && <span style={{color:"red"}}>{ errors.color }</span>}
                      </Form.Group>
                      <Form.Group className='mb-3'>
                          <Form.Label>Image</Form.Label>
                          <Form.Control type='file' name='image' onChange={onChangeValue}/>
                          {errors.image && <span style={{color:"red"}}>{ errors.image}</span>}
                      </Form.Group>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" type='submit'>Add</Button>
                      </Modal.Footer>
                </Form>
            </Modal.Body>
          </Modal>
          <ToastContainer position='bottom-end' className='p-3'>
              <Toast show={showToast} onClose={() => setShowToast(false)} delay={7000} autohide bg='success'>
                  <ToastHeader>Success</ToastHeader>
                  <ToastBody>{ successMsg}</ToastBody>
              </Toast>
          </ToastContainer>
    </>
  );
}