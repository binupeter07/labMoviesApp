const AUTH_API = import.meta.env.VITE_AUTH_API;

export const signIn = async (username: string, password: string) => {
  const response = await fetch(`${AUTH_API}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};