/**
 *  Using Data URLs to Load Dependencies in Deno:
 *  
 * 將typescript 程式碼 變成base64 encoded string  
 *  code : export const add = (a: number, b: number) => a + b;
 *  bas64 encoding from the above code :
 *        ZXhwb3J0IGNvbnN0IGFkZCA9IChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4gYSArIGI7 
 *  
 *  import from "data-url" (based64 encoded text)
 *  
 */

 const { add } = await import("data:application/typescript;base64,ZXhwb3J0IGNvbnN0IGFkZCA9IChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4gYSArIGI7");

 console.log(" 3+4=",add(3,4))