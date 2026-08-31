/**
 * High-quality curated dataset of vertical video-like interactive coding reels.
 * Includes lessons for JavaScript, Python, C, C++, and Java across 6 lesson types:
 * 1. concept
 * 2. code_example
 * 3. find_bug
 * 4. predict_output
 * 5. multiple_choice
 * 6. mini_challenge
 */

export const LESSON_TYPES = {
  CONCEPT: 'concept',
  CODE_EXAMPLE: 'code_example',
  FIND_BUG: 'find_bug',
  PREDICT_OUTPUT: 'predict_output',
  MULTIPLE_CHOICE: 'multiple_choice',
  MINI_CHALLENGE: 'mini_challenge',
};

export const SAMPLE_LESSONS = [
  // ==================== JAVASCRIPT LESSONS ====================
  {
    id: 'js-1',
    languageId: 'javascript',
    title: 'Arrow Functions & Lexical This',
    topic: 'ES6 Modern JS',
    difficulty: 'Beginner',
    type: 'concept',
    xp: 20,
    author: 'Alex River',
    codeSnippet: `// Arrow function syntax
const add = (a, b) => a + b;

// Implicit return with object literal
const makeUser = (name) => ({ name, role: 'Dev' });

console.log(makeUser('Kavir'));`,
    explanation: 'Arrow functions do not bind their own `this` keyword, capturing `this` from the enclosing scope context instead.',
    visualExplanation: 'Lexical `this` inherits directly from outer function scope -> No more `.bind(this)`!',
    hint: 'Think about how traditional `function()` declarations create their own context vs arrow functions taking scope from outside.',
    tryItCode: `const add = (a, b) => a + b;
console.log("3 + 5 =", add(3, 5));`,
    question: {
      prompt: 'Which statement about ES6 arrow functions is TRUE?',
      options: [
        { id: 'a', text: 'They cannot be assigned to variables' },
        { id: 'b', text: 'They capture `this` from the enclosing lexical scope' },
        { id: 'c', text: 'They require explicit `return` for single line expressions' },
        { id: 'd', text: 'They can be used as constructors with `new`' },
      ],
      answerId: 'b',
      explanation: 'Arrow functions inherit `this` from their outer scope and cannot be used as class constructors.',
    },
  },
  {
    id: 'js-2',
    languageId: 'javascript',
    title: 'Array Destructuring & Rest Syntax',
    topic: 'Data Manipulation',
    difficulty: 'Intermediate',
    type: 'predict_output',
    xp: 25,
    author: 'Sarah Chen',
    codeSnippet: `const numbers = [10, 20, 30, 40, 50];
const [first, second, ...rest] = numbers;

console.log(rest.length);`,
    explanation: 'The rest operator (`...`) gathers all remaining items into a new array.',
    visualExplanation: `[10, 20, 30, 40, 50]
  ↓   ↓   └────┬────┘
first sec   ...rest = [30, 40, 50]`,
    hint: 'Count how many items remain after assigning `first` (10) and `second` (20).',
    tryItCode: `const numbers = [10, 20, 30, 40, 50];
const [first, second, ...rest] = numbers;
console.log("rest:", rest);
console.log("length:", rest.length);`,
    question: {
      prompt: 'What will `console.log(rest.length)` output?',
      options: [
        { id: 'a', text: '5' },
        { id: 'b', text: '3' },
        { id: 'c', text: '2' },
        { id: 'd', text: 'Undefined' },
      ],
      answerId: 'b',
      explanation: '`first` takes 10, `second` takes 20, leaving `rest` with 3 elements: [30, 40, 50].',
    },
  },
  {
    id: 'js-3',
    languageId: 'javascript',
    title: 'Spot the Mutated Const Bug',
    topic: 'Variable Declarations',
    difficulty: 'Beginner',
    type: 'find_bug',
    xp: 30,
    author: 'Dev Doctor',
    codeSnippet: `const counter = 0;

function increment() {
    counter = counter + 1; // Bug here!
    return counter;
}

console.log(increment());`,
    explanation: 'Variables declared with `const` cannot be reassigned. Use `let` for variables that change state.',
    visualExplanation: '`const` creates a read-only reference -> TypeError: Assignment to constant variable.',
    hint: 'Check the keyword used to declare `counter`. Can a `const` variable be re-assigned?',
    tryItCode: `let counter = 0;
function increment() {
    counter = counter + 1;
    return counter;
}
console.log("Updated counter:", increment());`,
    question: {
      prompt: 'What error will running this code produce?',
      options: [
        { id: 'a', text: 'SyntaxError: Unexpected token' },
        { id: 'b', text: 'TypeError: Assignment to constant variable' },
        { id: 'c', text: 'ReferenceError: counter is not defined' },
        { id: 'd', text: 'It runs without error and prints 1' },
      ],
      answerId: 'b',
      explanation: 'Reassigning a `const` variable triggers an unhandled `TypeError`.',
    },
  },
  {
    id: 'js-4',
    languageId: 'javascript',
    title: 'Promises & Async / Await',
    topic: 'Asynchronous JS',
    difficulty: 'Advanced',
    type: 'mini_challenge',
    xp: 35,
    author: 'Async Master',
    codeSnippet: `async function fetchUserData() {
    // Missing keyword below!
    const response = _______ fetch('https://api.example.com/user');
    const data = await response.json();
    return data.name;
}`,
    explanation: '`await` pauses execution until the Promise returned by `fetch()` resolves.',
    visualExplanation: '`fetch()` returns Promise -> `await` pauses execution until data is resolved.',
    hint: 'What keyword precedes asynchronous calls inside an `async` function?',
    tryItCode: `const mockFetch = () => Promise.resolve({ json: () => Promise.resolve({ name: 'Alex' }) });
async function getUser() {
    const res = await mockFetch();
    const data = await res.json();
    console.log("User:", data.name);
}
getUser();`,
    question: {
      prompt: 'Fill in the blank: What keyword is missing before `fetch(...)`?',
      options: [
        { id: 'a', text: 'yield' },
        { id: 'b', text: 'await' },
        { id: 'c', text: 'defer' },
        { id: 'd', text: 'then' },
      ],
      answerId: 'b',
      explanation: '`await` is required inside async functions to wait for Promise resolution.',
    },
  },

  // ==================== PYTHON LESSONS ====================
  {
    id: 'py-1',
    languageId: 'python',
    title: 'Python List Comprehensions',
    topic: 'Pythonic Code',
    difficulty: 'Beginner',
    type: 'concept',
    xp: 15,
    author: 'Guido Fan',
    codeSnippet: `# Traditional Way
squares = []
for x in range(5):
    squares.append(x**2)

# Pythonic Way ✨
squares = [x**2 for x in range(5)]
print(squares) # [0, 1, 4, 9, 16]`,
    explanation: 'List comprehension provides a concise, readable syntax to transform iterables in a single line.',
    visualExplanation: '`[expression for item in iterable if condition]` -> Compact & fast array creation.',
    hint: 'Remember `range(5)` generates numbers from 0 up to (but not including) 5.',
    tryItCode: `evens = [x for x in range(10) if x % 2 == 0]
print("Evens:", evens)`,
    question: {
      prompt: 'What does `[x for x in range(3)]` evaluate to in Python?',
      options: [
        { id: 'a', text: '[0, 1, 2]' },
        { id: 'b', text: '[1, 2, 3]' },
        { id: 'c', text: '[0, 1, 2, 3]' },
        { id: 'd', text: 'SyntaxError' },
      ],
      answerId: 'a',
      explanation: '`range(3)` produces numbers 0, 1, and 2.',
    },
  },
  {
    id: 'py-2',
    languageId: 'python',
    title: 'Dictionary Merging with | Operator',
    topic: 'Data Structures',
    difficulty: 'Intermediate',
    type: 'code_example',
    xp: 25,
    author: 'PyGuru',
    codeSnippet: `# Python 3.9+ Union Operator
user_info = {"name": "Alice", "role": "Dev"}
defaults = {"role": "Guest", "theme": "Dark"}

profile = defaults | user_info
print(profile["role"])`,
    explanation: 'The `|` merge operator combines dictionaries. Keys in the right operand overwrite keys in the left.',
    visualExplanation: '`defaults | user_info` -> "role": "Dev" overwrites "role": "Guest".',
    hint: 'When two dicts share a key ("role"), which side takes precedence in `left | right`?',
    tryItCode: `d1 = {"a": 1, "b": 2}
d2 = {"b": 99, "c": 3}
print(d1 | d2)`,
    question: {
      prompt: 'What will `print(profile["role"])` output?',
      options: [
        { id: 'a', text: 'Guest' },
        { id: 'b', text: 'Dev' },
        { id: 'c', text: 'KeyError' },
        { id: 'd', text: '["Guest", "Dev"]' },
      ],
      answerId: 'b',
      explanation: 'Values from the right-hand dictionary (`user_info`) overwrite matching keys in the left.',
    },
  },
  {
    id: 'py-3',
    languageId: 'python',
    title: 'Spot the Mutable Default Arg Bug',
    topic: 'Functions & State',
    difficulty: 'Advanced',
    type: 'find_bug',
    xp: 35,
    author: 'Pythonic BugHunter',
    codeSnippet: `def add_item(item, target_list=[]): # Bug here!
    target_list.append(item)
    return target_list

print(add_item("A")) # ['A']
print(add_item("B")) # Expected ['B'], actual ['A', 'B']!`,
    explanation: 'Default arguments in Python are evaluated once when the function is defined, persistent across calls!',
    visualExplanation: 'Default mutable list `[]` is created ONCE at compile time -> Shared across calls!',
    hint: 'How should you safely initialize a default list parameter in Python functions?',
    tryItCode: `def safe_add(item, target=None):
    if target is None:
        target = []
    target.append(item)
    return target

print(safe_add("A"))
print(safe_add("B"))`,
    question: {
      prompt: 'What is the correct way to fix this mutable default argument bug?',
      options: [
        { id: 'a', text: 'Use `target_list=None` and initialize inside function' },
        { id: 'b', text: 'Use `target_list=list()` in parameter list' },
        { id: 'c', text: 'Declare `target_list` as global' },
        { id: 'd', text: 'Add `pass` at end of function' },
      ],
      answerId: 'a',
      explanation: 'Set default to `None` and instantiate a fresh list `[]` inside the body if `None`.',
    },
  },

  // ==================== C LESSONS ====================
  {
    id: 'c-1',
    languageId: 'c',
    title: 'Dynamic Memory Allocation with malloc()',
    topic: 'Pointers & Memory',
    difficulty: 'Intermediate',
    type: 'concept',
    xp: 25,
    author: 'Kernel Dev',
    codeSnippet: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int*) malloc(5 * sizeof(int));
    if (arr == NULL) return 1;

    arr[0] = 100;
    printf("Value: %d\\n", arr[0]);

    free(arr); // Always release heap memory!
    return 0;
}`,
    explanation: '`malloc()` allocates raw heap memory. You must always invoke `free()` to prevent memory leaks.',
    visualExplanation: 'Stack Memory vs Heap Memory: Heap requires explicit `free(ptr)` management.',
    hint: 'What happens to allocated heap memory if you don’t call `free()` before exiting long processes?',
    tryItCode: `#include <stdio.h>
