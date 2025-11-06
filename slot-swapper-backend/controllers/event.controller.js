import EventModel from "../models/event.model.js";

export async function createEvent(req, res) {
    try {
        const { title, startTime, endTime } = req.body;
        if (!title || !startTime || !endTime) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newEvent = await EventModel.create({
            title,
            startTime,
            endTime,
            owner: req.user._id,
        });

        res.status(201).json({
            message: "Event created successful",
            event: newEvent,
        });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Error creating event" });
    }
}

export async function getMyEvent(req, res) {
    try {
        const events = await EventModel.find({ owner: req.user._id }).sort({ startTime: 1 });

        res.status(200).json({
            message: "Your events fetched successfully",
            events,
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Error fetching events" });
    }
}

export async function updateEventStatus(req, res) {
    try {
        const { status } = req.body;
        const validStatuses = ["BUSY", "SWAPPABLE", "SWAP_PENDING"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedEvent = await EventModel.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            { status },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found or unauthorized" });
        }

        res.status(200).json({
            message: "Event status updated successfully",
            event: updatedEvent,
        });
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Error updating event" });
    }
}
export async function deleteEvent(req, res) {
  try {
    const deletedEvent = await EventModel.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found or unauthorized" });
    }

    res.status(200).json({
      message: "Event deleted successfully",
      event: deletedEvent,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Error deleting event" });
  }
}
