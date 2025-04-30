// apps/auth-service/src/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getRandomAvatarUrl } from 'libs/utils';
import * as randomize from 'randomatic';
import * as argon2 from 'argon2';
import { isEmail } from 'class-validator';

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    validate: [isEmail, '`{VALUE}` is not a valid email!'],
  })
  email: string;

  @Prop({ required: false }) // Password is optional for OAuth users
  password?: string;

  @Prop({ required: false })
  name?: string;

  @Prop({ default: getRandomAvatarUrl() })
  avatarUrl?: string;

  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role?: string;

  @Prop()
  isEmailVerified: boolean;

  // @Prop({
  //   type: [
  //     {
  //       provider: String,
  //       accessToken: String,
  //       refreshToken: String,
  //       expiresAt: Date,
  //     },
  //   ],
  //   default: [],
  // })
  // oauth?: {
  //   provider: string;
  //   accessToken: string;
  //   refreshToken: string;
  //   expiresAt: Date;
  // }[];

  @Prop()
  lastLogin?: Date;

  @Prop({ default: true })
  isActive?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await argon2.hash(this.password);
});

UserSchema.methods.verifyPassword = async function (password: string) {
  return await argon2.verify(this.password, password);
};

export const makeUsernameFromEmail = (email: string) =>
  `${email.split('@')[0]}${randomize('0', 4)}`;

UserSchema.index({ role: 1 });
UserSchema.index({ 'oauth.provider': 1 });
