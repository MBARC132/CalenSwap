import EventModel from "../models/event.model.js";
import SwapReqModel from "../models/swapreq.model.js";

export async function getSwappableSlots(req, res) {
    try {
        const slots = await EventModel.find({
            status: "SWAPPABLE",
            owner: { $ne: req.user._id },
        }).populate("owner", "name email");

        res.status(200).json({
            message: "Swappable slots fetch successfully",
            slots,
        });
    } catch (error) {
        console.error("Error fetching swappable slots:", error);
        res.status(500).json({ message: "Error fetching swappable slots" })
    }
}



export async function requestSwap(req, res) {
    try {
        const { mySlotId, theirSlotId } = req.body;

        if (!mySlotId || !theirSlotId) {
            return res.status(400).json({ message: "Both slot IDs are required" });
        }

        const mySlot = await EventModel.findById(mySlotId);
        const theirSlot = await EventModel.findById(theirSlotId)

        if (!mySlot || !theirSlot) {
            return res.status(403).json({ message: "Slot not found" })
        }
        if (String(mySlot.owner) !== String(req.user._id)) {
            return res.status(403).json({ message: "You don't own this slot" })
        }

        if (mySlot.status !== "SWAPPABLE" || theirSlot.status !== "SWAPPABLE") {
            return res.status(400).json({ message: "Both slots must be swappable before requesting" })
        }

        const swapRequest = await SwapReqModel.create({
            requester: req.user._id,
            responder: theirSlot.owner,
            myslot: mySlot._id,
            theirSlot: theirSlot._id,
        });

        await EventModel.updateMany(
            { _id: { $in: [mySlot._id, theirSlot._id] } },
            { status: "SWAP_PENDING" }
        );
        res.status(201).json({
            message: "Swap request created successfully",
            swapRequest,
        })
    } catch (error) {
        console.error("Error creating swap request:", error);
        res.status(500).json({ message: "Error creating swap request" })
    }
}

export async function getSwapRequests(req, res) {
    try {
        const incoming = await SwapReqModel.find({ responder: req.user._id })
            .populate("requester", "name email")
            .populate("myslot")
            .populate("theirSlot");

        const outgoing = await SwapReqModel.find({ requester: req.user._id })
            .populate("responder", "name email")
            .populate("myslot")
            .populate("theirSlot");

        res.status(200).json({ incoming, outgoing });
    } catch (error) {
        console.error("Error fetching swap requests:", error);
        res.status(500).json({ message: "Error fetching swap requests" });
    }
}

export async function respondSwap(req, res) {
    try {
        const { accept } = req.body;
        const { requestId } = req.params;

        const swap = await SwapReqModel.findById(requestId)
            .populate("myslot")
            .populate("theirSlot")
            .populate("requester", "name")
            .populate("responder", "name");

        if (!swap) {
            return res.status(404).json({ message: "Swap request not found" });
        }

        // Only responder should respond
        if (String(swap.responder._id) !== String(req.user._id)) {
            return res.status(403).json({ message: "Unauthorized to respond to this swap" });
        }

        // 🟥 If rejected
        if (!accept) {
            swap.status = "REJECTED";
            await swap.save();

            await EventModel.updateMany(
                { _id: { $in: [swap.myslot._id, swap.theirSlot._id] } },
                { status: "SWAPPABLE" }
            );

            return res.status(200).json({ message: "Swap request rejected", swap });
        }

        // 🟩 If accepted
        const requesterEvent = swap.myslot;
        const targetEvent = swap.theirSlot;

        // Swap owners
        const tempOwner = requesterEvent.owner;
        requesterEvent.owner = targetEvent.owner;
        targetEvent.owner = tempOwner;

        requesterEvent.status = "BUSY";
        targetEvent.status = "BUSY";

        await requesterEvent.save();
        await targetEvent.save();

        swap.status = "ACCEPTED";
        await swap.save();

        return res.status(200).json({
            message: "Swap request accepted successfully",
            swap,
        });
    } catch (error) {
        console.error("Error responding to swap request:", error);
        res.status(500).json({ message: "Error responding to swap request" });
    }
}
