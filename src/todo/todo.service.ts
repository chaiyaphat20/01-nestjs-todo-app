import { Injectable } from '@nestjs/common';
import { Todo } from './dto/model/todo-model';
import { InsertTodoRequestDto } from './dto/request/insert-todo-request.dto';
import { TodoResponseDto } from './dto/response/get-todo-response.dto';

@Injectable()
export class TodoService {

  private todoList: TodoResponseDto[] = [];

  getTodo(
  ): TodoResponseDto[] {
    return this.todoList;
  }

  insertTodo(
    dto: InsertTodoRequestDto,
  ): string {
    const todoId = Math.random().toString();
    const newTodo = new Todo(todoId, dto.title, dto.description, dto.done);
    this.todoList.push(newTodo);
    return todoId;
  }
}


