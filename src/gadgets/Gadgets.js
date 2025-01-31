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
import AddGadgets from "./AddGadgets";
import EditGadgets from "./EditGadgets";

function Gadgets() {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    getAxiosproducts();
  }, []);
  function getAxiosproducts() {
    axios
      .get(
        "http://192.168.1.24/ecommerce/public/ecommerceCategory/getGadgetsList"
      )
      .then(response => setRecords(response.data.gadgets))
      .catch(error => alert(error));
  }
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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
              <Button variant="success" size="sm" onClick={() => setShow(true)}>
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
                  <th>Price</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>{item.category}</td>
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
                          onClick={() => setShowEdit(true)}
                        >
                          <i className="bi bi-pencil-square"></i>&nbsp;Edit
                        </Button>
                        <Button variant="danger" size="sm" className="ms-1">
                          <i className="bi bi-trash3"></i>Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No Records</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <AddGadgets addGadgetShow={show} addsetShow={setShow} />
          <EditGadgets showEdit={showEdit} setShowEdit={setShowEdit} />
        </Container>
      </div>
    </div>
  );
}
export default Gadgets;
