import { Form, useNavigate } from "react-router-dom"
import { Alert, Button, Stack, Table,Image,Toast,ToastContainer,ToastBody,ToastHeader, Pagination, FormControl } from "react-bootstrap";
import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
import AddMobile from "./mobiles/AddMobile";
import ViewMobile from "./mobiles/ViewMobile";
import EditMobile from "./mobiles/EditMobile";
import { useTheme } from "./ThemeProvider";

export const mobileContext = createContext();
 export const useMobile = () => useContext(mobileContext);
export default function Mobiles() {
    const { theme } = useTheme();
    // const [mobiles, setMobiles] = useState([]);
    const { mobiles, setMobiles } = useMobile();
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // To View Mobile
    const [viewMobile, setViewMobile] = useState(false);
    const [showMobile, setShowMobile] = useState(null);

    // TO Edit Mobile
    const [editMobile, setEditMobile] = useState({});
    const [editModal, setEditModal] = useState(false);
    // To Delete Mobile
    const [deleteMsg, showDeleteMsg] = useState("");
    const [showToast, setShowtoast] = useState(false);
    const [search, setSearch] = useState("");

    // To filter records
    const filterRecords = mobiles.filter(mobile => 
         mobile.name.toLowerCase().includes(search.toLowerCase())
    );
    

    // For Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const mobilePerPage = 5;
    const indexOfLastMobile = currentPage * mobilePerPage;
    const indexOfFirstMobile = indexOfLastMobile - mobilePerPage;
    const currentMobiles = filterRecords.slice(indexOfFirstMobile, indexOfLastMobile);
    const totalpages = Math.ceil(filterRecords.length / mobilePerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const editMobileDetails = (mobile) => {
        setEditModal(true);
        setEditMobile(mobile);
    }
    const viewMobileDetails = (mobile) => {
        setViewMobile(true);
        setShowMobile(mobile);
    }

    useEffect(() => {
        axios.get('http://192.168.1.24/ecommerce/public/ecommerceCategory/getMobilesList')
            .then((response) => {
                setMobiles(response.data.mobiles);
                setCurrentPage(1);
            })
            .catch((error) => setError(error.response));
    }, [search]);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const deleteMobie = (id) => {
        if (window.confirm("Are you Sure You want to delete the Mobile")) {
            axios.delete("http://192.168.1.24/ecommerce/public/ecommerceCategory/deleteMobile/" + id).then((response) => {
                if (response.data.status) {
                    setMobiles(mobiles.filter(m => m.id !== id));
                    showDeleteMsg(response.data.message);
                    setShowtoast(true);
                } else {
                    showDeleteMsg("This Mobile Cannot be Deleted");
                }
            }).catch((error) => {
                if (error.response) {
                    showDeleteMsg("Error in deleting the Mobile");
                } else {
                    alert("Error in Deleting Mobile");
                }
            })
        }
    } 
    return (
        <div className={`container ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
        <Stack direction="horizontal" gap={3}>
                <h2>Mobile List</h2>
            <FormControl type="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button className="ms-auto" variant="success" onClick={() => setShowModal(true)}>Add</Button>
            <Button onClick={goBack} variant="secondary">Back</Button>
        </Stack>
            {error && <p className="danger">{error}</p>}
            <Pagination>
                <Pagination.Prev onClick={() => currentPage > 1 && paginate(currentPage -1 )} disabled={currentPage == 1} />
                {
                    Array.from({ length: totalpages }, (_, index) => (
                        <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>{index + 1}</Pagination.Item>
                    ))
                }
                <Pagination.Next onClick={() => currentPage < totalpages && paginate(currentPage + 1)} disabled={ currentPage == totalpages} />
            </Pagination>
        <Table responsive striped bordered className={theme === "dark" ? "table-dark" : ""}>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    currentMobiles.length > 0 ? (
                            currentMobiles.map((mobile, index) => (
                                <tr key={index}>
                                    <td>{ indexOfFirstMobile + index + 1}</td>
                                    <td>{ mobile.name}</td>
                                    <td>{ mobile.model}</td>
                                    <td>{ mobile.color}</td>
                                    <td>{mobile.image && <Image src={`http://192.168.1.24/ecommerce/public/mobiles/${mobile.image}`} width={50} height={50} alt="no image" />}</td>
                                    <td>
                                        <Button variant="info" className="mx-1" onClick={()=> viewMobileDetails(mobile)}>View</Button>
                                        <Button variant="primary" className="mx-1" onClick={() => editMobileDetails(mobile)}>Edit</Button>
                                        <Button variant="danger" className="mx-1" onClick={() => deleteMobie(mobile.id)}>Delete</Button>
                                    </td>
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
        <ToastContainer position='bottom-end' className='p-3'>
            <Toast show={showToast} onClose={() => setShowtoast(false)} delay={7000} autohide bg='success'>
                <ToastHeader>Success</ToastHeader>
                <ToastBody>{ deleteMsg}</ToastBody>
            </Toast>
        </ToastContainer>
        <AddMobile show={showModal} setShow={setShowModal} />
        {showMobile && <ViewMobile viewMobile={viewMobile} setViewMobile={setViewMobile} mobile={showMobile} />}
        {editMobile && <EditMobile show={editModal} setEditModal={ setEditModal} mobile={editMobile } />}
        </div>
    )
}