#include <stdlib.h>
int main() {
    int *p = malloc(sizeof(int));
    *p = 42;
    printf("*p = %d\\n", *p);
    free(p);
    return 0;
}`,
    question: {
      prompt: 'What failure occurs if `free()` is omitted on heap allocations in long-running C code?',
      options: [
        { id: 'a', text: 'Automatic Garbage Collection' },
        { id: 'b', text: 'Memory Leak' },
        { id: 'c', text: 'Compiler Error' },
        { id: 'd', text: 'Instant Stack Overflow' },
      ],
      answerId: 'b',
      explanation: 'C lacks automatic garbage collection; unfreed memory causes Memory Leaks.',
    },
  },
  {
    id: 'c-2',
    languageId: 'c',
    title: 'Pointer Arithmetic & Array Access',
    topic: 'Pointers',
    difficulty: 'Advanced',
    type: 'predict_output',
    xp: 30,
    author: 'System Architect',
    codeSnippet: `#include <stdio.h>

int main() {
    int nums[] = {10, 20, 30, 40};
    int *ptr = nums;
    
    printf("%d", *(ptr + 2));
    return 0;
}`,
    explanation: '`*(ptr + i)` increments the pointer by `i * sizeof(type)` bytes, matching array index `nums[i]`.',
    visualExplanation: '`ptr + 2` moves pointer forward by 2 integers (8 bytes) -> points to `30`.',
    hint: 'Index 0 is 10, Index 1 is 20, Index 2 is...?',
    tryItCode: `#include <stdio.h>
