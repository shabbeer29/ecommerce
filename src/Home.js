import { BrowserRouter, Routes } from "react-router-dom";
import Fruits from "./Fruits";
import Mobiles from "./Mobiles";
import { Link } from "react-router-dom";
import { Button, Nav,Stack } from "react-bootstrap";

export default function Home() {
    return (
        <div className="container">
            <h3>Home Page</h3>
            <Stack direction="horizontal" gap={3}>
                {/* <div className="p-2"><Link to="/fruits">Fruits</Link></div>
                <div className="p-2"><Link to="/mobiles">Mobiles</Link></div> */}
                <Button className="p-2" variant="secondary" as={Link} to="/mobiles">Mobiles</Button>
                <Button className="p-2" variant="secondary" as={Link} to="/fruits">Fruits</Button>
            </Stack>
        </div>
    )
}