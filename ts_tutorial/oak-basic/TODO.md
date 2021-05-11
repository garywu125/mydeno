Oak offers a utility function called getQuery which allows us to retrieve all parameter from the URI:
import {
  Application,
  Router,
  helpers,
} from 'https://deno.land/x/oak/mod.ts';
 
...
 
router.put('/users/:userId', (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = `PUT HTTP method on user/${userId} resource`;
});