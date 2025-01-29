import { useNavigate } from "react-router-dom"
import { Button, Stack }  from "react-bootstrap";

export default function Fruits() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    return (
        <div className="container">
            <Stack direction="horizontal" gap={5}>
            <h3>Fruits List</h3>
            <Button className="ms-auto" onClick={goBack}>Go Back</Button>
            </Stack>
        </div>
    )
}