/* ==========================================================================  **
## HW3 Instructions

** ==========================================================================  **

1.
   To run the typescript compiler (`tsc`), make sure you have it installed
   ```
   tsc -v
   >> Version 4.4.3
   ```
   Then run the compiler
   ```
   tsc --strict --target es2019 --module commonjs hw3.ts
   ```
   to produce a file `hw3.js`. 
2. Do not change any of the function interfaces.
3. Fill in everything that has TODO.

** ============================================================================ */


/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */

export const HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
export const SIGNATURE = "<your-full-name-here>"; // TODO: FILL ME IN

// If you had any collaborators on this assignment, please list their github handles here.
export const COLLABORATORS = [
    "", // TODO: FILL ME IN
];

// If you used any resources, please list them here
export const RESOURCES_CONSULTED = [
    "www.google.com", // TODO: FILL ME IN
];



/* ==========================================================================  **
## 1. In this problem, we will look at dynamic dispatch and inheritance.

Your task is to translate a class into code without classes. In doing so, we
hope you get a better sense of how dynamic dispatch and inheritance work
"underneath-the-hood".
** ============================================================================ */


/* ----------------------------------------------------- **
### 1a. Translate StrangeNumberClass into a closure.

Example:

Class behavior

    const c1 = new StrangeNumberClass()
    > [c1.isEven(2), c1.count]
    [true, 9]
    > [c1.isOdd(4), c1.count]
    [false, 48]
    > [c1.isEven(-10), c1.count]
    [true, 3228]


Your functional code should behave the same way

    const f1 = newStrangeNumber()
    > [f1.isEven(2), f1.count]
    [true, 9]
    > [f1.isOdd(4), f1.count]
    [false, 48]
    > [f1.isEven(-10), f1.count]
    [true, 3228]

** ----------------------------------------------------- */

export class StrangeNumberClass {
    count: number;

    constructor() {
        this.count = 1;
    }

    isEven(n: number): boolean {
        if (n < 0) {
            this.count = this.count*2 + 1;
            return !this.isOdd(-n);
        } else if (n === 0) {
            return true;
        } else {
            this.count += 3;
            return this.isOdd(n - 1);
        }
    }

    isOdd(n: number): boolean {
        if (n < 0) {
            this.count += 3;
            return !this.isEven(-n);
        } else if (n === 0) {
            return false;
        } else {
            this.count = this.count*2 + 1;
            return this.isEven(n - 1);
        }
    }
}

type StrangeNumber = {
    count: number,
    isEven: (n: number) => boolean,
    isOdd: (n: number) => boolean
}

export function newStrangeNumber(): StrangeNumber {
    function isEven(this: StrangeNumber, n: number): boolean {
        if (n < 0) {
            obj.count = obj.count*2 + 1;
            return !this.isOdd(-n);
        } else if (n === 0) {
            return true;
        } else {
            obj.count += 3;
            return this.isOdd(n - 1);
        }
    }

    function isOdd(this: StrangeNumber, n: number): boolean {
        if (n < 0) {
            obj.count += 3;
            return !this.isEven(-n);
        } else if (n === 0) {
            return false;
        } else {
            obj.count = obj.count*2 + 1;
            return this.isEven(n - 1);
        }
    }

    const obj = { count: 1, isEven, isOdd };

    return obj;
}

// * Test:
// const f2 = new StrangeNumberClass();
// console.log([f2.isEven(2), f2.count]);
// console.log([f2.isOdd(4), f2.count]);
// console.log([f2.isEven(-10), f2.count]);
// const f1 = newStrangeNumber()
// console.log([f1.isEven(2), f1.count]);
// console.log([f1.isOdd(4), f1.count]);
// console.log([f1.isEven(-10), f1.count]);

/* ----------------------------------------------------- **
### 1b. Complete the definition of newStrangeNumber2 below.

Example:

Class behavior

    const c1 = new StrangeNumber2Class()
    > [c1.isEven(2), c1.count]
    [true, 5]
    > [c1.isOdd(4), c1.count]
    [false, 6]
    > [c1.isEven(-10), c1.count]
    [true, 14]

Your functional code should behave the same way

    const f1 = newStrangeNumber2()
    > [f1.isEven(2), f1.count]
    [true, 5]
    > [f1.isOdd(4), f1.count]
    [false, 6]
    > [f1.isEven(-10), f1.count]
    [true, 14]

** ----------------------------------------------------- */

export class StrangeNumber2Class extends StrangeNumberClass { 
    constructor() {
        super();
    }

