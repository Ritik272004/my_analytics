export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL as string;


export async function fetchData(endpoint: string) {
  const res = await fetch(`${API_BASE}/${endpoint}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

export async function postData(endpoint: string, data: any) {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to post to ${endpoint}`);
  return res.json();
}


