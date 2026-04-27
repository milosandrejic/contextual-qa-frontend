const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  detail: string;

  constructor(status: number, detail: string) {
    super(detail);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

async function parseError(response: Response): Promise<ApiError> {
  let detail = response.statusText || `Request failed with ${response.status}`;

  try {
    const data = await response.json();

    if (data && typeof data.detail === "string") {
      detail = data.detail;
    }
  } catch {
    // body not JSON; keep default detail
  }

  return new ApiError(response.status, detail);
}

async function handle<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw await parseError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    method: "GET",
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  return handle<T>(response);
}

export async function apiJson<T>(
  path: string,
  body: unknown,
  init?: RequestInit & { method?: "POST" | "PUT" | "PATCH" }
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    method: init?.method ?? "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
    },
    body: JSON.stringify(body),
  });

  return handle<T>(response);
}

export async function apiDelete<T = void>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    method: "DELETE",
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  return handle<T>(response);
}

export async function apiUpload<T>(
  path: string,
  file: File,
  fieldName = "file",
  init?: RequestInit
): Promise<T> {
  const form = new FormData();

  form.append(fieldName, file);

  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    method: "POST",
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
    body: form,
  });

  return handle<T>(response);
}

export const apiBaseUrl = BASE_URL;