    isOdd(n: number): boolean {
        if (n <= 0) {
            return !this.isEven(-n);
        } else {
            this.count += 1;
            return n % 2 === 1;
        }
    }
}

export function newStrangeNumber2(): StrangeNumber {
    const obj = newStrangeNumber();
    obj.isOdd = function (n: number): boolean {
        if (n <= 0) {
            return !this.isEven(-n);
        } else {
            obj.count += 1;
            return n % 2 === 1;
        }
    }

    return obj;
}

// * Test:
// const f2 = new StrangeNumber2Class();
// console.log([f2.isEven(2), f2.count]);
// console.log([f2.isOdd(4), f2.count]);
// console.log([f2.isEven(-10), f2.count]);
// const f1 = newStrangeNumber2()
// console.log([f1.isEven(2), f1.count]);
// console.log([f1.isOdd(4), f1.count]);
// console.log([f1.isEven(-10), f1.count]);


/* ==========================================================================  **
## 2. Your favorite algebraic data type is back as a class.

Recall the Tree algebraic data type and three ways to build a Tree.
```
type Tree<T> = 
    { tag: "LEAF" }
  | { tag: "NODE", contents: T, left: Tree<T>, right: Tree<T> };

function Leaf<T>(): Tree<T> {
    return { tag: "LEAF" };
}

function Node<T>(x: T, left: Tree<T>, right: Tree<T>): Tree<T> {
    return { tag: "NODE", contents: x, left: left, right: right };
}

function LeafNode<T>(x: T): Tree<T> {
    return Node(x, Leaf(), Leaf());
}
```

In this problem, we will revisit some of it using classes and objects.
** ============================================================================ */

export class Tree<T> {
    public readonly contents: T;
    public readonly left?: Tree<T>;     // the ? means that left can be undefined
    public readonly right?: Tree<T>;    // the ? means that right can be undefined

    /* ----------------------------------------------------- **
    Here are some examples showing how the ADT definition maps to the
    class definition.

    Example 1:
    
    ADT: 
        Leaf()

    Class:
        const tr1 = undefined

    Example 2:

    ADT:
        LeafNode(2)

    Class:
        const tr2 = new Tree(2, undefined, undefined)

            2

    Example 3:

    ADT:
        Node(3, LeafNode(2), Leaf())
        
           3
          /  
         2 

    Class:
        const tr3 = new Tree(
                        3,
                        new Tree(2, undefined, undefined),
                        undefined)

    Example 4:

    ADT:
        Node(3, LeafNode(2), Node(3, LeafNode(4), LeafNode(5)))

            3
          /  \
         2    3
            /  \
           4    5

    Class:
        const tr4 = new Tree(
                        3,
                        new Tree(2, undefined, undefined),
                        new Tree(
                            3,
                            new Tree(4, undefined, undefined),
                            new Tree(5, undefined, undefined)
                            )
                        )
    ** ----------------------------------------------------- */
    constructor(contents: T, left: undefined|Tree<T>, right: undefined|Tree<T>) {
        this.contents = contents;
        this.left = left;
        this.right = right;
    }

    /* ----------------------------------------------------- **
    ### 2a. Implement the map function below. Do not modify the
    "this" (current) object. You must create a new tree and return it.

    Examples: 

    1. tr2.map((x) => x + 1) = 

            3

    2. tr3.map((x) => x * 2) =

            6
           /
          4
    
    3. tr4.map((x) => "1" + x) =

             "13"
            /    \
         "12"    "13"
                /    \
              "14"  "15"
    ** ----------------------------------------------------- */
    public map<U>(f: (arg: T) => U): Tree<U> {
        return new Tree(
            f(this.contents),
            this.left?.map(f),
            this.right?.map(f)
        )
    }
    
    /**
     * Needed for task 2c: Tree3<T>.toTree2()
     * @returns Copy of the Tree with all Tree3's eliminated
     */
    public toTree2(): Tree<T> {
        return new Tree(
            this.contents,
            this.left?.toTree2(),
            this.right?.toTree2()
        );
    }
}

// * Test:
// const tr2 = new Tree(2, undefined, undefined)
// const tr3 = new Tree(
//     3,
//     new Tree(2, undefined, undefined),
//     undefined
// )
// const tr4 = new Tree(
//     3,
//     new Tree(2, undefined, undefined),
//     new Tree(
//         3,
//         new Tree(4, undefined, undefined),
//         new Tree(5, undefined, undefined)
//         )
// )
// console.log(tr2.map((x) => x + 1));
// console.log(tr3.map((x) => x * 2));
// console.log(tr4.map((x) => "1" + x));

