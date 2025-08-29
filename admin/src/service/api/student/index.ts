import axios, { AxiosInstance } from "axios";

import { Configs } from "@/utils/constants";

import { StudentCreateArgs, StudentResponse, StudentUpdateArgs } from "./types";


class StudentClient {
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
        const { data } = await this.client.get<StudentResponse[]>("/students");
        return data;
    }

    async getById(id: string) {
        const { data } = await this.client.get<StudentResponse>(`/students/${id}`);
        return data;
    }

    async create(args: StudentCreateArgs) {
        const { data } = await this.client.post<StudentResponse>("/students", args);
        return data;
    }

    async update(id: string, args: StudentUpdateArgs) {
        const { data } = await this.client.put<StudentResponse>(`/students/${id}`, args);
        return data;
    }

    async delete(id: string) {
        const { data } = await this.client.delete<string>(`/students/${id}`);
        return data;
    }
}

export { StudentClient };