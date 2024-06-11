import { Injectable } from '@nestjs/common';
import { TodoRequestDto } from './dto/request/todo-request.dto';

@Injectable()
export class TodoService {

  private todoList: TodoRequestDto[] = [];

  async getTodo(
  ): Promise<TodoRequestDto[]> {
    return this.todoList;
  }
}


