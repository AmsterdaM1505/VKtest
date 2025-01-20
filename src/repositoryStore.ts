import { makeAutoObservable } from 'mobx';
import { fetchRepositories } from './api';

export interface Repository {
    id: number;
    name: string;
    description: string;
    stars: number;
}

class RepositoryStore {
    repositories: Repository[] = [];
    isLoading = false;
    currentPage = 1;

    constructor() {
        makeAutoObservable(this);
    }

    async loadRepositories() {
        this.isLoading = true;
        try {
            const newRepositories = await fetchRepositories(this.currentPage, 20);
            this.repositories.push(...newRepositories);
            this.currentPage += 1;
            console.log(newRepositories);
        } finally {
            this.isLoading = false;
        }
    }

    deleteRepository(id: number) {
        this.repositories = this.repositories.filter((repo) => repo.id !== id);
    }

    editRepository(id: number, newData: Partial<Repository>) {
        const repoIndex = this.repositories.findIndex((repo) => repo.id === id);
        if (repoIndex > -1) {
            this.repositories[repoIndex] = {
                ...this.repositories[repoIndex],
                ...newData,
            };
        }
    }
}

export const repositoryStore = new RepositoryStore();
