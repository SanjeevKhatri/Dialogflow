import React, { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // fetch('http://localhost:8000/api/greeting')
        fetch('https://dialogflow-4rev.onrender.com/api/greeting')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <div>
            <h1>React and Python Integration</h1>
            {data && <p>{data.message}</p>}
        </div>
    );
}

export default App;
