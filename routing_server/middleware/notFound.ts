import { Context,Status } from '../deps.ts';  

  const notFound= (context: Context)=> {
    context.response.status = Status.NotFound;
    context.response.body =
      `<html><body><h1>404 - Not Found</h1><p>Path <code>${context.request.url}</code> not found.`;
  }

  export default notFound