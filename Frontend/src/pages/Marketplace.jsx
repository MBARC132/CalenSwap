import React, { useEffect, useState } from "react";
import API from "../api";
import SwapList from "../components/SwapList";
import "../styles/Marketplace.css";

function Marketplace() {
  const [swappableSlots, setSwappableSlots] = useState([]);
  const [mySlots, setMySlots] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch your own events
      const myEventsRes = await API.get("/me");
      setMySlots(myEventsRes.data.events.filter((e) => e.status === "SWAPPABLE"));

      // Fetch others' swappable slots
      const swappableRes = await API.get("/swappable-slots");
      setSwappableSlots(swappableRes.data.slots);
    } catch (error) {
      console.error("Error fetching marketplace data:", error);
    }
  };

  const onSwapRequest = async (mySlotId, theirSlotId) => {
    try {
      await API.post("/swap-request", { mySlotId, theirSlotId });
      alert("Swap request sent!");
    } catch (error) {
      console.error("Error sending swap request:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h2>Marketplace</h2>
        <p>Browse and request swaps for available time slots</p>
      </div>

      <SwapList
        swappableSlots={swappableSlots}
        mySlots={mySlots}
        onSwapRequest={onSwapRequest}
      />
    </div>
  );
}

export default Marketplace;
