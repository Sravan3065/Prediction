import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [parkingSlots, setParkingSlots] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/vehicles')
      .then(response => {
        setVehicles(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('http://localhost:8080/parking-slots')
      .then(response => {
        setParkingSlots(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleParkVehicle = async (vehicleId, parkingSlotId) => {
    try {
      await axios.post(`http://localhost:8080/park-vehicle/${vehicleId}/${parkingSlotId}`);
      // Update vehicles and parking slots
      axios.get('http://localhost:8080/vehicles')
        .then(response => {
          setVehicles(response.data);
        })
        .catch(error => {
          console.error(error);
        });

      axios.get('http://localhost:8080/parking-slots')
        .then(response => {
          setParkingSlots(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Vehicles:</h2>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle.id}>{vehicle.licensePlate}</li>
        ))}
      </ul>
      <h2>Parking Slots:</h2>
      <ul>
        {parkingSlots.map(parkingSlot => (
          <li key={parkingSlot.id}>{parkingSlot.slotNumber}</li>
        ))}
      </ul>
      <button onClick={() => handleParkVehicle(1, 1)}>Park Vehicle 1 in Slot 1</button>
    </div>
  );
}

export default Dashboard;