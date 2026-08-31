/**
 * Bug Hunter Question Dataset
 * Curated broken-code challenges across 5 languages and 6 error types.
 */

export const ERROR_TYPES = {
  SYNTAX: 'Syntax Error',
  RUNTIME: 'Runtime Error',
  LOGICAL: 'Logical Error',
  COMPILATION: 'Compilation Error',
  TYPE: 'Type Error',
  NULL_REF: 'Null/Reference Error',
};

export const BUG_QUESTIONS = [
  // ==================== JAVASCRIPT ====================
  {
    id: 'bug-js-1',
    languageId: 'javascript',
    language: 'JavaScript',
    topic: 'Variable Declarations',
    difficulty: 'Beginner',
    errorType: ERROR_TYPES.RUNTIME,
    xp: 25,
    title: 'Counter Won\'t Increment',
    prompt: 'Can you find the bug?',
    description: 'This counter is supposed to start at 0 and increment by 1 every call, but the output is always NaN.',
    buggyCode: `function makeCounter() {
  let count;       // <-- Bug is here
  return function() {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // Expected: 1, Got: NaN`,
    options: [
      { id: 'a', text: 'Change `let count;` to `let count = 0;`' },
      { id: 'b', text: 'Change `count += 1` to `count = count + "1"`' },
      { id: 'c', text: 'Add `return count + 1;` instead of `count += 1`' },
      { id: 'd', text: 'Wrap `counter()` in a `try/catch` block' },
    ],
    answerId: 'a',
    fixedCode: `function makeCounter() {
  let count = 0; // ✅ Initialize to 0
  return function() {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1 🎉`,
    explanation: '`undefined + 1` evaluates to `NaN` in JavaScript. Always initialize numeric variables with a starting value.',
    cause: '`let count;` declares the variable but leaves it as `undefined`. Arithmetic on `undefined` produces `NaN`.',
    beginnerExplanation: 'Think of it like an empty jar. If you try to add 1 coin to a jar that has "nothing defined" (not even 0 coins), JavaScript gets confused and returns NaN (Not a Number) instead of 1.',
  },
  {
    id: 'bug-js-2',
    languageId: 'javascript',
    language: 'JavaScript',
    topic: 'Equality Comparison',
    difficulty: 'Beginner',
    errorType: ERROR_TYPES.LOGICAL,
    xp: 20,
    title: 'Login Always Succeeds',
    prompt: 'Can you find the bug?',
    description: 'The login check is supposed to validate the password, but every password is accepted as correct.',
    buggyCode: `function login(password) {
  const correct = "secret123";
  if (password = correct) { // <-- Bug is here
    return "Welcome!";
  }
  return "Access denied.";
}

console.log(login("wrongpass")); // Prints: "Welcome!" 😱`,
    options: [
      { id: 'a', text: 'Change `=` to `===` in the if condition' },
      { id: 'b', text: 'Change `const correct` to `let correct`' },
      { id: 'c', text: 'Move the return statement outside the if block' },
      { id: 'd', text: 'Wrap password in `parseInt()`' },
    ],
    answerId: 'a',
    fixedCode: `function login(password) {
  const correct = "secret123";
  if (password === correct) { // ✅ Strict equality
    return "Welcome!";
  }
  return "Access denied.";
}

console.log(login("wrongpass")); // "Access denied." 🔒`,
    explanation: '`=` is assignment, not comparison. `password = correct` assigns the value of `correct` to `password`, which is always truthy.',
    cause: 'Using `=` (assignment operator) inside an `if` condition instead of `===` (strict equality). This assigns the value and evaluates its truthiness.',
    beginnerExplanation: 'In code, `=` means "set this variable to". You need `===` to ask "are these two things the same?" It\'s like writing "is the password = the secret" vs "make the password = the secret".',
  },
  {
    id: 'bug-js-3',
    languageId: 'javascript',
    language: 'JavaScript',
    topic: 'Array Methods',
    difficulty: 'Intermediate',
    errorType: ERROR_TYPES.TYPE,
    xp: 30,
    title: 'Sort Produces Wrong Order',
    prompt: 'Can you find the bug?',
    description: 'Sorting the numbers should produce [1, 5, 10, 21, 100] but the output is unexpected.',
    buggyCode: `const nums = [10, 1, 21, 5, 100];
nums.sort(); // <-- Bug is here
console.log(nums);
// Got: [1, 10, 100, 21, 5] — Wrong!`,
    options: [
      { id: 'a', text: 'Use `nums.sort((a, b) => a - b)` for numeric sort' },
      { id: 'b', text: 'Use `nums.reverse()` after `.sort()`' },
      { id: 'c', text: 'Convert nums to a Set first' },
      { id: 'd', text: 'Use `nums.filter()` instead of `.sort()`' },
    ],
    answerId: 'a',
    fixedCode: `const nums = [10, 1, 21, 5, 100];
nums.sort((a, b) => a - b); // ✅ Numeric comparator
console.log(nums);
// [1, 5, 10, 21, 100] 🎉`,
    explanation: 'Without a comparator, `.sort()` converts elements to strings and compares Unicode values. `"10" < "5"` alphabetically, hence wrong order.',
    cause: 'Default `.sort()` does lexicographic (alphabetical) string comparison. Numbers must have an explicit comparator `(a, b) => a - b`.',
    beginnerExplanation: 'By default, `.sort()` treats numbers like words and compares them letter by letter. "10" starts with "1", which comes before "5", so it puts 10 before 5. You need to tell it to compare them as actual numbers.',
  },

  // ==================== PYTHON ====================
  {
    id: 'bug-py-1',
    languageId: 'python',
    language: 'Python',
    topic: 'Loops & Ranges',
    difficulty: 'Beginner',
    errorType: ERROR_TYPES.LOGICAL,
    xp: 20,
    title: 'Sum Stops One Short',
    prompt: 'Can you find the bug?',
    description: 'The function should return the sum of 1 + 2 + 3 + 4 + 5 = 15, but it returns 10 instead.',
    buggyCode: `def sum_to_n(n):
    total = 0
    for i in range(1, n): # <-- Bug is here
        total += i
    return total

print(sum_to_n(5)) # Expected: 15, Got: 10`,
    options: [
      { id: 'a', text: 'Change `range(1, n)` to `range(1, n + 1)`' },
      { id: 'b', text: 'Change `total = 0` to `total = 1`' },
      { id: 'c', text: 'Change `range(1, n)` to `range(0, n)`' },
      { id: 'd', text: 'Change `total += i` to `total += i + 1`' },
    ],
    answerId: 'a',
    fixedCode: `def sum_to_n(n):
    total = 0
    for i in range(1, n + 1): # ✅ Inclusive end
        total += i
    return total

print(sum_to_n(5)) # 15 🎉`,
    explanation: '`range(1, n)` generates numbers up to but not including `n`. Using `range(1, n + 1)` makes it inclusive.',
    cause: 'Python\'s `range(start, stop)` excludes the `stop` value. So `range(1, 5)` produces 1, 2, 3, 4 — missing 5.',
    beginnerExplanation: 'Think of `range(1, 5)` like a bus that goes from stop 1 to stop 5 but doesn\'t pick anyone up at the last stop. To include stop 5, you need to say `range(1, 6)`.',
  },
  {
    id: 'bug-py-2',
    languageId: 'python',
    language: 'Python',
    topic: 'Mutable Default Arguments',
    difficulty: 'Advanced',
    errorType: ERROR_TYPES.LOGICAL,
    xp: 35,
    title: 'List Keeps Growing Between Calls',
    prompt: 'Can you find the bug?',
    description: 'Each call to `add_item` should return a fresh list, but the list grows across separate calls.',
    buggyCode: `def add_item(item, items=[]): # <-- Bug is here
    items.append(item)
    return items

print(add_item("apple"))  # ['apple']
print(add_item("banana")) # Expected: ['banana'], Got: ['apple', 'banana']!`,
    options: [
      { id: 'a', text: 'Change default to `items=None` and initialize inside' },
      { id: 'b', text: 'Change `items.append(item)` to `items = [item]`' },
      { id: 'c', text: 'Convert items to a tuple' },
      { id: 'd', text: 'Add `global items` at the top of the function' },
    ],
    answerId: 'a',
    fixedCode: `def add_item(item, items=None): # ✅ Safe default
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item("apple"))  # ['apple'] ✓
print(add_item("banana")) # ['banana'] ✓`,
    explanation: 'Mutable default arguments in Python are evaluated ONCE when the function is defined, not on each call. The same list object is reused.',
    cause: 'Python evaluates `items=[]` once at function definition time. The same list object is shared across all calls that use the default.',
    beginnerExplanation: 'Imagine the default list is a whiteboard. Every time you call the function without providing a list, you write on the SAME whiteboard — not a new one. Fix: erase the board at the start (`items = []` inside the function).',
  },
  {
    id: 'bug-py-3',
    languageId: 'python',
    language: 'Python',
    topic: 'String Methods',
    difficulty: 'Beginner',
    errorType: ERROR_TYPES.TYPE,
    xp: 20,
    title: 'Cannot Concatenate Int to String',
    prompt: 'Can you find the bug?',
    description: 'The greeting should print "Hello, you are 25 years old" but crashes with a TypeError.',
    buggyCode: `name = "Alex"
age = 25
greeting = "Hello " + name + ", you are " + age + " years old" # <-- Bug
print(greeting)`,
    options: [
      { id: 'a', text: 'Wrap `age` in `str()`: `str(age)`' },
      { id: 'b', text: 'Use `int(name)` to convert name to a number' },
      { id: 'c', text: 'Change `age = 25` to `age = "25"`' },
      { id: 'd', text: 'Both A and C are valid fixes' },
    ],
    answerId: 'd',
    fixedCode: `name = "Alex"
age = 25
# Option 1: str() conversion
greeting = "Hello " + name + ", you are " + str(age) + " years old"
# Option 2: f-string (most Pythonic)
greeting2 = f"Hello {name}, you are {age} years old"
print(greeting)  # ✅
print(greeting2) # ✅`,
    explanation: 'Python does not implicitly convert integers to strings. You must use `str(age)` or an f-string to concatenate mixed types.',
    cause: 'The `+` operator cannot concatenate a `str` and an `int` in Python. This raises `TypeError: can only concatenate str (not "int") to str`.',
    beginnerExplanation: 'Python doesn\'t automatically turn numbers into words for you. If you want to glue a number into a sentence, you need to wrap it in `str()` — like putting it in a word-shaped box — or use an f-string.',
  },

  // ==================== C ====================
  {
    id: 'bug-c-1',
    languageId: 'c',
    language: 'C',
    topic: 'Memory Management',
    difficulty: 'Intermediate',
    errorType: ERROR_TYPES.NULL_REF,
    xp: 30,
    title: 'Null Pointer Dereference',
    prompt: 'Can you find the bug?',
    description: 'The code allocates memory and should store a value, but crashes with a Segmentation Fault.',
    buggyCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = malloc(sizeof(int));
    free(ptr);           // <-- Bug: freed too early
    *ptr = 42;           // Segfault! Accessing freed memory
    printf("%d\\n", *ptr);
    return 0;
}`,
    options: [
      { id: 'a', text: 'Move `free(ptr)` after `printf()` — use then free' },
      { id: 'b', text: 'Change `malloc` to `calloc`' },
      { id: 'c', text: 'Add `ptr = NULL` after `free(ptr)`' },
      { id: 'd', text: 'Declare `ptr` as `int ptr` without pointer' },
    ],
    answerId: 'a',
    fixedCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = malloc(sizeof(int));
    if (ptr == NULL) return 1;
    *ptr = 42;           // ✅ Use before freeing
    printf("%d\\n", *ptr); // 42
    free(ptr);           // ✅ Free after use
    return 0;
}`,
    explanation: 'Accessing memory after calling `free()` is undefined behaviour in C. Always use the allocated memory before releasing it.',
    cause: '`free(ptr)` returns the memory block to the OS. Writing to `*ptr` afterwards accesses deallocated memory, causing a Segmentation Fault.',
    beginnerExplanation: 'Imagine `malloc` rents you an apartment. `free` returns the key. If you try to walk back into the apartment after returning the key, you\'re trespassing — that\'s your Segfault.',
  },
  {
    id: 'bug-c-2',
    languageId: 'c',
    language: 'C',
    topic: 'Array Bounds',
    difficulty: 'Intermediate',
    errorType: ERROR_TYPES.RUNTIME,
    xp: 25,
    title: 'Array Out of Bounds Write',
    prompt: 'Can you find the bug?',
    description: 'The loop intends to fill 5 array slots (indices 0–4), but it writes beyond the allocated array.',
    buggyCode: `#include <stdio.h>

int main() {
    int arr[5];
    for (int i = 0; i <= 5; i++) { // <-- Bug: should be i < 5
        arr[i] = i * 10;
    }
    return 0;
}`,
    options: [
      { id: 'a', text: 'Change `i <= 5` to `i < 5` in the loop condition' },
      { id: 'b', text: 'Change `int arr[5]` to `int arr[6]`' },
      { id: 'c', text: 'Start loop at `i = 1` instead of `i = 0`' },
      { id: 'd', text: 'Change `i++` to `i += 2`' },
    ],
    answerId: 'a',
    fixedCode: `#include <stdio.h>

int main() {
    int arr[5];
    for (int i = 0; i < 5; i++) { // ✅ Correct bound
        arr[i] = i * 10;
    }
    return 0;
}`,
    explanation: 'Array `arr[5]` has valid indices 0 to 4. Writing to `arr[5]` is out-of-bounds and causes undefined behaviour (stack corruption or crash).',
    cause: '`i <= 5` allows the loop to reach `i = 5`, writing past the end of the 5-element array. Off-by-one in the termination condition.',
    beginnerExplanation: 'If you have 5 lockers numbered 0, 1, 2, 3, 4, and you try to use locker number 5, it doesn\'t exist! The fix is to stop BEFORE reaching 5, which means using `< 5` not `<= 5`.',
  },

  // ==================== C++ ====================
  {
    id: 'bug-cpp-1',
    languageId: 'cpp',
    language: 'C++',
    topic: 'Object Slicing',
    difficulty: 'Advanced',
    errorType: ERROR_TYPES.LOGICAL,
    xp: 40,
    title: 'Polymorphism Lost — Object Slicing',
    prompt: 'Can you find the bug?',
    description: 'The virtual function should print "Dog says: Woof!", but always prints the base class message.',
    buggyCode: `#include <iostream>

class Animal {
public:
    virtual void speak() { std::cout << "Animal sound\\n"; }
};

class Dog : public Animal {
public:
    void speak() override { std::cout << "Dog says: Woof!\\n"; }
};

void makeSpeak(Animal a) { // <-- Bug: passing by value
    a.speak();
}

int main() {
    Dog d;
    makeSpeak(d); // Prints "Animal sound" 😱
}`,
    options: [
      { id: 'a', text: 'Change `Animal a` to `Animal& a` (pass by reference)' },
      { id: 'b', text: 'Remove the `virtual` keyword from base class' },
      { id: 'c', text: 'Change `override` to `virtual` in Dog' },
      { id: 'd', text: 'Use `static_cast<Dog>(a)` inside makeSpeak' },
    ],
    answerId: 'a',
    fixedCode: `#include <iostream>

class Animal {
public:
    virtual void speak() { std::cout << "Animal sound\\n"; }
};

class Dog : public Animal {
public:
    void speak() override { std::cout << "Dog says: Woof!\\n"; }
};

void makeSpeak(Animal& a) { // ✅ Pass by reference
    a.speak();
}

int main() {
    Dog d;
    makeSpeak(d); // "Dog says: Woof!" 🎉
}`,
    explanation: 'Passing a derived class by value to a base class parameter causes "object slicing" — the `Dog` part is cut away, leaving only the `Animal` part.',
    cause: 'When you pass `Dog d` as `Animal a` by value, C++ copies only the `Animal` portion. The virtual dispatch table (vtable) pointer is lost.',
    beginnerExplanation: 'Imagine copying only the "animal legs" from a Dog blueprint — the barking, the tail, all the dog-specific stuff gets left behind. Passing by reference (`&`) gives the full dog, not a copy.',
  },
  {
    id: 'bug-cpp-2',
    languageId: 'cpp',
    language: 'C++',
    topic: 'Memory Safety',
    difficulty: 'Intermediate',
    errorType: ERROR_TYPES.NULL_REF,
    xp: 30,
    title: 'Dangling Pointer After Delete',
    prompt: 'Can you find the bug?',
    description: 'The pointer is deleted and then read again, causing undefined behaviour or crash.',
    buggyCode: `#include <iostream>

int main() {
    int* p = new int(99);
    std::cout << *p << "\\n"; // OK
    delete p;
    std::cout << *p << "\\n"; // <-- Bug: dangling pointer read!
    return 0;
}`,
    options: [
      { id: 'a', text: 'Set `p = nullptr` after `delete p` and guard before use' },
      { id: 'b', text: 'Use `delete[] p` instead of `delete p`' },
      { id: 'c', text: 'Move the second `cout` before `delete`' },
      { id: 'd', text: 'Both A and C are valid fixes' },
    ],
    answerId: 'd',
    fixedCode: `#include <iostream>

int main() {
    int* p = new int(99);
    std::cout << *p << "\\n";  // 99
    delete p;
    p = nullptr; // ✅ Nullify after delete (Option A)
    // Or move cout before delete (Option C):
    // Both prevent dangling pointer access
    return 0;
}`,
    explanation: 'After `delete p`, the pointer `p` becomes a dangling pointer. Reading through it is undefined behaviour — it may crash or silently corrupt memory.',
    cause: '`delete` frees the heap memory but `p` still holds the old address. Accessing a freed address is undefined behaviour.',
    beginnerExplanation: 'After deleting an object, the pointer is like a map to a demolished house. The house is gone, but the map still exists. Trying to enter causes a crash. Set `p = nullptr` — it\'s like erasing the map so nobody follows it.',
  },

  // ==================== JAVA ====================
  {
    id: 'bug-java-1',
    languageId: 'java',
    language: 'Java',
    topic: 'Null Handling',
    difficulty: 'Beginner',
    errorType: ERROR_TYPES.NULL_REF,
    xp: 25,
    title: 'NullPointerException on String Method',
    prompt: 'Can you find the bug?',
    description: 'The code tries to check if a user\'s name starts with "A", but throws NullPointerException.',
    buggyCode: `public class Main {
    public static void main(String[] args) {
        String name = null; // <-- Bug setup
        // This will throw NullPointerException:
        if (name.startsWith("A")) { // <-- Bug: null dereference
            System.out.println("Name starts with A");
        }
    }
}`,
    options: [
      { id: 'a', text: 'Add null check: `if (name != null && name.startsWith("A"))`' },
      { id: 'b', text: 'Use `name.equals("A")` instead of `startsWith`' },
      { id: 'c', text: 'Wrap in `try { } catch (Exception e) { }` and ignore it' },
      { id: 'd', text: 'Change `String name` to `int name`' },
    ],
    answerId: 'a',
    fixedCode: `public class Main {
    public static void main(String[] args) {
        String name = null;
        // ✅ Null-safe check using short-circuit &&
        if (name != null && name.startsWith("A")) {
            System.out.println("Name starts with A");
        } else {
            System.out.println("Name is null or doesn't start with A");
        }
    }
}`,
    explanation: 'Calling any method on a `null` reference in Java throws `NullPointerException`. Always guard with a null check before calling methods on potentially null objects.',
    cause: '`name` is `null`. Calling `name.startsWith("A")` tries to invoke a method on a non-existent object, causing a `NullPointerException`.',
    beginnerExplanation: 'A null variable is like an empty phone cradle with no phone in it. If you pick up the cradle and try to dial, nothing works — you need the actual phone (a real String object) before you can call `.startsWith()` on it.',
  },
  {
    id: 'bug-java-2',
    languageId: 'java',
    language: 'Java',
    topic: 'Integer Overflow',
    difficulty: 'Intermediate',
    errorType: ERROR_TYPES.RUNTIME,
    xp: 35,
    title: 'Integer Overflow in Factorial',
    prompt: 'Can you find the bug?',
    description: 'Computing factorial of 20 gives a negative number or wrong result due to overflow.',
    buggyCode: `public class Main {
    static int factorial(int n) { // <-- Bug: int overflows for n >= 13
        if (n == 0) return 1;
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(factorial(20));
        // Expected: 2432902008176640000, Got: -2102132736 😱
    }
}`,
    options: [
      { id: 'a', text: 'Change return type and parameter to `long`' },
      { id: 'b', text: 'Add `throws ArithmeticException` to the method' },
      { id: 'c', text: 'Use `Integer.MAX_VALUE` as the base case' },
      { id: 'd', text: 'Divide the result by `n` at the end' },
    ],
    answerId: 'a',
    fixedCode: `public class Main {
    static long factorial(long n) { // ✅ long holds larger values
        if (n == 0) return 1;
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(factorial(20));
        // 2432902008176640000 🎉
    }
}`,
    explanation: 'Java\'s `int` can hold values up to ~2.1 billion. Factorial(13) already exceeds this. Using `long` extends the range to ~9.2 × 10¹⁸.',
    cause: '`int` in Java is 32-bit with max value of 2,147,483,647. Multiplying large factorials causes silent overflow, wrapping around to negative numbers.',
    beginnerExplanation: 'An `int` is like a small bucket that only holds numbers up to about 2 billion. Factorial(20) is way bigger than that, so the bucket overflows! Using `long` gives you a much bigger bucket.',
  },
];
