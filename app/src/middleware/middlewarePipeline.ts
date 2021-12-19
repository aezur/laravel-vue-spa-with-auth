import { NavigationGuardNext } from 'vue-router';

export default function middlewarePipeline (
  context: Context,
  middleware: Array<(context: Context) => void>,
  index: number,
): NavigationGuardNext | (() => void) {
  const nextMiddleware = middleware[index];
  if(!nextMiddleware){
    return context.next;
  }
  return () => {
    const nextPipeline = middlewarePipeline(
      context, middleware, index + 1
    );
    nextMiddleware({ ...context, next: nextPipeline });
  };
}