import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({ region: "us-east-1" });
const secretName = "rds!db-89d8f601-b6c9-4b64-a5df-29be7da8d441";

export const getDatabaseCredentials = async () => {
  try {
    const response = await client.send(
      new GetSecretValueCommand({ SecretId: secretName, VersionStage: "AWSCURRENT" })
    );
    return JSON.parse(response.SecretString);
  } catch (error) {
    console.error("Error fetching secrets:", error);
    throw error;
  }
};
