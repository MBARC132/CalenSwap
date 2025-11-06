import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../styles/RequestList.css";

function RequestList({ incoming, outgoing, onRespond }) {
  const [showIncoming, setShowIncoming] = useState(true);
  const [showOutgoing, setShowOutgoing] = useState(true);
  const [processingIds, setProcessingIds] = useState([]); // Track requests being processed

  const uniqueIncoming = Array.from(new Map(incoming.map(r => [r._id, r])).values());
  const uniqueOutgoing = Array.from(new Map(outgoing.map(r => [r._id, r])).values());

  const handleRespond = async (id, accept) => {
    if (processingIds.includes(id)) return;
    setProcessingIds(prev => [...prev, id]);
    await onRespond(id, accept);
    setProcessingIds(prev => prev.filter(pid => pid !== id));
  };

  return (
    <div className="requestlist-container">
      <div className="request-section" onClick={() => setShowIncoming(!showIncoming)}>
        <div className="section-header">
          <h3>Incoming Requests</h3>
          <span className="count-badge">{uniqueIncoming.length}</span>
          <ExpandMoreIcon className={`expand-icon ${showIncoming ? "rotate" : ""}`} />
        </div>
        {showIncoming && (
          <ul className="request-list">
            {uniqueIncoming.length === 0 ? (
              <p className="empty-text">No incoming requests</p>
            ) : (
              uniqueIncoming.map(req => (
                <li key={req._id} className="request-card">
                  <p><strong>{req.requester?.name || "Unknown"}</strong> offered a swap.</p>
                  <div className="action-buttons">
                    <button
                      className="accept-btn"
                      onClick={() => handleRespond(req._id, true)}
                      disabled={processingIds.includes(req._id)}
                    >
                      <CheckCircleIcon /> Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleRespond(req._id, false)}
                      disabled={processingIds.includes(req._id)}
                    >
                      <CancelIcon /> Reject
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <div className="request-section" onClick={() => setShowOutgoing(!showOutgoing)}>
        <div className="section-header">
          <h3>Outgoing Requests</h3>
          <span className="count-badge">{uniqueOutgoing.length}</span>
          <ExpandMoreIcon className={`expand-icon ${showOutgoing ? "rotate" : ""}`} />
        </div>
        {showOutgoing && (
          <ul className="request-list">
            {uniqueOutgoing.length === 0 ? (
              <p className="empty-text">No outgoing requests</p>
            ) : (
              uniqueOutgoing.map(req => (
                <li key={req._id} className="request-card">
                  <p>
                    Swap with <strong>{req.responder?.name || "Unknown"}</strong> — <i>{req.status}</i>
                  </p>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default RequestList;
