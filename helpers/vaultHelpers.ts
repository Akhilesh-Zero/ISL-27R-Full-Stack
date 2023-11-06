import Vault from "node-vault";

// Initialize Vault client
const vault = Vault({
  endpoint: process.env.VAULT_ENDPOINT,
  token: process.env.VAULT_TOKEN,
});

// Function to fetch the API endpoints from Vault we use APIgee for or calls
// to exaplin I am using it from this function
export async function fetchApiEndpoints(): Promise<any> {
  try {
    const secret: any = await vault.read("secrets/api-endpoints");
    return secret.data;
  } catch (error) {
    console.error("Failed to fetch API endpoints from Vault:", error);
    throw error;
  }
}
