import { api } from "../lib/axios";

export const getUser = async (userLogin: string) => {
    try {
        const response = await api.get(`/${userLogin}`);

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserRepos = async (userLogin: string) => {
    try {
        const response = await api.get(`/${userLogin}/repos`);
        
        return response.data;
    } catch (error) {
        throw error;
    }
};