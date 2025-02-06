import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Form, Image, FormText, FormControl , Toast,ToastContainer,ToastHeader,ToastBody} from "react-bootstrap";
import axios from "axios";
import { useTheme } from "../ThemeProvider";

const EditMobile = ({ show, setEditModal, mobile }) => {
    const { theme } = useTheme();
    const [editValue, setEditValue] = useState({
        id:"",
        name:"",
        model:"",
        color: "",
        image:null,
    });
    useEffect(() => {
        if (mobile) {
            setEditValue(
                {
                    id: mobile.id || '',
                    name: mobile.name || '',
                    model: mobile.model || '',
                    color: mobile.color || '',
                    image:null,
                }
            )
        }
    }, [mobile]);
    const [editError, setEditError] = useState({});
    const [successMsg, setSuccessMsg] = useState("");
    const [showToast, setShowToast] = useState(false);
    
    const onChangeEditMobile = (e) => {
         const { name, value, files } = e.target;
    setEditValue((prevState) => ({
        ...prevState,
        [name]: name === "image" ? files[0] : value
        }));
    }
    const closeEditModal = () => {
        setEditModal(false);
    }
    const editMobile = (e) => {
        e.preventDefault();
        const editFormData = new FormData();
        editFormData.append('id', editValue.id);
        editFormData.append('name', editValue.name);
        editFormData.append('model', editValue.model);
        editFormData.append('color', editValue.color);
        if (editValue.image) {
            editFormData.append('image', editValue.image);
        }
        axios.post('http://192.168.1.24/ecommerce/public/ecommerceCategory/updateMobile', editFormData, {
            headers: {
                "Content-Type" : "multipart/form-data",
            }
        }).then((response) => {
            if (response.data.errors) {
                setEditError(response.data.errors);
            } else if (response.data.status) {
                setSuccessMsg(response.data.message);
                setEditError({});
                closeEditModal();
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                setShowToast(true);
            }
        }).catch((error) => console.log(error.response))
    }
    const modalThemeClass = theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";  // Define theme classes for modal
    return (
        <>
            <Modal show={ show} onHide={closeEditModal}>
                <ModalHeader closeButton>
                    <ModalTitle>Edit Mobile -{ mobile.name}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={editMobile}>
                        <Form.Control type="hidden" name="id" value={editValue.id} onChange={onChangeEditMobile}/>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name="name" value={editValue.name} onChange={onChangeEditMobile} />
                            {editError.name && <span className="text-danger">{editError.name }</span>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder="Model" name="model" value={editValue.model} onChange={onChangeEditMobile} />
                            {editError.model && <span className="text-danger">{editError.model }</span>}
                            
                        </Form.Group>
                        <Form.Group className='mb-3'>
                          <Form.Label>Color</Form.Label>
                            <Form.Control type='text' name='color' placeholder='Color' value={editValue.color} onChange={onChangeEditMobile} />
                            {editError.color && <span className="text-danger">{editError.color }</span>}
                            
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='file' name='image' onChange={onChangeEditMobile} />
                            {editError.image && <span className="text-danger">{editError.image }</span>}
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeEditModal}>Close</Button>
                            <Button variant="primary" type='submit'>Update</Button>
                        </Modal.Footer>
                    </Form>
                </ModalBody>
            </Modal>
            <ToastContainer position='bottom-end' className='p-3'>
              <Toast show={showToast} onClose={() => setShowToast(false)} delay={7000} autohide bg='success'>
                  <ToastHeader>Success</ToastHeader>
                  <ToastBody>{ successMsg}</ToastBody>
              </Toast>
          </ToastContainer>
        </>
    )
}
export default EditMobile;