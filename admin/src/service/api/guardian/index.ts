import axios, { AxiosInstance } from "axios";

import { Configs } from "@/utils/constants";

import { GuardianCreateArgs, GuardianResponse, GuardianUpdateArgs } from "./types";


class GuardianClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: Configs.apiUrl,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async getAll() {
        const { data } = await this.client.get<GuardianResponse[]>("/guardians");
        return data;
    }

    async getById(id: string) {
        const { data } = await this.client.get<GuardianResponse>(`/guardians/${id}`);
        return data;
    }

    async create(args: GuardianCreateArgs) {
        const { data } = await this.client.post<GuardianResponse>("/guardians", args);
        return data;
    }

    async update(id: string, args: GuardianUpdateArgs) {
        const { data } = await this.client.put<GuardianResponse>(`/guardians/${id}`, args);
        return data;
    }

    async delete(id: string) {
        const { data } = await this.client.delete<string>(`/guardians/${id}`);
        return data;
    }
}

export { GuardianClient };