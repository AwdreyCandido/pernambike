const API_KEY = "AIzaSyAxLsiaMQDmid-UwuTCGdi3C3YpaM4jDw8";

export const signUpEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

export const loginEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
