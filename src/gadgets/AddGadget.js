import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Image,
  Modal,
  Form,
  Row,
  Col
} from "react-bootstrap";
export default function AddGadget({ show, setShow }) { 
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [gadgets, setGadgets] = useState({});
    const closeGadget = () => {
        setShow(false);
    };
    useEffect(() => {   
        axios.get("http://192.168.1.24/ecommerce/public/ecommerceCategory/getCategories").then((response) => {
            setCategories(response.data.categories);
        }).catch((error) => {
            console.log(error);
        }); 
    }, []);
    function addValue(e) {
        const name = e.target.name;
        const value = e.target.value;
        setGadgets({
            ...gadgets,
            [name]: name === "image" ? e.target.files[0] : value
        });
    }
    function addGadget(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', gadgets.name||'');
        formData.append('category', gadgets.category||'');
        formData.append('price', gadgets.price||'');
        if(gadgets.image){
            formData.append('image', gadgets.image);
        }
        console.log(formData);
        axios.post("http://192.168.1.24/ecommerce/public/ecommerceCategory/addGadget", formData, {   
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            if(response.data.errors){
                setErrors(response.data.errors);
            } else if(response.data.status){
                alert(response.data.message);
                setShow(false);
            }
        }).catch((error) => {
            console.log(error);
        }
        )
    }
    return (
        <>
            <Modal show={show} onHide={closeGadget}>
            <Modal.Header closeButton>
              <Modal.Title>Add Gadget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form onSubmit={addGadget}>
                        <Form.Group as={Row} className="mb-1">
                  <Form.Label column sm={5} className="text-end">
                    Name&nbsp;:
                  </Form.Label>
                  <Col sm={7}>
                        <Form.Control size="sm" type="text" name="name" placeholder="Name" value={gadgets.name || ''} onChange={addValue} />
                        {errors.name && <span style={{color:"red"}}>{ errors.name }</span>}
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  size="sm"
                  className="mb-1"
                >
                  <Form.Label column sm={5} className="text-end">
                    Gadget Category&nbsp;:
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Select size="sm" name="category" value={gadgets.category || ''} onChange={addValue}>
                        <option value="">Select Category</option>
                        {
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                                </Form.Select>
                                {errors.category && <span style={{color:"red"}}>{ errors.category }</span>}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-1">
                  <Form.Label column sm={5} className="text-end">
                    Price&nbsp;:
                  </Form.Label>
                  <Col sm={7}>
                                <Form.Control size="sm" type="text" name="price" placeholder="Price" value={gadgets.price || ''} onChange={addValue} />
                                {errors.price && <span style={{color:"red"}}>{ errors.price }</span>}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-1">
                  <Form.Label column sm={5} className="text-end">
                    Image&nbsp;:
                  </Form.Label>
                  <Col sm={7}>
                                <Form.Control type="file" size="sm" name="image" onChange={addValue} />
                                {errors.image && <span style={{color:"red"}}>{ errors.image }</span>}
                  </Col>
                        </Form.Group>
                        <Modal.Footer>
              <Button variant="danger" size="sm" onClick={closeGadget}>
                <i className="bi bi-x"></i>&nbsp;Close
              </Button>
              <Button variant="success" size="sm" type="submit">
                <i className="bi bi-plus-lg"></i>&nbsp;Add Gadget
              </Button>
            </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </>
    );
}