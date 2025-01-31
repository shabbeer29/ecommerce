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
import { useState, useEffect, React } from "react";
import axios from "axios";

function EditGadgets({ showEdit, setShowEdit }) {
  //   const [showEdit, setShowEdit] = useState(false);
  const editGadgetClose = () => setShowEdit(false);
  //   const editGadget = () => setShowEdit(true);
  return (
    <div>
      <Modal show={showEdit} onHide={editGadgetClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Gadget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Gadget Category"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-1" controlId="rating">
              <Form.Label column sm={5} className="text-end">
                Rating&nbsp;:
              </Form.Label>
              <Col sm={7}>
                <Form.Control size="sm" type="text" placeholder="Rating" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-1" controlId="price">
              <Form.Label column sm={5} className="text-end">
                Price&nbsp;:
              </Form.Label>
              <Col sm={7}>
                <Form.Control size="sm" type="text" placeholder="Price" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-1" controlId="image">
              <Form.Label column sm={5} className="text-end">
                Image&nbsp;:
              </Form.Label>
              <Col sm={7}>
                <Form.Control type="file" size="sm" />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="sm" onClick={editGadgetClose}>
            <i className="bi bi-x"></i>&nbsp;Close
          </Button>
          <Button variant="success" size="sm" onClick={editGadgetClose}>
            <i className="bi bi-pencil-square"></i>&nbsp;Edit Gadget
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditGadgets;
