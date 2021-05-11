import { Context } from '../deps.ts';  

const fourZeroFour = async (ctx: Context) => {
  ctx.response.status = 404;
  ctx.response.body = { success: false, msg: "404-Not Found !!" };
};

export default fourZeroFour;
