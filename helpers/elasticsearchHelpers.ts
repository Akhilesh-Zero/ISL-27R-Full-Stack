import { Client } from "elasticsearch";

// Initialize Elasticsearch client
const esClient = new Client({ node: process.env.ELASTICSEARCH_URL });

// Function to log the API request to Elasticsearch
// This whole function is written by me I cant go into all the details but this is simplar to what I wrote at my company
async function logRequestToElasticsearch(
  req: any,
  clientId: string,
  success: boolean
): Promise<void> {
  const logDocument = {
    timestamp: new Date(),
    method: req.method,
    path: req.originalUrl,
    clientId,
    status: success ? "success" : "failure",
  };

  const index = success ? "api-success-logs" : "api-failure-logs";

  try {
    await esClient.index({
      index,
      body: logDocument,
    });
  } catch (error) {
    console.error("Failed to log request to Elasticsearch:", error);
  }
}

export { logRequestToElasticsearch };
