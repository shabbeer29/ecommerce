import React, { useEffect, useMemo , useState} from 'react';
import { Button } from 'react-bootstrap';
const Display = React.memo(({ count }) => { 
    console.count('Display rendered');
    return (
        <div>
            <h2>Television List</h2>
            <span>Count : {count}</span>
        </div>);
})
const Television = () => {
     const brand = "BMW";
     const model = 2044;
    const [price, setPrice] = useState(1000);  
    const [count, setCount] = useState(0);

    useEffect(() => { 
        console.log('Component mounted');
        return () => console.log('Component unmounted');
    }, [count]);
    const formattedPrice = useMemo(() => {
        console.count('Formatting price');
        const numericPrice = parseFloat(price);
        return isNaN(numericPrice) ? 'N/A' : `$${numericPrice.toFixed(2)}`;
    }, [price]);
    const increment = () => {
        console.count('Incrementing count');
        setCount(count + 1);
    };
    const changePrice = () => {
        const newPrice = Math.random() * 100;
        setPrice(newPrice);
    }
    return (
        <div>
            <Display count={count} />
            <button onClick={increment}>Increment</button>
            <h2>{brand} - {model}</h2>
            <p>Price: {formattedPrice}</p>
            <Button onClick={changePrice}>Change Price</Button>
        </div>
    );
};

export default Television;