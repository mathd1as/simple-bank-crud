import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    request.body = ctx.getArgs().loginInput;
    console.log(request.body);
    return request;
  }
  // getRequest(context: ExecutionContext): any {
  //   const ctx = GqlExecutionContext.create(context);
  //   console.log('here');
  //   return ctx.getContext().req;
  // }
}
