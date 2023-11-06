import express from "express";
import { Router } from "express";
import axios from "axios";
import { fetchApiEndpoints } from "./helpers/vaultHelpers";
import { logRequestToElasticsearch } from "./helpers/elasticsearchHelpers";

const router: Router = express.Router();

router.post("/api/desurrogate", async (req, res) => {
  try {
    // Fetch API endpoints from Vault
    const apiEndpoints: any = await fetchApiEndpoints();

    // Make a POST request using the retrieved endpoint
    const response = await axios.post(apiEndpoints.desurrogateEndpoint, {
      surrogatedClientId: req.body.surrogatedClientId,
    });

    if (response.status === 200) {
      const desurrogatedClientId: string = response.data.desurrogatedClientId;

      // Return the desurrogated client ID
      res.json({ desurrogatedClientId });

      // Log the API request to Elasticsearch as success
      await logRequestToElasticsearch(req, desurrogatedClientId, true);
    } else {
      console.error(
        `Desurrogate API failed with status code: ${response.status}`
      );
      res.status(500).json({ error: "Internal Server Error" });

      // Log the API request to Elasticsearch as failure
      await logRequestToElasticsearch(req, req.body.surrogatedClientId, false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });

    // Log the API request to Elasticsearch as failure
    await logRequestToElasticsearch(req, req.body.surrogatedClientId, false);
  }
});

export default router;
