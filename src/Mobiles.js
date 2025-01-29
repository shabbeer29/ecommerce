import { useNavigate } from "react-router-dom"
import { Alert, Button, Stack, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import AddMobile from "./mobiles/AddMobile";
export default function Mobiles() {
    const [mobiles, setMobiles] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        axios.get('http://192.168.1.24/ecommerce/public/ecommerceCategory/getMobilesList')
            .then((response) => setMobiles(response.data.mobiles))
            .catch((error) => alert(error));
    }, []);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    return (
        <div className="container">
            <Stack direction="horizontal" gap={3}>
                <h2>Mobile List</h2>
                <Button className="ms-auto" onClick={() => setShowModal(true)}>Add</Button>
                <Button onClick={goBack}>Back</Button>
            </Stack>
            {error && <p className="danger">{ error }</p>}
            <Table responsive striped bordered>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Color</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mobiles.length > 0 ? (
                                mobiles.map((mobile, index) => (
                                    <tr key={index}>
                                        <td>{ index+1}</td>
                                        <td>{ mobile.name}</td>
                                        <td>{ mobile.model}</td>
                                        <td>{ mobile.color}</td>
                                        <td>View</td>
                                    </tr>
                                ))
                        ) : (
                                <tr>
                                    <td colSpan={6}><Alert variant="danger">No records Found</Alert></td>
                                </tr>
                        )
                    }
                </tbody>
            </Table>
            <AddMobile show={showModal} setShow={ setShowModal} />
        </div>
    )
}