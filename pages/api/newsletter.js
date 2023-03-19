import { connectToDatabase } from "../../helpers/mongodb"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes("@")) {
            res.status(422).json({ message: "Invalid email address" });
            return;
        }

        const client = await connectToDatabase();
        const db = client.db();
        await db.collection("newsletter").insertOne({ email: userEmail });
        client.close()
        res.status(201).json({ message: "Signed up !" });
    }
}
