import { registerEnumType } from '@nestjs/graphql';

export enum ViewGroup {
	MEMBER = 'MEMBER',
	ARTICLE = 'ARTICLE',
	PROPERTY = 'PROPERTY',
	BOARD_ARTICLE = 'BOARD_ARTICLE',
}
registerEnumType(ViewGroup, {
	name: 'ViewGroup',
});