int main() {
    int nums[] = {10, 20, 30, 40};
    int *ptr = nums;
    printf("Result: %d\\n", *(ptr + 2));
    return 0;
}`,
    question: {
      prompt: 'What will `printf("%d", *(ptr + 2))` output?',
      options: [
        { id: 'a', text: '10' },
        { id: 'b', text: '20' },
        { id: 'c', text: '30' },
        { id: 'd', text: '40' },
      ],
      answerId: 'c',
      explanation: '`*(ptr + 2)` dereferences the 3rd element in the array (`nums[2]`), which is `30`.',
    },
  },

  // ==================== C++ LESSONS ====================
  {
    id: 'cpp-1',
    languageId: 'cpp',
    title: 'References vs Pointers in C++',
    topic: 'Core C++',
    difficulty: 'Beginner',
    type: 'concept',
    xp: 20,
    author: 'Bjarne Student',
    codeSnippet: `#include <iostream>

void doubleVal(int& x) {
    x *= 2; // Direct reference modification
}

int main() {
    int score = 25;
    doubleVal(score);
    std::cout << score; // Prints 50
}`,
    explanation: 'Pass-by-reference (`int&`) passes an alias to the original variable without making a copy.',
    visualExplanation: '`int& x` is an alias for `score`. Changes inside `doubleVal` modify `score` directly!',
    hint: 'Does a reference create a copy of the argument or modify the caller variable directly?',
    tryItCode: `#include <iostream>
