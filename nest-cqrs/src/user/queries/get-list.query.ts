import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

export class ListUsersQuery {
    constructor(
      public page: number = 1,
      public pageSize: number = 10
    ) { }
  }
  @QueryHandler(ListUsersQuery)
  export class ListHandler implements IQueryHandler<ListUsersQuery> {
    constructor(
      // Here we would inject what is necessary to retrieve our data
    ) { }
    public async execute(query: ListUsersQuery): Promise<User[]> {
      // Here we are going to have any necessary logic related
      // to that Query and return the request information
      // such as a service method call
      return null;
    }
  }