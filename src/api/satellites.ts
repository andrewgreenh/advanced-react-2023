export const baseUrl = "http://localhost:3002/satellites";

export type Satellite = {
  id: string;
  name: string;
  type: "science" | "military" | "communication";
  angle: number;
  reverse: boolean;
};

export const satellitesApi = {
  async getAll() {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data: Satellite[] = await response.json();

    return data;
  },

  async get(id: string) {
    const response = await fetch(baseUrl + "/" + id);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data: Satellite = await response.json();

    return data;
  },

  async create(satellite: Omit<Satellite, "id">) {
    const response = await fetch(baseUrl, {
      method: "post",
      body: JSON.stringify(satellite),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data: Satellite = await response.json();

    return data;
  },

  async update(satellite: Satellite) {
    const response = await fetch(baseUrl + "/" + satellite.id, {
      method: "put",
      body: JSON.stringify(satellite),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data: Satellite = await response.json();

    return data;
  },
};
