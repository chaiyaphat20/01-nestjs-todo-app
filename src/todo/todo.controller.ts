import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { InsertTodoRequestDto, } from './dto/request/insert-todo-request.dto';
import { TodoResponseDto } from './dto/response/get-todo-response.dto';
import { InsertTodoResponseDto } from './dto/response/insert-todo-response.dto';
import { UpdateTodoRequestDto } from './dto/request/update-todo-request.dto';
import { UpdateTodoResponseDto } from './dto/response/update-todo-response.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllTodo(): TodoResponseDto[] {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodoById(@Param('id') todoId: string): TodoResponseDto {
    return this.todoService.getTodoById(todoId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  insertTodo(
    @Body()
    dto: InsertTodoRequestDto,
  ): InsertTodoResponseDto {
    return this.todoService.insertTodo(dto);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  updateTodo(
    @Body()
    dto: UpdateTodoRequestDto,
  ): UpdateTodoResponseDto {
    return this.todoService.updateTodo(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteTodoById(@Param('id') todoId: string) {
    this.todoService.deleteTodoById(todoId);
  }
}