/* ----------------------------------------------------- **
Suppose we want to create trees that have either 3 children or
2 children. One way to accomplish this is to extend the 
original definition of Tree as below.
** ----------------------------------------------------- */

export class Tree3<T> extends Tree<T> {
    public readonly middle?: Tree<T>;   // the ? means that middle can be undefined

    /* ----------------------------------------------------- **
    Example 1:

    const tr1 = new Tree3(2, undefined, undefined, undefined)

         2

    Example 2:
        
        const tr2 = new Tree3(
            3, 
            new Tree(2, undefined, undefined),
            new Tree3(1, undefined, undefined, undefined),
            new Tree(4, undefined, undefined),
        )

            3
         /  |  \  
        2   1   4    

    Example 3:

        const tr3 = new Tree(
            2,
            tr2,
            new Tree(3, undefined, tr2)
        )

              2
            /   \ 
           3     3
         / | \    \
        2  1  4    \
                    3
                  / | \  
                 2  1  4
    ** ----------------------------------------------------- */
    constructor(contents: T, left: undefined|Tree<T>, middle: undefined|Tree<T>, right: undefined|Tree<T>) {
        super(contents, left, right);
        this.middle = middle;
    }

    /* ----------------------------------------------------- **
    ### 2b. Implement the map function below. Do not modify the
    "this" (current) object. You must create a new tree and return it.

    Examples: 

    1. tr1.map((x) => x + 1) = 

            3

    2. tr2.map((x) => x * 2) =

           6
        /  |  \  
       4   2   8
    
    3. tr3.map((x) => "a" + x) =

                "a2"
              /      \ 
            "a3"     "a3"
          /  |  \      \
      "a2" "a1" "a4"    \
                       "a3"
                      /  |   \  
                   "a2" "a1" "a4"
    ** ----------------------------------------------------- */
    public map<U>(f: (arg: T) => U): Tree<U> {
        return new Tree3(
            f(this.contents),
            this.left?.map(f),
            this.middle?.map(f),
            this.right?.map(f)
        )
    }

    /* ----------------------------------------------------- **
    ### 2c. Implement a function that eliminates all middle children
    and produces a tree that only has two children.
    
    Let `curr` be a node with left child `left`, middle child `mid`, and
    right child `right`. If the middle child `mid` is not `undefined`,
    then make the sub-tree rooted at the left child `left` the left-most
    sub-tree of the sub-tree `left.toTree2()`. That is, make `mid.toTree2()` 
    the left-most sub-tree of the sub-tree `left.toTree2()`.

    Examples: 

    1. tr1.toTree2() = 

            3

    2. tr2.toTree2() =

           3
         /  \  
        1    4
       /
      2
    
    3. tr3.toTree2() =

              2
            /   \ 
           3     3
         /   \    \
        1     4    \
       /            3
      2           /   \  
                 1     4
                /
               2 
    ** ----------------------------------------------------- */
    public toTree2(): Tree<T> {
        if (this.middle === undefined) {
            return new Tree(
                this.contents,
                this.left?.toTree2(),
                this.right?.toTree2()
            );
        } else {
            return new Tree(
                this.contents,
                new Tree(this.middle.contents, this.left?.toTree2(), this.middle.right?.toTree2()),
                this.right?.toTree2()
            );
        }
    }
}

// * Test:
// const tr1 = new Tree3(2, undefined, undefined, undefined)
// const tr2 = new Tree3(
//     3, 
//     new Tree(2, undefined, undefined),
//     new Tree3(1, undefined, undefined, undefined),
//     new Tree(4, undefined, undefined),
// )
// const tr3 = new Tree3(
//     2,
//     tr2,
//     undefined,
//     new Tree(3, undefined, tr2)
// )
// console.log(tr1.toTree2());
// console.log(tr2.toTree2());
// console.log(JSON.stringify(tr3.toTree2(), null, 4));



/* ==========================================================================  **
## 3. JSONValue and JSONObject in an OOP style.

In this problem, we will take the algebraic data-type from hw1 and hw2, and
rewrite it as a class. An example will be given after we have defined all the
classes.
** ============================================================================ */

export interface JSONValue {
    /* ----------------------------------------------------- **
    `allPathsSatisfyingPredicate` constructs an array of all the
    paths (duplicates included) associated with an authority satisfying
    a predicate in a ObjJSONClass. If that JSONObject does not have
    a path (the "path" key is missing altogether), use "/". The order of
    the paths does not matter.

    Example 1:

    jsonLinkValue.allPathsSatisfyingPredicate(startsWithWWW) =
    ["/", "/"]

    Example 2:

    jsonLinkValue.allPathsSatisfyingPredicate(endsWithDotCom) =
    ["1", "/", "", "/", "/", "2", "locations/42"]

    Example 3:

    jsonLinkValue.allPathsSatisfyingPredicate(startsWithApp) =
    ["2", "locations/42"]
    ** ----------------------------------------------------- */
    allPathsSatisfyingPredicate(predicate: (authority: string) => boolean): string[];

