/**
 *  error TS2392: Multiple constructor implementations are not allowed.
 * 
 * 
 * 
 */
export class Greeter {

  // parameter field with default value
 constructor(public greeting: string="world") {    
 }
 

 // optional-parameters
 // greeting: string;
 // constructor(message?: string) {

 //   this.greeting = message??"world";
 // }

 
 // constructor(ame?: string) {
 //   if (otherName !== undefined) {
 //     this.name = otherName;
 //   }
 // }

 // paramter with default value

 greet(mark:string="!!!!") {
   return "Hello, " + this.greeting+mark;
 }
}
