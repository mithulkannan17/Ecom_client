import {jwtDecode} from "jwt-decode";

type TokenType = {
    name: string;
    role: string;
    email: string;
    exp: number;
    id?: string; 
};

const storeToken = (token: string) => {
    localStorage.setItem("token", token);
};

const getToken = (): string | null => {
    return localStorage.getItem("token");
};

const getDecodedToken = (): TokenType | null => {
    const token = getToken();
    if (!token) return null;

    try {
        return jwtDecode<TokenType>(token);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

const getRole = () => getDecodedToken()?.role ?? null;

const getEmail = () => getDecodedToken()?.email ?? null;

const getName = () => getDecodedToken()?.name ?? null;

const getUID = () => getDecodedToken()?.id ?? null;

const isLoginValid = () => {
    const decoded = getDecodedToken();
    if (!decoded) return false;

    return decoded.exp > Date.now() / 1000;
};

export { storeToken, getToken, getEmail, getRole, isLoginValid, getName, getUID };
