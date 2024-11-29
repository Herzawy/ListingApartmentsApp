import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Apartment, ApartmentDocument } from './entities/apartments.entity';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { FilterApartmentDto } from './dto/filter-apartment.dto';

@Injectable()
export class ApartmentsService {
    constructor(
        @InjectModel(Apartment.name) private apartmentModel: Model<ApartmentDocument>,
    ) { }

    async create(createApartmentDto: CreateApartmentDto): Promise<Apartment> {
        const apartment = new this.apartmentModel(createApartmentDto);
        return apartment.save();
    }

    async findAll(filter: FilterApartmentDto): Promise<Apartment[]> {
        const query = {};
        if (filter.unitName) query['unitName'] = filter.unitName;
        if (filter.unitNumber) query['unitNumber'] = filter.unitNumber;
        if (filter.project) query['project'] = filter.project;

        return this.apartmentModel.find(query).exec();
    }

    async findOne(id: string): Promise<Apartment> {
        return this.apartmentModel.findById(id).exec();
    }
}
