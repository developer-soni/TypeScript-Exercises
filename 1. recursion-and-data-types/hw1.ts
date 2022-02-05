/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */

export const HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
export const SIGNATURE = "Dev Soni"; // TODO: FILL ME IN

// If you had any collaborators on this assignment, please list their github handles here.
export const COLLABORATORS = [
    "developer-soni", // TODO: FILL ME IN
];

// If you used any resources, please list them here
export const RESOURCES_CONSULTED = [
    "www.google.com", "www.stackoverflow.com", "www.geeksforgeeks.org" // TODO: FILL ME IN
];


/* ==========================================================================  **
## Problem 1: Numbers

This problem is a warmup. Consider the following sequence of numbers

S_1 = 1*1
S_n = n*n + S_{n-1}

which is a sum of squares. For example,

S_2 = 2*2 + S_1 
    = 2*2 + 1*1

and

S_3 = 3*3 + S_2
    = 3*3 + (2*2 + S_1)
    = 3*3 + (2*2 + 1*1).

S_n = 0 for any n <= 0.
You may assume that all numbers are integers.
** ============================================================================ */


/* ----------------------------------------------------- **
## Problem 1a:

Write sum of squares **iteratively**.
** ----------------------------------------------------- */

export function iterSumOfSquare(n: number): number {
    // TODO: implement me
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum = sum + (Math.pow(i, 2));
    }

    return sum;
}


/* ----------------------------------------------------- **
## Problem 1b:

Write sum of squares **recursively**.
** ----------------------------------------------------- */

export function recSumOfSquare(n: number): number {
    // TODO: implement me
    if (n <= 1)
        return n;
    return (n * n) + recSumOfSquare(n - 1);
}


/* ----------------------------------------------------- **
## Problem 1c:

Write down two test cases.
** ----------------------------------------------------- */

export const test1: [number, number] = [3, 14] // [n1, sumOfSquare(n1)] TODO: change me
export const test2: [number, number] = [4, 30] // [n2, sumOfSquare(n2)] TODO: change me


/* ----------------------------------------------------- **
## Problem 1d:

You now have two implementations of the "same" function.
One way to check the correctness of either implementation is
to perform differential testing where you only need to know
the input and check that the outputs are the same. Note that
the function could still be wrong ... both functions could be
implemented incorrectly in the same way. However, this will
reduce the probability that there is a bug because if the two
functions are implemented incorrectly, it is more likely that
they "incorrect" in different ways.

Write down two more inputs.
** ----------------------------------------------------- */

export function differentialTest(n: number): boolean {
    const result = iterSumOfSquare(n) === recSumOfSquare(n);
    if (!result) {
        console.log(`iterSumOfSquare(${n}) = ${iterSumOfSquare(n)} != recSumOfSquare(${n}) = ${recSumOfSquare(n)}`);
    }
    return result;
}

export const diffTest1: number = 5  // n1, TODO: change me
export const diffTest2: number = 6  // n2, TODO: change me

differentialTest(diffTest1);
differentialTest(diffTest2);



/* ==========================================================================  **
## Problem 2: Lists and Trees

In class, we introduced lists and trees as examples of ADTs. In this problem,
we'll look at converting between lists and trees.
** ============================================================================ */

export enum _List { NIL, CONS };
export type List<T> = { tag: _List.NIL } | { tag: _List.CONS, contents: T, rest: List<T> };

export function Nil<T>(): List<T> {
    return { tag: _List.NIL };
}

export function Cons<T>(x: T, ls: List<T>): List<T> {
    return { tag: _List.CONS, contents: x, rest: ls };
}


export enum _Tree { LEAF, NODE };
export type Tree<T> = { tag: _Tree.LEAF } | { tag: _Tree.NODE, contents: T, left: Tree<T>, right: Tree<T> };

export function Leaf<T>(): Tree<T> {
    return { tag: _Tree.LEAF };
}

export function Node<T>(x: T, left: Tree<T>, right: Tree<T>): Tree<T> {
    return { tag: _Tree.NODE, contents: x, left: left, right: right };
}

export function LeafNode<T>(x: T): Tree<T> {
    return Node(x, Leaf(), Leaf());
}


