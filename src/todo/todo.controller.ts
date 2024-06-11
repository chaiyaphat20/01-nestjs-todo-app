import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { InsertTodoRequestDto, } from './dto/request/insert-todo-request.dto';
import { TodoResponseDto } from './dto/response/get-todo-response.dto';
import { InsertTodoResponseDto } from './dto/response/insert-todo-response.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  getTodo(): TodoResponseDto[] {
    return this.todoService.getTodo();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  insertTodo(
    @Body()
    dto: InsertTodoRequestDto,
  ): InsertTodoResponseDto {
    return this.todoService.insertTodo(dto);
  }
}
