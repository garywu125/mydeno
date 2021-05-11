/*
 OAK : A middleware framework for Deno’s http server, including a router middleware.

 The middleware is processed as a stack, where each middleware function can control the flow of the response. 
 When the middleware is called, it is passed a context and reference to the "next" method in the stack.

 introduction: https://blog.poychang.net/build-deno-web-app-with-oak/

 */

import { Application, Router,helpers } from 'https://deno.land/x/oak/mod.ts';
import { movies } from './data-service.js';
import { getUser} from "./user.ts"

const app = new Application();
const port = 3000;
// 建立一個路由器實體 router
const router = new Router();
// Http 的七種基本方法都有支援,方法名稱就是函數名稱,
// 傳入路徑字串和該路由要怎麼處理 Http Context 的函數
router
    .get('/api', (context) => { context.response.body = "API Works!"; })
    .get('/api/movies', (context) => { context.response.body = Array.from(movies.values()); })
    .get('/api/movies/:id', (context) => {          
       
        if (context.params && context.params.id && movies.has(context.params.id)) {
            context.response.body = movies.get(context.params.id);
        } else {
            context.response.body = [];
        }
    })
    .post('/api/movies', async (context) => {
        //若要讀取 Http Request 的 Body 內容時，所使用的 context.request.body() 方法是 Promise 物件，你必須要用 async await 或 Promise 的處理方式來操作。
        const data = await context.request.body();
        movies.set(data.value.id.toString(), { ...data.value });
        context.response.body = Array.from(movies.values());
    })
    .patch('/api/movies/:id', async (context) => {
        if (context.params && context.params.id && movies.has(context.params.id)) {
            const data = await context.request.body();
            movies.get(context.params.id).title = data.value.title;
            context.response.body = movies.get(context.params.id);
        }
    })
    .delete('/api/movies/:id', async (context) => {
        if (context.params && context.params.id && movies.has(context.params.id)) {
            movies.delete(context.params.id);
        }
        context.response.body = Array.from(movies.values());
    });




 // each middleware function can control the flow of the response

// Logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  });
  
  // Timing
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  });
 // router 
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port });
console.log(`localhost:${port}`);
