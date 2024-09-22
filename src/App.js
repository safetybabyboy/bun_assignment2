import React, { useEffect, useState } from "react";
function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchData = () => {
        fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
            .then((response) => response.json())
            .then((data) => {
            setData(data);
            setLoading(false);
        })
            .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
        });
    };
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 3000); // Refresh ทุก 3 วินาที
        return () => clearInterval(interval); // Clear interval เมื่อ component unmount
    }, []);
    if (loading) {
        return React.createElement("p", null, "Loading...");
    }
    return (React.createElement("div", { className: "container" },
        React.createElement("h1", null, "Bitcoin Price Index (BPI)"),
        data ? (React.createElement("div", { className: "price-list" },
            React.createElement("p", null,
                "USD: ",
                data.bpi.USD.rate,
                " ",
                data.bpi.USD.code),
            React.createElement("p", null,
                "GBP: ",
                data.bpi.GBP.rate,
                " ",
                data.bpi.GBP.code),
            React.createElement("p", null,
                "EUR: ",
                data.bpi.EUR.rate,
                " ",
                data.bpi.EUR.code))) : (React.createElement("p", null, "No data available"))));
}
;
export default App;
