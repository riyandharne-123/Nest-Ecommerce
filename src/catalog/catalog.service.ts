/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogRepository } from './catalog.repository';

@Injectable()
export class CatalogService {
    constructor(
        @InjectRepository(CatalogRepository)
        private catalogRepository: CatalogRepository
    ){}

    async getAll(): Promise<any> {
        const response = await this.catalogRepository.getAll()
        return response;
    }

    async getCatalog(catalog_id): Promise<any> {
        const response = await this.catalogRepository.getCatalog(catalog_id);
        return response;
    }

    async getUserCatalog(user_id): Promise<any> {
        const response = await this.catalogRepository.getUserCatalog(user_id);
        return response;
    }

    async createCatalog(data): Promise<any> {
        const response = await this.catalogRepository.createCatalog(data)
        return response;
    }
    
    async createCatalogItem(data): Promise<any> {
        const response = await this.catalogRepository.createCatalogItem(data)
        return response;
    }
}