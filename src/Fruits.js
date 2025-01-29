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

function Fruits() {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    getAxiosproducts();
  }, []);
  function getAxiosproducts() {
    axios
      .get("https://fakestoreapi.com/products")
      .then(response => setRecords(response.data))
      .catch(error => alert(error));
  }
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const closeGadget = () => setShow(false);
  const addGadget = () => setShow(true);
  const editGadgetClose = () => setShowEdit(false);
  const editGadget = () => setShowEdit(true);
  return (
    <div>
      <div className="mt-5">
        <Container>
          <div className="d-flex justify-content-between">
            <div>
              <h3 className="align-items-center d-flex mb-0 h4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
                <span className="ms-3">Gadgets</span>
              </h3>
            </div>
            <div>
              <Button variant="success" size="sm" onClick={addGadget}>
                <i className="bi bi-plus-lg"></i>&nbsp;Add
              </Button>
            </div>
          </div>
          <div className="table-responsive mt-3">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th width="1%" className="text-center">
                    S.No.
                  </th>
                  <th>category</th>
                  <th>Rating</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records
                    .filter(item => item.category === "jewelery")
                    .map((item, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{item.category}</td>
                        <td>{item.rating.rate}</td>
                        <td>{item.price}</td>
                        <td>
                          <Image
                            src={item.image}
                            width="30"
                            alt="product image"
                          />
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={editGadget}
                          >
                            <i class="bi bi-pencil-square"></i>&nbsp;Edit
                          </Button>
                          <Button variant="danger" size="sm" className="ms-1">
                            <i className="bi bi-trash3"></i>Delete
                          </Button>
                        </td>
                      </tr>

                      //   <AxiosRecordItem key={item.id} item={item} />
                    ))
                ) : (
                  <tr>
                    <td colSpan={6}>No Records</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <Modal show={show} onHide={closeGadget}>
            <Modal.Header closeButton>
              <Modal.Title>Add Gadget</Modal.Title>
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
              <Button variant="danger" size="sm" onClick={closeGadget}>
                <i className="bi bi-x"></i>&nbsp;Close
              </Button>
              <Button variant="success" size="sm" onClick={closeGadget}>
                <i className="bi bi-plus-lg"></i>&nbsp;Add Gadget
              </Button>
            </Modal.Footer>
          </Modal>
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
        </Container>
      </div>
    </div>
  );
}
// const AxiosRecordItem = axiosProps => {
//   return (
//     <div>
//       <tr>
//         <td className="text-center">{axiosProps.item.id}</td>
//         <td>{axiosProps.item.category}</td>
//         <td className="text-center">{axiosProps.item.rating.rate}</td>
//         <td className="text-end">{axiosProps.item.price}</td>
//         <td className="text-center">
//           <Image src={axiosProps.item.image} width="30" />
//         </td>
//       </tr>
//     </div>
//   );
// };
export default Fruits;
