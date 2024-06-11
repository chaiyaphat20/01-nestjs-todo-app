import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoRequestDto } from './dto/request/todo-request.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  // @ApiResponse({ status: 200, type: ListWorkCenterResponseDto, isArray: true })
  @HttpCode(HttpStatus.OK)
  async listWorkCenter(): Promise<TodoRequestDto[]> {
    return this.todoService.getTodo();
  }
}
