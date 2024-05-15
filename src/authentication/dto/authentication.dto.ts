import { PickType, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UserMobileDTO {
  @IsString()
  @Length(10, 13, { message: 'شماره موبایل به درستی وارد نشده است' })
  mobile: string;
}
export class UserRegistrationDTO extends UserMobileDTO {
  @IsString()
  @Length(1, 50, {
    message: 'نام کوچک نباید بیشتر از 50 کاراکتر و از 1 کاراکتر کمتر باشد',
  })
  first_name: string;

  @Length(1, 50, {
    message: 'نام خانوادگی نباید بیشتر از 100 کاراکتر و از 1 کاراکتر کمتر باشد',
  })
  @IsString()
  last_name: string;

  @IsString()
  @Length(6, 32, {
    message: 'حداقل طول پسورد باید بین 6 کاراکتر و 32 کاراکتر باشد',
  })
  password: string;

  @IsString()
  @Length(6, 6, { message: 'کد وارد شده صحیح نمیباشد' })
  otp: string;
}

export class LoginDTO extends IntersectionType(
  PartialType(PickType(UserRegistrationDTO, ['password', 'otp'])),
  UserMobileDTO,
) {}
