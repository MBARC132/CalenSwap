import React, { useEffect, useState } from "react";
import API from "../api";
import RequestList from "../components/RequestList";

function Requests() {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/swap-requests"); 
      setIncoming(res.data.incoming || []);
      setOutgoing(res.data.outgoing || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const respond = async (id, accept) => {
    try {
      await API.post(`/swap-response/${id}`, { accept });

      setIncoming(prev => prev.filter(req => req._id !== id));

      setOutgoing(prev =>
        prev.map(req => req._id === id ? { ...req, status: accept ? "ACCEPTED" : "REJECTED" } : req)
      );
    } catch (error) {
      console.error("Error responding to request:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return <RequestList incoming={incoming} outgoing={outgoing} onRespond={respond} />;
}

export default Requests;
