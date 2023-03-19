import { connectToDatabase } from "../../../helpers/mongodb"

export default async function handler(req, res) {
    const eventId = req.query.eventId;

    const client = await connectToDatabase();

    if (req.method === "POST") {
        const { email, name, text } = req.body;

        if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
            res.status(422).json({ message: "Invalid Input" });
            return;
        }
        const newComment = { eventId, email, name, text };
        const db = client.db();
        const result = await db.collection("comments").insertOne(newComment);
        newComment.id = result.id;
        res.status(201).json({ message: "Added comment", comment: newComment });
    }

    if (req.method === "GET") {
        const db = client.db();
        const documents = await db.collection("comments").find({ eventId: eventId }).sort({ _id: -1 }).toArray();
        res.status(201).json({ comments: documents });
    }
    client.close();
}
