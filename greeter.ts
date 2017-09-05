// 参考 https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html 
 
 // 一定要全局安装typescript，否则无法使用命令行工具
 // 编译代码  tsc greeter.ts

 // 类型注解
//  function greeter(person:string){
//      return 'hello ' + person;
//  }
//  var user = '[1,2,3]';
//  document.body.innerHTML = greeter(user);

 // 在指定类型注解后，vscode会自动在输入值下报红色波浪线。也许是因为vscode默认支持typescript。 编译后运行结果如下
 // greeter.ts(6,36): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.

// ---------------------------------------------------------------------------------------------------------------------1

 // 接口，指定了输入的类型，需要key和value类型都对应才正确
// interface Person{ 
//     firstName:string,
//     lastName:string
// }
// function greeter(person:Person){
//     return 'firstName:'+person.firstName+',lastName:'+person.lastName;
// }
// var user = {firstName:'liu',lastName:'wei'};
// document.body.innerHTML = greeter(user);

// ---------------------------------------------------------------------------------------------------------------------2

 // 类

class Student{
    fullName:string;
    constructor(public firstName,public middleInitial,public lastName){
        this.fullName = firstName +' '+ middleInitial +' '+ lastName;
    }
}

interface Person{
    firstName:string,
    lastName:string
}

function greeter(person){
    return 'hello ' + person.firstName +' '+ person.lastName;
}

var user = new Student('liu','_','wei');

document.body.innerHTML = greeter(user);

 // 生成html文件，会直接输出结果

// ---------------------------------------------------------------------------------------------------------------------3






