import React from "react";
import "../styles/EventList.css";

function EventList({ events, onUpdateStatus, onDelete }) {
  return (
    <div className="event-list-container">
      <h3>My Events</h3>
      {events.length === 0 ? (
        <p className="no-events">No events yet. Create your first event!</p>
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <div className="event-card" key={event._id}>
              <div className="event-header">
                <h4 className="event-title">{event.title}</h4>
                <span
                  className={`status-badge ${event.status === "SWAPPABLE" ? "swappable" : "busy"
                    }`}
                >
                  {event.status}
                </span>
              </div>

              <p className="event-time">
                {new Date(event.startTime).toLocaleString()} -{" "}
                {new Date(event.endTime).toLocaleString()}
              </p>

              <div className="event-actions">
                {event.status === "BUSY" ? (
                  <button
                    className="action-btn swappable"
                    onClick={() => onUpdateStatus(event._id, "SWAPPABLE")}
                  >
                    Make Swappable
                  </button>
                ) : (
                  <button
                    className="action-btn busy"
                    onClick={() => onUpdateStatus(event._id, "BUSY")}
                  >
                    Make Busy
                  </button>
                )}

                <button
                  className="action-btn delete"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this event?"
                      )
                    ) {
                      onDelete(event._id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;
