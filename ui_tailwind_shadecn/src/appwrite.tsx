import { Account, AppwriteException, Client, OAuthProvider } from "appwrite"

const client = new Client()
    .setEndpoint('http://localhost/v1') 
    .setProject('6631da7e003003f677f6'); 

export const getUserData = async () => {
  try {
    const account = new Account(client)
    console.log(account.get())
    return account.get()
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const login = async () => {
  try {
    const account = new Account(client)
    return account.createOAuth2Session(
        OAuthProvider.Github,
        'http://localhost:5173/'
    )
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}

export const logout = async () => {
    try {
      const account = new Account(client);
      await account.deleteSession('current'); 
    } catch (error) {
      const appwriteError = error as AppwriteException;
      throw new Error(appwriteError.message);
    }
  };
  
export default client;