/* ----------------------------------------------------- **
### Problem 2a:

Convert a tree into a list using "mirrored" postfix ordering.
That is, we'll visit the right child, the left child, and then
finally the current node. (In standard postfix, we'll visit the
left, the right, and then the current node.)


- Example 1: 

Original 
```
   1
  / \
 2   3
```

Postfix
```
2 -> 3 -> 1
```

Mirrored Postfix
```
3 -> 2 -> 1
```

- Example 2:

Original 
```
   1
  / \
 2   3
 |  / \
 4  5  6
```

Postfix
```
4 -> 2 -> 5 -> 6 -> 3 -> 1
```

Mirrored Postfix
```
6 -> 5 -> 3 -> 4 -> 2 -> 1
```
** ----------------------------------------------------- */

export function mirroredPostfix<T>(t: Tree<T>): List<T> {
    // TODO: Implement me
    if (t.tag === _Tree.LEAF) {
        return Nil();
    }
    else {
        return helper(t, Nil());
    }
}
function helper<T>(t: Tree<T>, ls: List<T>): List<T> {
    if (t.tag === _Tree.LEAF) {
        return ls;
    }
    ls = Cons(t.contents, helper(t.right, ls));
    ls = Cons(t.contents, helper(t.left, ls));
    console.log("Mirror Postfix:", t.contents)
    return ls;
}


/* ----------------------------------------------------- **
### Problem 2b:

Previously we converted a tree into a list. Now we will convert a list into an array.

Example 1:

List
```
1 -> 2 -> 3 -> 4
```

Array
```
[1, 2, 3, 4]
```
** ----------------------------------------------------- */

export function listToArr<T>(ls: List<T>): T[] {
    // TODO: Implement me

    var curr = _Tree.NODE;
    let cnt = 0;
    while (curr != null) {
        cnt++;
        curr = curr.head;
    }

    let len = cnt;
    let arr = new Array(len);

    let index = 0;
    var curr = _Tree.NODE;

    while (curr != null) {
        arr[index++] = curr.data;
        curr = curr.next;
    }

}




/* ----------------------------------------------------- **
### Problem 2c:

In this problem we'll convert an array into a tree.

- Example 1:

Array
```
[1, 2, 3]
```

Tree
```
    2
   / \
  1   3
```

- Example 2:

Array
```
[1, 2, 3, 4]
```

Tree
```
    3
   / \
  2   4
 /    
1
```

- Example 3:

Array
```
[1, 2, 3, 4, 5]
```

Tree
```
    3
   / \
  2   5
 /   /
1    4
```

- Example 4:

Array
```
[1, 2, 3, 4, 5, 6]
```

Tree
```
     4
    / \
   /   \
  2     6
 / \    /
1   3  5
```
** ----------------------------------------------------- */

// Hint: use recursion with arr.slice 
export function arrayToTree<T>(arr: T[]): Tree<T> {
    // TODO: Implement me
    if (arr.length <= 0) {
        return Leaf();
    }
    return Node(arr[Math.floor(arr.length / 2)], arrayToTree(arr.slice(0, arr.length / 2)), arrayToTree(arr.slice(arr.length / 2 + 1)));
}


/* ----------------------------------------------------- **
### Problem 2d:

In summary, we saw we could convert trees into lists, lists into
arrays, and arrays back into trees. Consequently, an algorithm on
trees can be applied to arrays. For example, in class, we saw
that we could compute the smallest element in an array iteratively
and recursively.

Write a **recursive** function that finds the smallest element in a
tree of numbers. If it is an empty Tree, return NaN. We can then
find the smallest number in a tree using this  implementation as in
```
function smallestElementArr2(arr: number[]): number {
    return smallestTree(arrayToTree(arr));
}
```
```
** ----------------------------------------------------- */

export function smallestTree(tr: Tree<number>): number {
    // TODO: Implement me
    if (tr.tag === _Tree.LEAF) {
        return NaN;
    }
    let res = tr.contents;
    let rres = smallestTree(tr.right);
    let lres = smallestTree(tr.left);

    if (lres < res) {
        res = lres;
    }
    if (rres < res) {
        res = rres;
    }
    return res;
}

const tree2 = Node(1, Node(2, Node(4, Leaf(), Leaf()), Leaf()), Node(3, Node(5, Leaf(), Leaf()), Node(6, Leaf(), Leaf())));
console.log("Smallest Tree:", smallestTree(tree2));






/* ==========================================================================  **
## Problem 3: Hybrid List and Tree

We saw lists and binary trees in class. If the problem we are working on is a list
or tree, then we can reuse generic list and tree data-types. However, the problem
at hand may not be exactly a list or tree, in which case we will need to define our
own data-types. In this problem, we will practice defining our own data-types. We
will look at hybrid lists and trees where a tree can have one or two children. We
give the BNF below.

<hybrid> ::= HLeaf | OneChild(x, <hybrid>) | TwoChild(x, <hybrid>, <hybrid>)
** ============================================================================ */


