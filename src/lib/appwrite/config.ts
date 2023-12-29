import { Client, Account, Avatars, Storage, Databases } from "appwrite";

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_ENDPOINT_URL,
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);
export const databases= new Databases(client);