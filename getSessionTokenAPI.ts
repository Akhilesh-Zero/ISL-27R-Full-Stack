import express from "express";
import { Router } from "express";
import { desurrogateClientId } from "./helpers/authHelpers";

const router: Router = express.Router();

router.post("/api/desurrogate", async (req, res) => {
  const surrogatedClientId: string = req.body.surrogatedClientId;

  try {
    // Replace this with your logic to desurrogate the client ID.
    const desurrogatedClientId: string =
      desurrogateClientId(surrogatedClientId);

    // Return the desurrogated client ID
    res.json({ desurrogatedClientId });

    // Log the API request to Elasticsearch as success
    await logRequestToElasticsearch(req, desurrogatedClientId, true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });

    // Log the API request to Elasticsearch as failure
    await logRequestToElasticsearch(req, surrogatedClientId, false);
  }
});

export default router;
