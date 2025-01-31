import "bootstrap/dist/css/bootstrap.min.css";
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
import { useState, useEffect } from "react";
import axios from "axios";

function AddGadgets({ addGadgetShow, addsetShow }) {
  const [records, setRecords] = useState([]);
  const [gadgets, setGadgets] = useState({});
  useEffect(() => {
    getAxiosproducts();
  }, []);
  function getAxiosproducts() {
    axios
      .get(
        "http://192.168.1.24/ecommerce/public/ecommerceCategory/getCategories"
      )
      .then(response => setRecords(response.data.categories))
      .catch(error => alert(error));
  }
  const closeGadget = () => addsetShow(false);
  const onChangeName = e => {
    const name = e.target.name;
    const value = e.target.value;
    setGadgets(gadget => ({ ...gadget, [name]: value }));
  };
  const addGadget = e => {
    e.preventDefault();
  };
  const [priceChange, setPriceChange] = useState("");
  const handlePriceChange = e => {
    setPriceChange(e.target.value);
  };
  const [imageChange, setImageChange] = useState("");
  const handleImageChange = e => {
    setImageChange(e.target.value);
  };
  return (
    <div>
      <Modal show={addGadgetShow} onHide={closeGadget}>
        <Modal.Header closeButton>
          <Modal.Title>Add Gadget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addGadget}>
            <Form.Group
              as={Row}
              size="sm"
              className="mb-1"
              controlId="category"
            >
              <Form.Label column sm={5} className="text-end">
                Gadget Category&nbsp;:
              </Form.Label>
              <Col sm={7}>
                <Form.Select aria-label="Default select example" size="sm">
                  <option>Open this select menu</option>
                  {records.map(item => (
                    <option value={item.id} onChange={onChangeName}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-1" controlId="price">
              <Form.Label column sm={5} className="text-end">
                Price&nbsp;:
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  size="sm"
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={price}
                  onChange={handlePriceChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-1" controlId="image">
              <Form.Label column sm={5} className="text-end">
                Image&nbsp;:
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  size="sm"
                  type="file"
                  name="image"
                  placeholder="image"
                  value={price}
                  onChange={handleImageChange}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="sm" onClick={closeGadget}>
            <i className="bi bi-x"></i>&nbsp;Close
          </Button>
          <Button variant="success" size="sm" onClick={closeGadget}>
            <i className="bi bi-plus-lg"></i>&nbsp;Add Gadget
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddGadgets;
