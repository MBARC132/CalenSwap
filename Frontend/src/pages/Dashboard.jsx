import React, { useEffect, useState } from "react";
import API from "../api";
import EventList from "../components/EventList";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/Dashboard.css";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", startTime: "", endTime: "" });
  const [showForm, setShowForm] = useState(false);

  // ✅ Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await API.get("/me");
      setEvents(res.data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // ✅ Create a new event
  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await API.post("/", form);
      setForm({ title: "", startTime: "", endTime: "" });
      setShowForm(false);
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  // ✅ Common function for updating status (BUSY or SWAPPABLE)
  const updateEventStatus = async (id, status) => {
    try {
      await API.patch(`/${id}/status`, { status });
      fetchEvents();
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  // ✅ Delete an event
  const deleteEvent = async (id) => {
    try {
      await API.delete(`/delete/${id}`);
      setEvents((prev) => prev.filter((ev) => ev._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Calendar</h2>
        <p className="subtitle">
          Manage your time slots and mark them as swappable
        </p>
        <button
          className="create-event-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <CloseIcon /> : <AddIcon />}{" "}
          {showForm ? "Close Form" : "Create Event"}
        </button>
      </div>

      {showForm && (
        <form className="event-form" onSubmit={createEvent}>
          <input
            placeholder="Event Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="datetime-local"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            required
          />
          <input
            type="datetime-local"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            required
          />
          <button type="submit" className="submit-btn">
            Add Event
          </button>
        </form>
      )}

      {/* ✅ Pass a single handler for status updates */}
      <EventList
        events={events}
        onUpdateStatus={updateEventStatus}
        onDelete={deleteEvent}
      />
    </div>
  );
}

export default Dashboard;
