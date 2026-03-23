const API_URL = process.env.REACT_APP_API_URL;

function getAuthHeaders(includeJson = true) {
    const token = sessionStorage.getItem("token");

    return {
        ...(includeJson ? { "Content-Type": "application/json" } : {}),
        Authorization: `Bearer ${token}`
    };
}

function formatValidationErrors(errorData) {
    if (!errorData) return "Ocurrió un error";

    if (typeof errorData === "string") {
        return errorData;
    }

    if (errorData.message && typeof errorData.message === "string") {
        return errorData.message;
    }

    if (errorData.errors && typeof errorData.errors === "object") {
        return Object.entries(errorData.errors)
            .map(([field, messages]) => {
                const text = Array.isArray(messages) ? messages.join(", ") : messages;
                return `${field}: ${text}`;
            })
            .join(" | ");
    }

    if (typeof errorData === "object") {
        return Object.entries(errorData)
            .map(([field, messages]) => {
                const text = Array.isArray(messages) ? messages.join(", ") : messages;
                return `${field}: ${text}`;
            })
            .join(" | ");
    }

    return "Ocurrió un error";
}

async function handleResponse(response) {
    if (response.status === 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        window.location.href = "/login";
        return;
    }

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    if (!response.ok) {
        let message = "Ocurrió un error";

        if (isJson) {
            const errorData = await response.json();
            message = formatValidationErrors(errorData);
        } else {
            const errorText = await response.text();
            if (errorText) message = errorText;
        }

        throw new Error(message);
    }

    if (response.status === 204) {
        return null;
    }

    return isJson ? response.json() : response.text();
}

export async function getCustomers() {
    const response = await fetch(`${API_URL}/customers`, {
        method: "GET",
        headers: getAuthHeaders(false)
    });

    return handleResponse(response);
}

export async function getCustomerById(id) {
    const response = await fetch(`${API_URL}/customers/${id}`, {
        method: "GET",
        headers: getAuthHeaders(false)
    });

    return handleResponse(response);
}

export async function createCustomer(customer) {
    const response = await fetch(`${API_URL}/customers`, {
        method: "POST",
        headers: getAuthHeaders(true),
        body: JSON.stringify(customer)
    });

    return handleResponse(response);
}

export async function updateCustomer(id, customer) {
    const response = await fetch(`${API_URL}/customers/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(true),
        body: JSON.stringify(customer)
    });

    return handleResponse(response);
}

export async function deleteCustomer(id) {
    const response = await fetch(`${API_URL}/customers/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(false)
    });

    return handleResponse(response);
}