int main() {
    int num = 10;
    int& ref = num;
    ref += 5;
    std::cout << "num = " << num << std::endl;
    return 0;
}`,
    question: {
      prompt: 'Can a C++ reference (`int& ref`) be re-bound to a different variable after initialization?',
      options: [
        { id: 'a', text: 'Yes, using the = operator' },
        { id: 'b', text: 'No, references cannot be rebound' },
        { id: 'c', text: 'Only inside class constructors' },
        { id: 'd', text: 'Only if declared `const`' },
      ],
      answerId: 'b',
      explanation: 'C++ references are immutable aliases once bound upon initialization.',
    },
  },
  {
    id: 'cpp-2',
    languageId: 'cpp',
    title: 'RAII & Smart Pointers (std::unique_ptr)',
    topic: 'Modern C++',
    difficulty: 'Advanced',
    type: 'multiple_choice',
    xp: 35,
    author: 'Modern C++ Lead',
    codeSnippet: `#include <iostream>
#include <memory>

class Resource {
public:
    Resource() { std::cout << "Acquired\\n"; }
    ~Resource() { std::cout << "Released\\n"; }
};

int main() {
    auto ptr = std::make_unique<Resource>();
    // Automatic cleanup when scope ends!
}`,
    explanation: '`std::unique_ptr` manages sole ownership of a dynamically allocated object, invoking `delete` automatically on scope exit.',
    visualExplanation: 'RAII (Resource Acquisition Is Initialization) prevents memory leaks automatically when destructor runs.',
    hint: 'How many owners can a `std::unique_ptr` have simultaneously?',
    tryItCode: `#include <iostream>
