import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './dto/model/todo-model';
import { InsertTodoRequestDto } from './dto/request/insert-todo-request.dto';
import { TodoResponseDto } from './dto/response/get-todo-response.dto';
import { plainToInstance } from 'class-transformer';
import { InsertTodoResponseDto } from './dto/response/insert-todo-response.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export class TodoService {

  private todoList: TodoResponseDto[] = [];

  getTodos(): TodoResponseDto[] {
    return this.todoList;
  }

  getTodoById(id: string): TodoResponseDto {
    const todo = this.findTodoById(id);
    return plainToInstance(TodoResponseDto, todo[0]);
  }

  private findTodoById(id: string): [Todo, number] {
    const todoIndex = this.todoList.findIndex((todo) => todo.id === id);
    const todo = this.todoList[todoIndex];
    if (!todo) {
      throw new NotFoundException('Could not find todo.');
    }
    return [todo, todoIndex];
  }

  insertTodo(
    dto: InsertTodoRequestDto,
  ): InsertTodoResponseDto {
    const todoId = Math.random().toString();
    const newTodo = new Todo(todoId, dto.title, dto.description, dto.done);
    this.todoList.push(newTodo);
    return plainToInstance(InsertTodoResponseDto, { id: todoId });
  }
}


