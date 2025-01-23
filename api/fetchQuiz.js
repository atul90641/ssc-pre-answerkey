import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await axios.get(url);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}
