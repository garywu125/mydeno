/**
 * Overloading Constructors
 *    type script allow only one constructor , if you want to overload constructor , using union type
 **/

 export class MyClass
 {
     constructor(value : string | number)
     {
         if(typeof value === "string")
         {
             this.value = value;
         }
 
         if(typeof value === "number")
         {
             this.value = value.toString();
         }
     }
 
     get myvalue():string { return this.value }     

     private value : string="";
 }

 let m=new MyClass("shake hand")
 console.log(m.myvalue)