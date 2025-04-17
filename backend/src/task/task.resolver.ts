import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import {Task} from './task.model';
import {CreateTaskInput} from './task.input';
import {TaskService} from './task.service';

@Resolver(() => Task)
export class TaskResolver {
    constructor(private service: TaskService) {
    }

    @Query(() => [Task])
    getAllTasks() {
        return this.service.getAll();
    }

    @Mutation(() => Task)
    createTask(@Args('data') data: CreateTaskInput) {
        return this.service.create(data);
    }

    @Query(() => [Task])
    getTasksByDate(@Args('date') date: string) {
        return this.service.getTasksByDate(date);
    }

    @Mutation(() => Boolean)
    async delete(@Args('id') id: string): Promise<boolean> {
        return this.service.delete(id);
    }

}
