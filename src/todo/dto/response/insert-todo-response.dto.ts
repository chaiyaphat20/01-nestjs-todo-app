
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsertTodoResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}