    /* ----------------------------------------------------- **
    `fillInMissingPath` returns a new JSONValue structure, filling in
    a path field with a value of "/" to any ObjJSONValue object that
    is missing one (the "path" key is missing altogether). Does not modify
    the "this" (current) object; returns a new structure.

    Example 1:

    jsonLinkExample.fillInMissingPath() = [
        {
            "authority": "one.com",
            "path": "1",
            "links": [ 
                {
                    "authority": "www.two.com", 
                    "path": "/",
                    "links": [],
                },
                {
                    "authority": "three.com",
                    "path": "",
                    "links": [],
                }
            ]
        },
        {
            "authority": "www.four.com",
            "path": "/",
            "links": [ 
                {
                    "authority": "seven.com", 
                    "path": "/",
                    "links": [
                        {
                            "authority": "app.one.com",
                            "path": "2",
                            "links": [
                                {
                                    "authority": "eight.com",
                                    "path": ",",
                                    "links": []
                                }
                            ]
                        }
                    ],
                },
                {
                    "authority": "app.three.com", 
                    "path": "locations/42",
                    "links": [],
                }
            ]
        }
    ]
    ** ----------------------------------------------------- */
    fillInMissingPath(): JSONValue;
}


/* ----------------------------------------------------- **
### 3a. Implement the StringJSONValue class.
** ----------------------------------------------------- */

export class StringJSONValue implements JSONValue {
    public readonly str: string;

    constructor (str: string) {
        this.str = str;
    }

    public allPathsSatisfyingPredicate(predicate: (authority: string) => boolean): string[] {
        throw Error("Should never be called");
    }

    public fillInMissingPath(): JSONValue {
        throw Error("Should never be called");
    }
}


/* ----------------------------------------------------- **
### 3b. Implement the ArrJSONValue class.
** ----------------------------------------------------- */

export class ArrJSONValue implements JSONValue {
    public readonly arr: JSONValue[];

    constructor (arr: JSONValue[]) {
        this.arr = arr;
    }

    public allPathsSatisfyingPredicate(predicate: (authority: string) => boolean): string[] {
        return this.arr.map(obj => obj.allPathsSatisfyingPredicate(predicate)).flat();
    }
    
    public fillInMissingPath(): JSONValue {
        return new ArrJSONValue(this.arr.map(obj => obj.fillInMissingPath()));
    }
}


/* ----------------------------------------------------- **
### 3c. Implement the ObjJSONValue class.
** ----------------------------------------------------- */

export class ObjJSONValue implements JSONValue {
    public readonly obj: { [key: string]: JSONValue }

    constructor (obj: { [key: string]: JSONValue }) {
        this.obj = obj;
    }

    public allPathsSatisfyingPredicate(predicate: (authority: string) => boolean): string[] {
        const arr = [];
        if (this.obj.authority instanceof StringJSONValue && predicate(this.obj.authority.str)) {
            if (this.obj.path instanceof StringJSONValue) arr.push(this.obj.path.str);
            else arr.push("/");
        }
        if (this.obj.links instanceof ArrJSONValue) {
            arr.push(...this.obj.links.allPathsSatisfyingPredicate(predicate));
        }
        return arr;
    }

    public fillInMissingPath(): JSONValue {
        const newObj: { [key: string]: JSONValue } = { ...this.obj };
        
        newObj.path ??= new StringJSONValue("/");

        if (newObj.links instanceof ArrJSONValue) {
            newObj.links = newObj.links.fillInMissingPath();
        }

        return new ObjJSONValue(newObj);
    }
}

export const jsonLinkExample: JSONValue = new ArrJSONValue([
    new ObjJSONValue({
        "authority": new StringJSONValue("one.com"),
        "path": new StringJSONValue("1"),
        "links": new ArrJSONValue([
            new ObjJSONValue({
                "authority": new StringJSONValue("www.two.com"), 
                "links": new ArrJSONValue([]),
            }),
            new ObjJSONValue({
                "authority": new StringJSONValue("three.com"),
                "path": new StringJSONValue(""),
                "links": new ArrJSONValue([]),
            })
        ])
    }),
    new ObjJSONValue({
        "authority": new StringJSONValue("www.four.com"),
        "links": new ArrJSONValue([ 
            new ObjJSONValue({
                "authority": new StringJSONValue("seven.com"), 
                "links": new ArrJSONValue([
                    new ObjJSONValue({
                        "authority": new StringJSONValue("app.one.com"),
                        "path": new StringJSONValue("2"),
                        "links": new ArrJSONValue([
                            new ObjJSONValue({
                                "authority": new StringJSONValue("eight.com"),
                                "links": new ArrJSONValue([])
                            })
                        ])
                    })
                ]),
            }),
            new ObjJSONValue({
                "authority": new StringJSONValue("app.three.com"), 
                "path": new StringJSONValue("locations/42"),
                "links": new ArrJSONValue([]),
            })
        ])
    })
])

