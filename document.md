> typescript中的数据类型与javascript的数据类型几乎是相同的（布尔，数字，字符串，结构体）。此外还提供了枚举类型方便使用。

## 基础类型

`布尔`，类型：`boolean`

```TypeScript
let isDone:boolean = true;
```

`数字`，typescript中的数字均为浮点数，类型为`number`，除了十进制和十六进制字面量，TypeScript还支持es6中的二进制和八进制字面量
```TypeScript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```

`字符串`，类型：`string`，可以使用双引号或单引号来表示字符串,并且还可以使用es6的`模版字符串`
```TypeScript
let isString:string = 'string';
isString = "new ${isString}";
```

`数组`,类型：`[]` 或 `Array<元素类型>`

```TypeScript
let list:number[] = [1,2,3];
let newList:Array<number> = [1,2,3];
```

`元组` Tuple,元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。

```TypeScript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error

// 当访问一个已知索引的元素，会得到正确的类型：

console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

// 当访问一个越界的元素，会使用联合类型替代：

x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
x[6] = true; // Error, 布尔不是(string | number)类型
```

`枚举`  enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```TypeScript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1开始编号：

enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;

// 或者，全部都采用手动赋值：

enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;

// 枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：

enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
alert(colorName);
```

`Any`  有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们`不希望`类型检查器对这些值进行检查而是`直接让它们通过编译阶段`的检查。 那么我们可以使用 any类型来标记这些变量：

```TypeScript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// 在对现有代码进行改写的时候，any类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。 你可能认为 Object有相似的作用，就像它在其它语言中那样。 但是 Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法：

let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

// 当你只知道一部分数据的类型时，any类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

let list: any[] = [1, true, "free"];
list[1] = 100;
```

`Void`  某种程度上来说，void类型像是与any类型`相反`，它表示没有任何类型。 `当一个函数没有返回值`时，你通常会见到其返回值类型是 void：

```TypeScript
function warnUser(): void {
    alert("This is my warning message");
}

// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
let unusable: void = undefined;
```

`Null` 和 `Undefined`

TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大：

```TypeScript
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```
默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把 `null和undefined 赋值`给`number类型`的变量。

然而，当你指定了`--strictNullChecks`标记，`null`和`undefined`只能赋值给`void`和`它们各自`。 这能避免 很多常见的问题。 也许在某处你想传入一个 string或null或undefined，你可以使用联合类型`string | null | undefined`。 再次说明，稍后我们会介绍`联合类型`。

> 注意：鼓励尽可能地使用--strictNullChecks，但在本手册里我们假设这个标记是关闭的。

`never` 类型表示的是那些`永不存在的值`的类型。 例如， never类型是那些`总是会抛出异常`或`根本就不会有返回值的函数表达式`或`箭头函数表达式的返回值`类型； `变量`也可能是 never类型，当它们被永不为真的类型保护所约束时。

`never`类型是`任何类型`的`子类型`，也`可以`赋值给任何类型；然而，`没有类型`是never的子类型 或 `可以赋值给` never类型（除了never本身之外）。 即使 `any也不可以赋值给never`。

下面是一些返回`never`类型的函数：

```TypeScript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点   why?????没搞懂
function infiniteLoop(): never {
    while (true) {
    }
}
```

`类型断言` 有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过`类型断言`这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是`不进行`特殊的数据检查和解构。 它不会在运行时产生影响，只是在`编译阶段`起作用。 TypeScript会假设你，程序员，`已经`进行了必须的检查。

类型断言有两种形式。 其一是`“尖括号”`语法：

```TypeScript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

另一个为`as`语法：

```TypeScript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

两种形式是`等价`的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用`JSX`时，只有 `as`语法断言是被允许的。

## 变量声明

这里使用ES6的`let`代替`var`，并且使用`const`声明`常量`。有点不言而喻，具体可参考`阮一峰老师的es6著作`

