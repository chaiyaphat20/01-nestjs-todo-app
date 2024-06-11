import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './dto/model/todo-model';
import { InsertTodoRequestDto } from './dto/request/insert-todo-request.dto';
import { TodoResponseDto } from './dto/response/get-todo-response.dto';
import { plainToInstance } from 'class-transformer';
import { InsertTodoResponseDto } from './dto/response/insert-todo-response.dto';
import { UpdateTodoRequestDto } from './dto/request/update-todo-request.dto';
import { UpdateTodoResponseDto } from './dto/response/update-todo-response.dto';

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

  updateTodo(
    dto: UpdateTodoRequestDto,
  ) {
    const [todo, index] = this.findTodoById(dto.id);
    const updatedTodo = { ...todo };
    if (dto.title) {
      updatedTodo.title = dto.title;
    }
    if (dto.description) {
      updatedTodo.description = dto.description;
    }
    if (dto.done !== undefined) {
      updatedTodo.done = dto.done;
    }
    this.todoList[index] = updatedTodo;
    return plainToInstance(UpdateTodoResponseDto, this.todoList[index])
  }

  deleteTodoById(id: string) {
    const index = this.findTodoById(id)[1];
    this.todoList.splice(index, 1);
  }
}


