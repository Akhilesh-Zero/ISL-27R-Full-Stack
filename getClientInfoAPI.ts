<<<<<<< HEAD
import express from "express";
import { Router } from "express";
import axios from "axios";
import { validateSessionToken } from "./helpers/authHelpers";
import { fetchApiEndpoints } from "./helpers/vaultHelpers";
import { logRequestToElasticsearch } from "./helpers/elasticsearchHelpers";

const router: Router = express.Router();

router.post("/api/getClientInfo", async (req, res) => {
  const desurrogatedClientId: string = req.body.desurrogatedClientId;
  const sessionToken: string = req.body.sessionToken;

  try {
    // Verify the session token (logic is different in my code)
    if (validateSessionToken(sessionToken)) {
      // Fetch API endpoints from Vault
      const apiEndpoints: any = await fetchApiEndpoints();

      // Make an API request to get client details (We dont use axios)
      const clientDetailsResponse = await axios.get(
        `${apiEndpoints.clientDetailsEndpoint}/${desurrogatedClientId}`
      );

      const clientData: any = clientDetailsResponse.data;

      // Log the API request to Elasticsearch as success
      await logRequestToElasticsearch(req, desurrogatedClientId, true);

      res.json(clientData);
    } else {
      // Log the API request to Elasticsearch as failure
      await logRequestToElasticsearch(req, desurrogatedClientId, false);

      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });

    // Log the API request to Elasticsearch as failure
    await logRequestToElasticsearch(req, desurrogatedClientId, false);
  }
});

export default router;
=======
import express from "express";
import { Router } from "express";
import axios from "axios";
import { validateSessionToken } from "./helpers/authHelpers";
import { fetchApiEndpoints } from "./helpers/vaultHelpers";
import { logRequestToElasticsearch } from "./helpers/elasticsearchHelpers";

const router: Router = express.Router();

router.post("/api/getClientInfo", async (req, res) => {
  const desurrogatedClientId: string = req.body.desurrogatedClientId;
  const sessionToken: string = req.body.sessionToken;

  try {
    // Verify the session token (logic is different in my code)
    if (validateSessionToken(sessionToken)) {
      // Fetch API endpoints from Vault
      const apiEndpoints: any = await fetchApiEndpoints();

      // Make an API request to get client details (We dont use axios)
      const clientDetailsResponse = await axios.get(
        `${apiEndpoints.clientDetailsEndpoint}/${desurrogatedClientId}`
      );

      const clientData: any = clientDetailsResponse.data;

      // Log the API request to Elasticsearch as success
      await logRequestToElasticsearch(req, desurrogatedClientId, true);

      res.json(clientData);
    } else {
      // Log the API request to Elasticsearch as failure
      await logRequestToElasticsearch(req, desurrogatedClientId, false);

      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });

    // Log the API request to Elasticsearch as failure
    await logRequestToElasticsearch(req, desurrogatedClientId, false);
  }
});

export default router;
>>>>>>> 5329553244bd07f397fb9153ed987fdf005e19a9
