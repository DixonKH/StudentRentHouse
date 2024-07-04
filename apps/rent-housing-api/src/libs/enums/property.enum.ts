import { registerEnumType } from '@nestjs/graphql';

export enum PropertyType {
	APARTMENT = 'APARTMENT',
	DORMITORY = 'DORMITORY',
	SINGLR_ROOM = 'SINGLR_ROOM',
	STUDIO = 'STUDIO',
	HOUSE = 'HOUSE',
}
registerEnumType(PropertyType, {
	name: 'PropertyType',
});

export enum PropertyAmenities {
	ELEVATOR = 'ELEVATOR',
	INTERNET = 'INTERNET',
	PARKING = 'PARKING',
	WASHING_MACHINE = 'WASHING_MACHINE',
	DISHWASHER = 'DISHWASHER',
	AIR_CONDITIONER = 'AIR_CONDITIONER',
	VACUUM_CLEANER = 'VACUUM_CLEANER',
	HEAT_PUMP = 'HEAT_PUMP',
	FURNITURE = 'FURNITURE',
	TV = 'TV',
}

registerEnumType(PropertyAmenities, {
	name: 'PropertyAmenities',
});

export enum StayDuration {
	MONTHLY = 'MONTHLY',
	HALF_YEATR = 'HALF_YEATR',
	ANNUAL = 'ANNUAL',
}

registerEnumType(StayDuration, {
	name: 'leaseDuration',
});

export enum PropertyStatus {
	ACTIVE = 'ACTIVE',
	SOLD = 'SOLD',
	DELETE = 'DELETE',
}
registerEnumType(PropertyStatus, {
	name: 'PropertyStatus',
});

export enum PropertyLocation {
	SEOUL = 'SEOUL',
	BUSAN = 'BUSAN',
	INCHEON = 'INCHEON',
	DAEGU = 'DAEGU',
	GYEONGJU = 'GYEONGJU',
	GWANGJU = 'GWANGJU',
	CHONJU = 'CHONJU',
	DAEJON = 'DAEJON',
	JEJU = 'JEJU',
	ULSAN = 'ULSAN',
	GWANGYONG = 'GWANGYONG',
	GIMHAE = 'GIMHAE',
	YONGIN = 'YONGIN',
}
registerEnumType(PropertyLocation, {
	name: 'PropertyLocation',
});

export enum PropertyUtilityBills {
	GAS = 'GAS',
	WATER = 'WATER',
	ELECTRICITY = 'ELECTRICITY',
	INTERNET = 'INTERNET',
}

registerEnumType(PropertyUtilityBills, {
	name: 'PropertyUtilityBills',
});
