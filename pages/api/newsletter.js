import { connectToDatabase, insertDocument } from "../../helpers/mongodb";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes("@")) {
            res.status(422).json({ message: "Invalid email address" });
            return;
        }

        let client;

        try {
            client = await connectToDatabase();
        } catch (e) {
            res.status(500).json({ message: "Connecting to the database failed" });
            return;
        }

        try {
            await insertDocument(client, "newsletter", { email: userEmail });
            client.close();
        } catch (e) {
            res.status(500).json({ message: "Inserting data failed" });
            return;
        }
        res.status(201).json({ message: "Signed up !" });
    }
}
