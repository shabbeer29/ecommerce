import { Button, Col, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row,Image } from "react-bootstrap"

const viewMobile = ({ viewMobile, setViewMobile, mobile }) => {
    const closeView = () => {
        setViewMobile(false);
    }
    return (
        <>
            <Modal show={ viewMobile} onHide={closeView}>
                <ModalHeader closeButton>
                    <ModalTitle>View Mobile Specifications&nbsp;-&nbsp;{mobile.name}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <Col xs={4}>
                            <span className="fw-bold">Name:</span>
                        </Col>
                        <Col xs={8}>
                            <span className="p-1">{mobile.name}</span>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={4}>
                            <span className="fw-bold">Price:</span>
                        </Col>
                        <Col xs={8}>
                            <span className="p-1">{mobile.model}</span>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={4}>
                            <span className="fw-bold">Color:</span>
                        </Col>
                        <Col xs={8}>
                            <span className="p-1">{mobile.color}</span>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={4}>
                            <span className="fw-bold">Image:</span>
                        </Col>
                        <Col xs={8}>
                            <Image src={ `http://192.168.1.24/ecommerce/public/mobiles/${mobile.image}`} alt="no image" width={100} height={100}/>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={ closeView}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default viewMobile;