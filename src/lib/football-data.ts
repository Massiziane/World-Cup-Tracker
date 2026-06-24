export async function footballFetch<T>(endpoint: string): Promise<T> {
  const token = process.env.FOOTBALL_DATA_API_TOKEN;

  if (!token) {
    throw new Error("FOOTBALL_DATA_API_TOKEN is missing");
  }

  const response = await fetch(`${process.env.BASE_URL}${endpoint}`, {
    headers: {
      "X-Auth-Token": token,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Football Data API Error ${response.status}: ${errorText}`
    );
  }

  return response.json();
}