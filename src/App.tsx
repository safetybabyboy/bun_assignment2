import React, { useEffect, useState } from "react";

interface Bpi {
  code: string;
  rate: string;
  description: string;
}

interface CoindeskData {
  bpi: {
    USD: Bpi;
    GBP: Bpi;
    EUR: Bpi;
  };
}

const App: React.FC = () => {
  const [data, setData] = useState<CoindeskData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>Bitcoin Price Index (BPI)</h1>
      {data ? (
        <div className="price-list">
          <p>USD: {data.bpi.USD.rate} {data.bpi.USD.code}</p>
          <p>GBP: {data.bpi.GBP.rate} {data.bpi.GBP.code}</p>
          <p>EUR: {data.bpi.EUR.rate} {data.bpi.EUR.code}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default App;
