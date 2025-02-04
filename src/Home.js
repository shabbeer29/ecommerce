import { Link } from "react-router-dom";
import { Button,Stack } from "react-bootstrap";
export default function Home() {
    return (
        <div className="container">
            <h3>Home Page</h3>
            <Stack direction="horizontal" gap={3}>
                <Button className="p-2" variant="secondary" as={Link} to="/mobiles">Mobiles</Button>
                <Button className="p-2" variant="secondary" as={Link} to="/gadgets">Gadgets</Button>
            </Stack>
        </div>
    )
}