/* ----------------------------------------------------- **
### Problem 3a:

Complete the data-type definition below.
** ----------------------------------------------------- */

export enum _Hybrid { HLEAF, ONECHILD, TWOCHILD };
export type Hybrid<T> = { tag: _Hybrid.HLEAF } // TODO: implement the rest
    | { tag: _Hybrid.ONECHILD, contents: T, child: Hybrid<T> } |
{ tag: _Hybrid.TWOCHILD, contents: T, left: Hybrid<T>, right: Hybrid<T> };

export function HLeaf<T>(): Hybrid<T> {
    return { tag: _Hybrid.HLEAF }; // This one is completed/
}

export function OneChild<T>(x: T, child: Hybrid<T>): Hybrid<T> {
    // TODO: implement me
    if (_Hybrid.HLEAF) {
        return HLeaf();
    }
    return { tag: _Hybrid.ONECHILD, contents: x, child: child };
}

export function TwoChild<T>(x: T, left: Hybrid<T>, right: Hybrid<T>): Hybrid<T> {
    // TODO: implement me
    if (_Hybrid.HLEAF) {
        return HLeaf();
    }
    return { tag: _Hybrid.TWOCHILD, contents: x, left: left, right: right };
}



/* ----------------------------------------------------- **
### Problem 3b:

Implement the following two structures in the `Hybrid` ADT.

hybrid1
```
    3
   / \
  2   5
  |   |
  1   4
```

hybrid2
```
     4
    / \
   /   \
  2     6
 / \    |
1   3   5

Use OneChild for LeafNodes.
```
** ----------------------------------------------------- */

export const hybrid1 = HLeaf();  // TODO: implement me
export const hybrid2 = HLeaf();  // TODO: implement me



/* ----------------------------------------------------- **
### Problem 3c

You may have noticed that the Hybrid ADT was able to encode
the "same" structures as Tree data structure. That the "same"
data can be stored in a variety of equivalent encodings can
occur in practice.

Write a **recursive** function that converts a Hybrid data
structure into a Tree structure. When translating a node with
one child into a node, put the child in the left child.
** ----------------------------------------------------- */

function hybridToTree<T>(hybrid: Hybrid<T>): Tree<T> {
    // TODO: implement me
    return Leaf();
}



/* ==========================================================================  **
## Problem 4: JSON

You may be familiar with a concept known as a **webscraper** that:

1. Visits a web-page
2. *Recursively* visits each link on that page

This might produce a JSON data-structure such as

```
[
  {
    "url": "www.foobar.com",
    "links": [ { links json ... }]
  },
  ...,
  {
    "url": "www.bazbae.com",
    "links": [ { links json ... }]
  },
]
```
** ============================================================================ */

export type JSONValue = null | string | JSONObject | JSONValue[];
export type JSONObject = { [key: string]: JSONValue };

export const jsonLinkExample: JSONValue = [
    {
        "url": "one.com",
        "links": [
            {
                "url": "two.com",
                "links": [],
            },
            {
                "url": "three.com",
                "links": [],
            }
        ]
    },
    {
        "url": "four.com",
        "links": [
            {
                "url": "seven.com",
                "links": [
                    {
                        "url": "one.com",
                        "links": [
                            {
                                "url": "eight.com",
                                "links": []
                            }
                        ]
                    }
                ],
            },
            {
                "url": "three.com",
                "links": [],
            }
        ]
    }
]


/* ----------------------------------------------------- **
### Problem 4a

Write a **recursive** function that creates an array of all
URLs (duplicates included) found in the JSON.
** ----------------------------------------------------- */

export function allURL(json: JSONValue): string[] {
    // TODO: Implement me
    var k;
    if (json.hasOwnProperty('url')) {
        for (k in json) {
            if (json.hasOwnProperty(k)) {
                allURL(json[k]);
            }
        }
    }
    return [];
}


/* ----------------------------------------------------- **
### Problem 4b

Given a JSON as above where "links" contains the same JSON
format, arbitrarily nested, write a **recursive** function
that counts the number of times an exact match of a given url
occurs in the JSON object.
** ----------------------------------------------------- */

export function recCountURL(url: string, json: JSONValue): number {
    // TODO: Implement me
    return 0;
}


/* ----------------------------------------------------- **
### Problem 4c

Do the same as problem 4a but this time with an **iterative**
function.
** ----------------------------------------------------- */

export function iterCountURL(url: string, json: JSONValue): number {
    // TODO: Implement me
    return 0;
}
