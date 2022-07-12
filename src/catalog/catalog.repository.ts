/* eslint-disable prettier/prettier */
import { Repository, EntityRepository } from "typeorm";
import { UnauthorizedException } from '@nestjs/common';

import { Catalog } from "./catalog.entity";
import { Item } from "./item.entity";

@EntityRepository(Catalog)
export class CatalogRepository extends Repository<Catalog> {
    async getAll(): Promise<any> {
        const catalogs = await this.createQueryBuilder('catalog')
        .innerJoin('catalog.seller', 'seller')
        .select(['catalog.catalog_id', 'catalog.name','seller.name', 'seller.email'])
        .orderBy('catalog.created_at', 'DESC')
        .getMany()

        return catalogs;
    }

    async getCatalog(catalog_id): Promise<any> {
        const catalog = await this.createQueryBuilder('catalog')
        .where('catalog.catalog_id', catalog_id)
        .innerJoin('catalog.seller', 'seller')
        .leftJoin('catalog.items', 'items')
        .select(['catalog.catalog_id', 'catalog.name','seller.name', 'seller.email', 'items.item_id', 'items.name', 'items.price'])
        .getOne()

        return catalog;
    }

    async getUserCatalog(user_id): Promise<any> {
        const catalog = await this.createQueryBuilder('catalog')
        .where('catalog.user_id', user_id)
        .leftJoin('catalog.items', 'items')
        .select(['catalog', 'items'])
        .getOne()

        if(!catalog) {
            throw new UnauthorizedException('Catalog does not exist.');
        }

        return catalog;
    }

    async createCatalog(data): Promise<any> {
        const userCatalog = await this.findOne({ user_id: data.user_id })

        if(userCatalog) {
            throw new UnauthorizedException('cannot create more then one catalog.');
        }

        const catalog = new Catalog();

        catalog.name = data.name
        catalog.user_id = data.user_id
        await catalog.save()

        return catalog;
    }

    async createCatalogItem(data): Promise<any> {
        const userCatalog = await this.findOne({ catalog_id: data.catalog_id })

        if(!userCatalog) {
            throw new UnauthorizedException('Catalog does not exist.');
        }

        const item = new Item();

        item.catalog_id = data.catalog_id;
        item.name = data.name;
        item.price = data.price;

        await item.save();

        return item;
    }
}