// * Test:
// console.log(jsonLinkExample.allPathsSatisfyingPredicate(a => a.endsWith(".com")));
// console.log(JSON.stringify(jsonLinkExample.fillInMissingPath(), null, 4));


/* ----------------------------------------------------- **
### 3d. The `ObjJSONValue` class was too general for our web-crawler.
In particular, the objects only contained two kinds of entries 
given by the classes `WebEntryJSONValue` and `WebEntryPathJSONValue`
below. 

Implement the two classes `WebEntryJSONValue` and `WebEntryPathJSONValue`.
** ----------------------------------------------------- */

export class WebEntryJSONValue extends ObjJSONValue {
    constructor(authority: string, links: ArrJSONValue) {
        super({
            authority: new StringJSONValue(authority),
            links: new ArrJSONValue(links.arr)
        });
    }

    public allPathsSatisfyingPredicate(predicate: (authority: string) => boolean): string[] {
        const arr = [];
        if (this.obj.authority instanceof StringJSONValue && predicate(this.obj.authority.str)) {
            arr.push("/");
        }
        if (this.obj.links instanceof ArrJSONValue) {
            arr.push(...this.obj.links.allPathsSatisfyingPredicate(predicate));
        }
        return arr;
    }

    public fillInMissingPath(): JSONValue {
        return new WebEntryPathJSONValue(
            (this.obj.authority as StringJSONValue).str,
            "/",
            (this.obj.links as ArrJSONValue).fillInMissingPath() as ArrJSONValue
        );
    }
}

export class WebEntryPathJSONValue extends ObjJSONValue {
    constructor(authority: string, path: string, links: ArrJSONValue) {
        super({
            authority: new StringJSONValue(authority),
            path: new StringJSONValue(path),
            links: new ArrJSONValue(links.arr)
        });
    }

    public allPathsSatisfyingPredicate(predicate: (authority: string) => boolean): string[] {
        const arr = [];
        if (this.obj.authority instanceof StringJSONValue && predicate(this.obj.authority.str)) {
            arr.push((this.obj.path as StringJSONValue).str);
        }
        if (this.obj.links instanceof ArrJSONValue) {
            arr.push(...this.obj.links.allPathsSatisfyingPredicate(predicate));
        }
        return arr;
    }

    public fillInMissingPath(): JSONValue {
        return new WebEntryPathJSONValue(
            (this.obj.authority as StringJSONValue).str,
            (this.obj.path as StringJSONValue).str,
            (this.obj.links as ArrJSONValue).fillInMissingPath() as ArrJSONValue
        )
    }
}

export const jsonLinkExample2: JSONValue = new ArrJSONValue([
    new WebEntryPathJSONValue(
        "one.com",
        "1",
        new ArrJSONValue([
            new WebEntryJSONValue(
                "www.two.com", 
                new ArrJSONValue([]),
            ),
            new WebEntryPathJSONValue(
                "three.com",
                "",
                new ArrJSONValue([]),
            )
        ])
    ),
    new WebEntryJSONValue(
        "www.four.com",
        new ArrJSONValue([ 
            new WebEntryJSONValue(
                "seven.com", 
                new ArrJSONValue([
                    new WebEntryPathJSONValue(
                        "app.one.com",
                        "2",
                        new ArrJSONValue([
                            new WebEntryJSONValue(
                                "eight.com",
                                new ArrJSONValue([])
                            )
                        ])
                    )
                ])
            ),
            new ObjJSONValue({ // NOTE: We can still put other ObjSONValue's in here
                "authority": new StringJSONValue("app.three.com"), 
                "path": new StringJSONValue("locations/42"),
                "links": new ArrJSONValue([]),
            })
        ])
    )
])

// * Test:
// console.log(jsonLinkExample2.allPathsSatisfyingPredicate(a => a.endsWith(".com")));
// console.log(JSON.stringify(jsonLinkExample2.fillInMissingPath(), null, 4));
