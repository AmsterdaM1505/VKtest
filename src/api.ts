import axios from 'axios';

const API_URL = 'https://api.github.com/search/repositories';


let lastCallTime = 0;
const throttleDelay = 500;

export const fetchRepositories = async (page: number, perPage: number) => {
    const now = Date.now();
    
    if (now - lastCallTime < throttleDelay) {
        const waitTime = throttleDelay - (now - lastCallTime);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    lastCallTime = Date.now();

    const response = await axios.get(API_URL, {
        params: {
            q: 'javascript',
            sort: 'stars',
            order: 'asc',
            page,
            per_page: perPage,
        },
    });

    return response.data.items;
};
