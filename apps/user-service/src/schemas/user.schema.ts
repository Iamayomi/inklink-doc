// apps/auth-service/src/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { getRandomAvatarUrl } from 'libs/utils';
import { AbstractDocument } from 'yes/common';

@Schema({ timestamps: true })
export class User extends AbstractDocument {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: false }) // Password is optional for OAuth users
  password?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: getRandomAvatarUrl() })
  avatarUrl: string;

  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role: string;

  @Prop({
    type: [
      {
        provider: String,
        accessToken: String,
        refreshToken: String,
        expiresAt: Date,
      },
    ],
    default: [],
  })
  oauth: {
    provider: string;
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
  }[];

  @Prop({ default: false })
  twoFactorEnabled: boolean;

  @Prop()
  twoFactorSecret?: string;

  @Prop()
  lastLogin?: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ 'oauth.provider': 1 });
