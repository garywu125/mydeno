/*
 router.js : declare all routing endpoints , 建立一個 build route map
 article : https://www.codinghub.net/article/rest-api-using-deno
*/
import{ Router} from'./deps.ts';    
import { movies } from './data-service.js';

const router= new Router();
// router Http  的七種基本方法都有支援,方法名稱就是函數名稱,
// 傳入路徑字串和該路由要怎麼處理 Http Context 的函數(routing methods)
// controller is a collection of related routing methods with model
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

    export default router;