#include <memory>
int main() {
    std::unique_ptr<int> p = std::make_unique<int>(100);
    std::cout << "Value: " << *p << std::endl;
    return 0;
}`,
    question: {
      prompt: 'What happens when you try to copy a `std::unique_ptr` using assignment (`ptr2 = ptr1`)?',
      options: [
        { id: 'a', text: 'Deep copy is created' },
        { id: 'b', text: 'Compile-time Error (Copy constructor is deleted)' },
        { id: 'c', text: 'Both pointers share ownership' },
        { id: 'd', text: 'Runtime NullPointerException' },
      ],
      answerId: 'b',
      explanation: '`std::unique_ptr` enforces single ownership and cannot be copied; it can only be moved (`std::move`).',
    },
  },

  // ==================== JAVA LESSONS ====================
  {
    id: 'java-1',
    languageId: 'java',
    title: 'Java Streams API & Filter',
    topic: 'Functional Java',
    difficulty: 'Intermediate',
    type: 'code_example',
    xp: 30,
    author: 'JVM Specialist',
    codeSnippet: `import java.util.*;
import java.util.stream.*;

List<String> names = List.of("Alice", "Bob", "Charlie", "Anna");

List<String> aNames = names.stream()
    .filter(n -> n.startsWith("A"))
    .collect(Collectors.toList());

System.out.println(aNames);`,
    explanation: 'Java Streams process data collections declaratively. `filter()` returns items matching a boolean predicate.',
    visualExplanation: '`["Alice", "Bob", "Charlie", "Anna"]` -> `filter(starts with A)` -> `["Alice", "Anna"]`.',
    hint: 'Intermediate operations in Java Streams like `filter()` execute lazily until a terminal operation is called.',
    tryItCode: `List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);
List<Integer> evens = nums.stream().filter(n -> n % 2 == 0).collect(Collectors.toList());
System.out.println("Evens: " + evens);`,
    question: {
      prompt: 'What will `System.out.println(aNames)` output?',
      options: [
        { id: 'a', text: '[Alice, Bob, Charlie, Anna]' },
        { id: 'b', text: '[Alice, Anna]' },
        { id: 'c', text: '[Bob, Charlie]' },
        { id: 'd', text: '[]' },
      ],
      answerId: 'b',
      explanation: '`filter()` selects names starting with "A": "Alice" and "Anna".',
    },
  },
  {
    id: 'java-2',
    languageId: 'java',
    title: 'String Immutability & Pool',
    topic: 'Core OOP',
    difficulty: 'Beginner',
    type: 'find_bug',
    xp: 25,
    author: 'Java Architect',
    codeSnippet: `String s1 = "Hello";
String s2 = "Hello";
String s3 = new String("Hello");

System.out.println(s1 == s2); // true (String Pool)
System.out.println(s1 == s3); // false (Different objects!)`,
    explanation: '`==` compares memory references, while `.equals()` compares actual string content.',
    visualExplanation: '`==` checks Reference Identity. `.equals()` checks String Character Content value.',
    hint: 'Always use `.equals()` for string content comparisons in Java!',
    tryItCode: `String a = new String("Code");
String b = new String("Code");
System.out.println("a == b: " + (a == b));
System.out.println("a.equals(b): " + a.equals(b));`,
    question: {
      prompt: 'Which method should ALWAYS be used to compare text value equality between two Java Strings?',
      options: [
        { id: 'a', text: '==' },
        { id: 'b', text: '.equals()' },
        { id: 'c', text: '.compareToReference()' },
        { id: 'd', text: '.isSame()' },
      ],
      answerId: 'b',
      explanation: '`.equals()` compares string content, whereas `==` checks if references point to the exact same object location.',
    },
  },
];
