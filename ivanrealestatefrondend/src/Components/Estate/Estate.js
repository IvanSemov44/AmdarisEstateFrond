import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const Estate = ({
    estate
}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
                <Card.Text>
                    {estate.Description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{estate.address}</ListGroup.Item>
                <ListGroup.Item>{estate.floоr}</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default Estate;