import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from '../../libs/dto/member/member';
import { MemberInput } from '../../libs/dto/member/member.input';
import { Message } from '../../libs/enums/common.enum';

@Injectable()
export class MemberService {
	constructor(@InjectModel('Member') private readonly memberModel: Model<Member>) {}

	public async signup(input: MemberInput): Promise<Member> {
		//TODO: Hash password
		try {
			const result = await this.memberModel.create(input);
			//TODO: Authentiaction via token
			return result;
		} catch (err) {
			console.log('Error Service.model Signup: ', err.message);
			throw new BadRequestException(Message.USED_NICK_PHONE);
		}
	}

	public async login(): Promise<string> {
		return 'Login successful';
	}

	public async updateMember(): Promise<string> {
		return 'updateMember successful';
	}

	public async getMember(): Promise<string> {
		return 'getMember successful';
	}
}
