/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards, Request, Post, Body, Param } from '@nestjs/common';

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CatalogService } from './catalog.service';

import { CreateCatalogDto } from './dto/create-catalog.dto';
import { CreateItemDto } from './dto/create-item.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

    @Get('/all')
    async all(): Promise<any> {
        return await this.catalogService.getAll()
    }

    @Get('/details/:catalog_id')
    async getCatalog(@Param() catalog_id): Promise<any> {
        return await this.catalogService.getCatalog(catalog_id)
    }

    @Get('/get')
    async sellerCatalog(@Request() req): Promise<any> {
        return await this.catalogService.getUserCatalog(req.user.user_id)
    }

    @Post('/create')
    async create(@Request() req, @Body() createCatalogDto: CreateCatalogDto): Promise<any> {
        const data = {
            user_id: req.user.user_id,
            ...createCatalogDto
        }

        return await this.catalogService.createCatalog(data)
    }

    @Post('/create/item')
    async createItem(@Body() createItemDto: CreateItemDto): Promise<any> {
        return await this.catalogService.createCatalogItem(createItemDto)
    }
}