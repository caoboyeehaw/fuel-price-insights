import React, { useEffect, useState } from 'react';
import { getDatabase } from './api/db';

const ClientInfoPage: React.FC = () => {
  const [clientInfo, setClientInfo] = useState<any>(null); // Replace `any` with the actual type of your clientInfo object

  useEffect(() => {
    const fetchClientInfo = async () => {
      const email = 'guy@gmail.com';
      try {
        const db = await getDatabase();
        const Fuel = db.collection('ClientInfo');

        const clientInfo = await Fuel.findOne({ email });
        setClientInfo(clientInfo);
      } catch (error) {
        console.error('Error retrieving data from MongoDB:', error);
      }
    };

    fetchClientInfo();
  }, []);

  return (
    <div>
      {clientInfo ? (
        <div>
          <h2>Name: {clientInfo.name}</h2>
          <p>Email: {clientInfo.email}</p>
          <p>Address 1: {clientInfo.address1}</p>
          <p>Address 3: {clientInfo.address3}</p>
          <p>City: {clientInfo.city}</p>
          <p>State: {clientInfo.state}</p>
          <p>Zipcode: {clientInfo.zipcode}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClientInfoPage;



