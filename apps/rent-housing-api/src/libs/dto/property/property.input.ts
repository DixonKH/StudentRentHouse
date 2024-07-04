import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import {
	PropertyAmenities,
	PropertyLocation,
	PropertyStatus,
	PropertyType,
	PropertyUtilityBills,
	StayDuration,
} from '../../enums/property.enum';
import { ObjectId } from 'mongoose';
import { availablePropertySorts } from '../../config';
import { Direction } from '../../enums/common.enum';
import { Optional } from '@nestjs/common';

@InputType()
export class PropertyInput {
	@IsNotEmpty()
	@Field(() => PropertyType)
	propertyType: PropertyType;

	@IsNotEmpty()
	@Field(() => [PropertyAmenities])
	propertyAmenities: PropertyAmenities[];

	@IsNotEmpty()
	@Field(() => PropertyLocation)
	propertyLocation: PropertyLocation;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	propertyAddress: string;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	propertyTitle: string;

	@IsNotEmpty()
	@Field(() => Number)
	propertyPrice: number;

	@IsNotEmpty()
	@Field(() => Number)
	propertyDeposite: number;

	@IsNotEmpty()
	@Field(() => [PropertyUtilityBills])
	propertyUtilityBills: PropertyUtilityBills[];

	@IsNotEmpty()
	@Field(() => Number)
	propertySquare: number;

	@IsNotEmpty()
	@IsInt()
	@Min(1)
	@Field(() => Int)
	propertyBeds: number;

	@IsNotEmpty()
	@IsInt()
	@Min(1)
	@Field(() => Int)
	propertyRooms: number;

	@IsNotEmpty()
	@Field(() => [String])
	propertyImages: string[];

	@IsOptional()
	@Field(() => String, { nullable: true })
	propertyDesc?: string;

	@IsOptional()
	@Field(() => StayDuration, { nullable: true })
	stayDuration?: StayDuration.MONTHLY;

	@IsOptional()
	@Field(() => Boolean, { nullable: true })
	propertyRent?: boolean;

	@IsOptional()
	@Field(() => String, { nullable: true })
	memberId?: ObjectId;

	@IsOptional()
	@Field(() => Date, { nullable: true })
	constructedAt?: Date;
}

@InputType()
class PricesRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
class SquaresRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
class PeriodsRange {
	@Field(() => Date)
	start: Date;

	@Field(() => Date)
	end: Date;
}

@InputType()
class PISearch {
	@IsOptional()
	@Field(() => String, { nullable: true })
	memberId?: ObjectId;

	@IsOptional()
	@Field(() => [PropertyLocation], { nullable: true })
	locationList?: PropertyLocation[];

	@IsOptional()
	@Field(() => [PropertyType], { nullable: true })
	typeList?: PropertyType[];

	@IsOptional()
	@Field(() => [PropertyAmenities], { nullable: true })
	amenityList?: PropertyAmenities[];

	@IsOptional()
	@Field(() => [StayDuration], { nullable: true })
	durationList?: StayDuration[];

	@IsOptional()
	@Field(() => [Int], { nullable: true })
	roomsList?: Number[];

	@IsOptional()
	@Field(() => [Int], { nullable: true })
	bedsList?: Number[];

	@IsOptional()
	@Field(() => Number, { nullable: true })
	homeDeposite?: Number;

	@IsOptional()
	@Field(() => Boolean, { nullable: true })
	homeRent?: Boolean;

	@IsOptional()
	@Field(() => PricesRange, { nullable: true })
	pricesRange?: PricesRange;

	@IsOptional()
	@Field(() => PeriodsRange, { nullable: true })
	periodsRange?: PeriodsRange;

	@IsOptional()
	@Field(() => SquaresRange, { nullable: true })
	squaresRange?: SquaresRange;

	@IsOptional()
	@Field(() => String, { nullable: true })
	text?: string;
}

@InputType()
export class PropertiesInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => PISearch)
	search: PISearch;
}

@InputType()
export class APISearch {
	@IsOptional()
	@Field(() => PropertyStatus, { nullable: true })
	propertyStatus?: PropertyStatus;
}

@InputType()
export class AgentPropertiesInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@Optional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@Optional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => APISearch)
	search: APISearch;
}

@InputType()
export class ALPISearch {
	@Optional()
	@Field(() => PropertyStatus, { nullable: true })
	propertyStatus?: PropertyStatus;

	@Optional()
	@Field(() => [PropertyLocation], { nullable: true })
	propertyLocationList?: PropertyLocation[];
}

@InputType()
export class AllPropertiesInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@Optional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@Optional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => ALPISearch)
	search: ALPISearch;
}

@InputType()
export class OrdinaryInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;
}