`解构赋值`：数组解构，对象解构  [...arr], {a,b} = {a:'1',b:'2'}

`属性重命名`

```TypeScript
let { a: newName1, b: newName2 } = o;
// a命名为newName1，这里的`冒号`不是指定类型的。如果你想给变量指定输入类型，需要如下设置(变量完全结束后才可以指定输入类型，而不需在变量内部立即指定)：
let {a, b}: {a: string, b: number} = o;
```

`默认值` 默认值可以让你在属性为 undefined 时使用缺省值：

```TypeScript
// 传入wholeObject，并设定输入值的key和输入类型
function keepWholeObject(wholeObject: { a: string, b?: number }) {  // 这里b后面的问号和冒号是三元一次运算符，代表输入参数可有可无，可以不为指定的类型，可以设置默认值
    let { a, b = 1001 } = wholeObject;
}
// 现在，即使 b 为 undefined ， keepWholeObject 函数的变量 wholeObject 的属性 a 和 b 都会有值。
```

`函数声明` 解构也能用于函数声明。 看以下简单的情况：

```TypeScript
type C = { a: string, b?: number }
function f({ a, b }: C): void {
    // ...
}
```

但是，通常情况下更多的是指定默认值，解构默认值有些棘手。 首先，你需要在默认值之前设置其格式。

```TypeScript
function f({ a, b } = { a: "", b: 0 }): void {
    // ...
}
f(); // ok, default to { a: "", b: 0 }
```

其次，你需要知道在解构属性上给予一个默认或可选的属性用来替换主初始化列表。 要知道 C 的定义有一个 b 可选属性：

```TypeScript
function f({ a, b = 0 } = { a: "" }): void {
    // ...
}
f({ a: "yes" }); // ok, default b = 0
f(); // ok, default to {a: ""}, which then defaults b = 0
f({}); // error, 'a' is required if you supply an argument
```

要`小心`使用解构。 从前面的例子可以看出，就算是最简单的解构表达式也是难以理解的。 尤其当存在深层嵌套解构的时候，就算这时没有堆叠在一起的重命名，默认值和类型注解，也是令人难以理解的。 解构表达式要尽量保持小而简单。 你自己也可以直接使用解构将会生成的赋值表达式。

`展开` 展开操作符正与解构相反。 它允许你将一个数组展开为另一个数组，或将一个对象展开为另一个对象。

```TypeScript
/* 数组 */
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];

/* 对象 */
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
```

`search`的值为`{ food: "rich", price: "$$", ambiance: "noisy" }`。 对象的展开比数组的展开要复杂的多。 像数组展开一样，它是从左至右进行处理，但结果仍为对象。 这就意味着出现在`展开对象后面的属性会覆盖前面的属性`。 因此，如果我们修改上面的例子，在结尾处进行展开的话：

```TypeScript
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { food: "rich", ...defaults };
```

那么，`defaults`里的`food属性`会`重写food: "rich"`，在这里这并不是我们想要的结果。

对象展开还有其它一些`意想不到的限制`。 首先，它`仅`包含对象`自身的可枚举属性`。 大体上是说当你展开一个对象实例时，你会`丢失其`方法：

```
class C {
    p = 12;
    m() {}
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```

其次，TypeScript编译器`不允许展开泛型函数`上的类型参数。 这个特性会在TypeScript的未来版本中考虑实现。

## 接口

TypeScript的核心原则之一是对`值所具有的结构`进行`类型检查`。 它有时被称做`“鸭式辨型法”`或`“结构性子类型化”`。 在TypeScript里，接口的作用就是为这些类型`命名`和为你的代码或第三方代码`定义契约`。

下面通过一个简单示例来观察接口是如何工作的：

