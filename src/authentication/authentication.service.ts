import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/authentication.dto';
import { checkExpiredTime } from 'src/common/utilities/date.utils';
import { JwtService } from '@nestjs/jwt';
import { VendorsService } from 'src/vendors/vendors.service';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersSerivce: UsersService,
    private readonly vendorsService: VendorsService,
    private readonly adminsSerivce: AdminsService,
    private readonly jwtService: JwtService,
  ) {}
  // -> user's can login with 2 options.
  // -> With OTP or with Password, and one of them is REQUIRED
  async userLogin(fields: LoginDTO, ip: string, userAgent: string) {
    const { mobile, password, otp } = fields;
    //password is-optional here
    const user = await this.usersSerivce.findUser(mobile, password);
    if (!user)
      throw new NotFoundException(
        `حساب کاربری شما یافت نشد, ورودی ها را بررسی کنید`,
      );
    if (otp) {
      await this.validateWithOTP(mobile, otp);
      return this.createUserTokens(user.id, ip, userAgent);
    } else if (password) {
      return this.createUserTokens(user.id, ip, userAgent);
    }
    throw new BadRequestException();
  }

  async vendorLogin(fields: LoginDTO, ip: string, userAgent: string) {
    const { mobile, password, otp } = fields;
    //password is-optional here
    const vendor = await this.vendorsService.findVendor(mobile, password);
    if (!vendor)
      throw new NotFoundException(
        `حساب کاربری شما یافت نشد, ورودی ها را بررسی کنید`,
      );
    if (otp) {
      await this.validateWithOTP(mobile, otp);
      return this.createUserTokens(vendor.id, ip, userAgent);
    } else if (password) {
      return this.createUserTokens(vendor.id, ip, userAgent);
    }
    throw new BadRequestException();
  }

  async adminLogin(fields: LoginDTO, ip: string, userAgent: string) {
    const { mobile, password, otp } = fields;
    //password is-optional here
    const admin = await this.adminsSerivce.findAdmin(mobile, password);
    if (!admin)
      throw new NotFoundException(
        `حساب کاربری شما یافت نشد, ورودی ها را بررسی کنید`,
      );
    if (otp) {
      await this.validateWithOTP(mobile, otp);
      return this.createUserTokens(admin.id, ip, userAgent);
    } else if (password) {
      return this.createUserTokens(admin.id, ip, userAgent);
    }
    throw new BadRequestException();
  }

  async registerUser() {}

  async registerVendor() {}

  async reconveryUser() {}

  async reconveryVentor() {}

  // -> Validate register or login or recovery with OTP list
  async validateWithOTP(mobile: string, otp: string) {
    const otpItem = await this.prisma.oTPList.findFirst({ where: { mobile } });
    if (!otpItem) throw new NotFoundException(`کد یکبار مصرف یافت نشد`);
    const isExpired = checkExpiredTime(otpItem.created_at, null, 120);
    if (isExpired) {
      await this.prisma.oTPList.deleteMany({ where: { mobile } });
      throw new BadRequestException(
        `مدت زمان استفاده از کدیکبار مصرف به اتمام رسیده`,
      );
    }
    if (otpItem.code !== otp)
      throw new BadRequestException(`کد یکبار مصرف صحیح نمی باشد`);
    await this.prisma.oTPList.deleteMany({ where: { mobile } });
    return true;
  }

  async createUserTokens(
    userId: string,
    ip_address: string,
    user_agent: string,
    daysToExpire: number = 30,
  ) {
    try {
      const expired_at = new Date();
      expired_at.setDate(expired_at.getDate() + daysToExpire);
      const access_token = await this.jwtService.signAsync({ id: userId });
      await this.prisma.loginDevices.create({
        data: {
          access_token,
          ip_address,
          user_agent,
          user_id: userId,
          expired_at,
        },
      });
      return { access_token };
    } catch (error) {
      throw new InternalServerErrorException('مشکلی در سمت سرور رخ داد');
    }
  }
}
