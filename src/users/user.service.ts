import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(email: string, password: string): Promise<User> {
    const newUser = new this.userModel({ email, password });
    return newUser.save();
  }

  async login(email: string, password: string): Promise<User | null> {
    return this.userModel.findOne({ email, password }).exec();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}