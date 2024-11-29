import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Document } from 'mongoose';

export type ApartmentDocument = Apartment & Document;

@Schema()
export class Apartment extends Document {
  @Prop({
    type: String,
    default: uuidv4,
  })
  _id: string;

  @Prop({ required: true })
  unitName: string;

  @Prop({ required: true })
  unitNumber: string;

  @Prop()
  project?: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  imageUrl?: string;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
