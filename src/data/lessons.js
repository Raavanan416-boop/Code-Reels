export const SAMPLE_LESSONS = [
  {
    id: 'py-1',
    languageId: 'python',
    title: 'Python List Comprehensions',
    summary: 'Write cleaner loops in a single line of Python code.',
    type: 'concept',
    xp: 15,
    author: 'CodeSwipe Crew',
    codeSnippet: `# Traditional Way
squares = []
for x in range(5):
    squares.append(x**2)

# Pythonic Way ✨
squares = [x**2 for x in range(5)]
print(squares) # [0, 1, 4, 9, 16]`,
    explanation: 'List comprehension provides a concise syntax to create lists based on existing iterables.',
    question: {
      prompt: 'What does `[x for x in range(3)]` evaluate to in Python?',
      options: [
        { id: 'a', text: '[0, 1, 2]' },
        { id: 'b', text: '[1, 2, 3]' },
        { id: 'c', text: '[0, 1, 2, 3]' },
        { id: 'd', text: 'Error' },
      ],
      answerId: 'a',
      explanation: 'range(3) produces numbers 0, 1, 2.',
    },
  },
  {
    id: 'js-1',
    languageId: 'javascript',
    title: 'Arrow Functions & Lexical This',
    summary: 'Master ES6 arrow function syntax and how it preserves scope context.',
    type: 'concept',
    xp: 20,
    author: 'Alex River',
    codeSnippet: `// Arrow function syntax
const add = (a, b) => a + b;

// Implicit return with object
const makeUser = (name) => ({ name, role: 'Dev' });

console.log(makeUser('Kavir'));`,
    explanation: 'Arrow functions don’t have their own `this` binding, making them perfect for callbacks.',
    question: {
      prompt: 'Which statement about arrow functions is TRUE?',
      options: [
        { id: 'a', text: 'They cannot be stored in variables' },
        { id: 'b', text: 'They do not bind their own `this` keyword' },
        { id: 'c', text: 'They require explicit `return` for single line expressions' },
        { id: 'd', text: 'They only work inside classes' },
      ],
      answerId: 'b',
      explanation: 'Arrow functions capture `this` from the enclosing lexical context.',
    },
  },
  {
    id: 'cpp-1',
    languageId: 'cpp',
    title: 'Pointers vs References in C++',
    summary: 'Understand memory addresses vs aliases in high-performance C++.',
    type: 'debug',
    xp: 25,
    author: 'C++ Master',
    codeSnippet: `#include <iostream>

void increment(int& val) {
    val++; // Direct modification via reference
}

int main() {
    int score = 42;
    increment(score);
    std::cout << score; // Prints 43
}`,
    explanation: 'References act as immutable aliases to existing variables without null pointer hazards.',
    question: {
      prompt: 'Can a C++ reference be reassigned to refer to another variable after initialization?',
      options: [
        { id: 'a', text: 'Yes, anytime using = operator' },
        { id: 'b', text: 'No, references are bound permanently upon initialization' },
        { id: 'c', text: 'Only if declared with `const`' },
        { id: 'd', text: 'Only inside loops' },
      ],
      answerId: 'b',
      explanation: 'Once initialized, a C++ reference cannot be rebound to a different object.',
    },
  },
  {
    id: 'java-1',
    languageId: 'java',
    title: 'Java Streams API & Filter',
    summary: 'Process collections declaratively with Java 8 Streams.',
    type: 'code',
    xp: 30,
    author: 'Java Guru',
    codeSnippet: `List<String> names = List.of("Alice", "Bob", "Charlie", "Anna");

List<String> aNames = names.stream()
    .filter(n -> n.startsWith("A"))
    .collect(Collectors.toList());

System.out.println(aNames); // [Alice, Anna]`,
    explanation: 'Streams provide functional-style operations on collections without mutating original data.',
    question: {
      prompt: 'Does calling stream().filter(...) execute immediately or evaluate lazily?',
      options: [
        { id: 'a', text: 'Executes immediately' },
        { id: 'b', text: 'Evaluates lazily until a terminal operation is called' },
        { id: 'c', text: 'Mutates original list directly' },
        { id: 'd', text: 'Throws Exception if empty' },
      ],
      answerId: 'b',
      explanation: 'Intermediate stream operations like filter() are lazy and only run when a terminal operation like collect() is invoked.',
    },
  },
  {
    id: 'c-1',
    languageId: 'c',
    title: 'Dynamic Memory: malloc() & free()',
    summary: 'Master Heap Allocation and avoid Memory Leaks in C.',
    type: 'concept',
    xp: 25,
    author: 'SysProg',
    codeSnippet: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int*) malloc(5 * sizeof(int));
    if (arr == NULL) return 1;

    arr[0] = 100;
    printf("%d\\n", arr[0]);

    free(arr); // Always free allocated memory!
    return 0;
}`,
    explanation: 'Every malloc() call must have a corresponding free() call to prevent memory leaks.',
    question: {
      prompt: 'What happens if you fail to call free() on malloc-allocated memory in C?',
      options: [
        { id: 'a', text: 'Garbage collector automatically frees it' },
        { id: 'b', text: 'Memory Leak occurs until process exits' },
        { id: 'c', text: 'Compiler error on build' },
        { id: 'd', text: 'Segmentation Fault instantly' },
      ],
      answerId: 'b',
      explanation: 'C does not have automatic garbage collection. Unfreed heap memory remains allocated until the process terminates.',
    },
  },
];
