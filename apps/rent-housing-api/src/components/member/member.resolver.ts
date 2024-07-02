import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { shapeIntoMongoObjectId } from '../../libs/config';

@Resolver()
export class MemberResolver {
	constructor(private readonly memberService: MemberService) {}

	@Mutation(() => Member)
	public async signup(@Args('input') input: MemberInput): Promise<Member> {
		console.log('Muatation Singup');
		return this.memberService.signup(input);
	}

	@Mutation(() => Member)
	public async login(@Args('input') input: LoginInput): Promise<Member> {
		console.log('Muatation login');
		return this.memberService.login(input);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => String)
	public async updateMember(@AuthMember('_id') memberId: string): Promise<string> {
		console.log('Muatation updateMember');
		return this.memberService.updateMember();
	}

	@UseGuards(AuthGuard)
	@Query(() => String)
	public async checkauth(@AuthMember('memberNick') memberNick: string): Promise<string> {
		console.log('Query checkauth');
		return `Hi ${memberNick}`;
	}

	@Query(() => String)
	public async getMember(): Promise<string> {
		console.log('Query: getMember');
		return this.memberService.getMember();
	}

	/** ADMIN  */

	//Authorization; ADMIN
	@Mutation(() => String)
	public async getAllMembersByAdmin(): Promise<string> {
		console.log('Muatation getAllMembersByAdmi');
		return this.memberService.getAllMembersByAdmin();
	}

	//Authorization; ADMIN
	@Mutation(() => String)
	public async updateMembersByAdmin(): Promise<string> {
		console.log('Muatation updateMembersByAdmin');
		return this.memberService.updateMembersByAdmin();
	}
}
