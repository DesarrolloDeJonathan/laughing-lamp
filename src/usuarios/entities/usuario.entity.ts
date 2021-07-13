import 'reflect-metadata';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Usuarios {
    @Field(type => ID)
    id: number

    @Field()
    email: string

    @Field()
    name: string

    @Field({nullable: true})
    salt?: string

    @Field()
    password: string

    @Field({nullable: true})
    token?: string
}