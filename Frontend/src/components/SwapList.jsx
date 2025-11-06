import React, { useState } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import "../styles/SwapList.css";

function SwapList({ swappableSlots, mySlots, onSwapRequest }) {
  const [selectedSlots, setSelectedSlots] = useState({});

  const handleSelectChange = (slotId, mySlotId) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [slotId]: mySlotId,
    }));
  };

  return (
    <div className="swaplist-container">
      <h2 className="swaplist-title">Browse and Request Swaps</h2>
      {swappableSlots.length === 0 ? (
        <p className="no-slots">No available slots at the moment</p>
      ) : (
        <div className="swaplist-grid">
          {swappableSlots.map((slot) => (
            <div className="swap-card" key={slot._id}>
              <div className="swap-card-content">
                <h3>{slot.title}</h3>
                <p>
                  <strong>Timing:</strong> <br />
                  {new Date(slot.startTime).toLocaleString()} –{" "}
                  {new Date(slot.endTime).toLocaleString()}
                </p>
                <p>
                  <strong>Created by:</strong> {slot.owner?.name || "Unknown"}
                </p>
              </div>

              <div className="swap-select">
                <label htmlFor={`mySlot-${slot._id}`}>Choose your slot:</label>
                <select
                  id={`mySlot-${slot._id}`}
                  value={selectedSlots[slot._id] || ""}
                  onChange={(e) =>
                    handleSelectChange(slot._id, e.target.value)
                  }
                >
                  <option value="">-- Select --</option>
                  {mySlots.map((mySlot) => (
                    <option key={mySlot._id} value={mySlot._id}>
                      {mySlot.title} (
                      {new Date(mySlot.startTime).toLocaleTimeString()} -{" "}
                      {new Date(mySlot.endTime).toLocaleTimeString()})
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="swap-button"
                disabled={!selectedSlots[slot._id]}
                onClick={() =>
                  onSwapRequest(selectedSlots[slot._id], slot._id)
                }
              >
                <SwapHorizIcon className="swap-icon" />
                Request Swap
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SwapList;