```TypeScript
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

`类型检查器`会查看`printLabel`的调用。 printLabel有一个参数，并要求这个对象参数有一个名为label类型为string的属性。 需要注意的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些`必需的`属性是否存在，并且其`类型是否匹配`。 然而，有些时候TypeScript却并不会这么宽松，我们下面会稍做讲解。

下面我们重写上面的例子，这次使用接口来描述：必须包含一个label属性且类型为string：

```TypeScript
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```
LabelledValue接口就好比一个名字，用来`描述`上面例子里的要求。 它代表了有一个`label属性`且`类型为string`的对象。 需要注意的是，我们在这里并不能像在其它语言里一样，说传给`printLabel的对象`实现了这个接口。
我们只会去关注`值的外形`。 只要`传入的对象满足上面提到的必要条件`，那么它就是被允许的。

还有一点值得提的是，`类型检查器不会去检查属性的顺序`，只要`相应的属性存在`并且`类型也是对的`就可以。

`可选属性` 接口里的属性`不全都是必需的`。 有些是只在某些条件下存在，或者根本不存在。 可选属性在应用`“option bags”`模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。

下面是应用了`“option bags”`的例子：

```TypeScript
/* ?代表可有可无，确实类似于三元 */
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。 比如，我们故意将 createSquare里的color属性名拼错，就会得到一个错误提示：

```TypeScript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

`只读属性` 一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用`readonly`来指定只读属性:

```TypeScript
interface Point {
    readonly x: number;
    readonly y: number;
}
```

你可以通过赋值一个对象字面量来构造一个Point。 赋值后， x和y再也不能被改变了。

```TypeScript
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

TypeScript具有`ReadonlyArray<T>`类型，它与`Array<T>`相似，只是把所有可变方法去掉了，因此可以确保数组`创建后再也不能`被修改：

```TypeScript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用`类型断言`重写：

```TypeScript
a = ro as number[];
```

`readonly` vs `const`

最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为`变量`使用的话用`const`，若做为`属性`则使用`readonly`。

`额外的属性检查` 我们在第一个例子里使用了接口，TypeScript让我们传入{ size: number; label: string; }到仅期望得到{ label: string; }的函数里。 我们已经学过了可选属性，并且知道他们在`“option bags”`模式里很有用。

然而，天真地将这两者结合的话就会像在JavaScript里那样搬起石头砸自己的脚。 比如，拿 createSquare例子来说：

```TypeScript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
```

注意传入createSquare的参数拼写为`colour`而不是`color`。 在JavaScript里，这会默默地`失败`。

你可能会争辩这个程序已经正确地类型化了，因为width属性是兼容的，不存在color属性，而且`额外的`colour属性是无意义的。

然而，TypeScript会认为这段代码可能存在bug。 `对象字面量`会被`特殊对待`而且会`经过` `额外属性检查`，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何`“目标类型”` `不包含`的属性时，你会得到一个错误。

```TypeScript
// error: 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: "red", width: 100 });
```

绕开这些检查非常简单。 最简便的方法是使用类型断言：

```TypeScript
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

然而，`最佳的`方式是能够`添加一个字符串索引签名`，`前提` 是你能够确定这个对象`可能具有`某些做为特殊用途使用的`额外属性`。 如果SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它：

```TypeScript
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

我们稍后会讲到`索引签名`，但在这我们要表示的是SquareConfig可以有`任意数量`的属性，并且只要它们不是color和width，那么就无所谓它们的类型是什么。

还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是`将这个对象赋值给一个另一个变量`： 因为 squareOptions`不会经过额外属性检查`，所以编译器不会报错。

```TypeScript
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

要留意，在像上面一样的简单代码里，你可能不应该去绕开这些检查。 对于包含方法和内部状态的复杂对象字面量来讲，你可能需要使用这些技巧，但是大部额外属性检查错误是真正的bug。 就是说你遇到了额外类型检查出的错误，比如“option bags”，你应该去审查一下你的类型声明。 在这里，如果支持传入 color或colour属性到createSquare，你应该修改SquareConfig定义来体现出这一点。

`函数类型` 接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以`描述函数类型`。





















