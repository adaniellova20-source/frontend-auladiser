const API_URL = process.env.REACT_APP_API_URL;

export async function loginUser(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(`${username}:${password}`)
        }
    });

    if (!response.ok) {
        let message = "Credenciales incorrectas";

        try {
            const errorData = await response.json();
            message = errorData.message || errorData.error || message;
        } catch {
            try {
                const errorText = await response.text();
                if (errorText) message = errorText;
            } catch {}
        }

        throw new Error(message);
    }

    const contentType = response.headers.get("content-type") || "";
    let token = "";

    if (contentType.includes("application/json")) {
        const data = await response.json();
        token = data.access_token || data.token || "";
    } else {
        token = await response.text();
    }

    if (!token) {
        throw new Error("No se recibió token del servidor");
    }

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);

    return token;
}
