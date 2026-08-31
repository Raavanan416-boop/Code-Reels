/**
 * High-quality Dataset for PREDICT OUTPUT Mode
 * Contains curated questions covering:
 * - Variables
 * - Operators
 * - if/else
 * - loops
 * - arrays
 * - strings
 * - functions
 * - basic recursion
 *
 * Supported Languages: C, C++, Python, Java, JavaScript
 */

export const TOPICS = [
  'All Topics',
  'Variables',
  'Operators',
  'if/else',
  'loops',
  'arrays',
  'strings',
  'functions',
  'basic recursion',
];

export const OUTPUT_QUESTIONS = [
  // ==================== JAVASCRIPT ====================
  {
    id: 'out-js-1',
    languageId: 'javascript',
    language: 'JavaScript',
    topic: 'basic recursion',
    difficulty: 'Intermediate',
    xp: 25,
    title: 'Recursive Countdown Sum',
    codeSnippet: `function sumDown(n) {
  if (n <= 0) return 0;
  return n + sumDown(n - 2);
}

console.log(sumDown(5));`,
    prompt: 'What will be the output?',
    options: [
      { id: 'a', text: '15' },
      { id: 'b', text: '9' },
      { id: 'c', text: '5' },
      { id: 'd', text: 'RangeError: Maximum call stack size exceeded' },
    ],
    answerId: 'b',
    expectedOutput: '9',
    stepByStepExplanation: `Call Stack Execution Trace:
1. sumDown(5) -> returns 5 + sumDown(3)
2. sumDown(3) -> returns 3 + sumDown(1)
3. sumDown(1) -> returns 1 + sumDown(-1)
4. sumDown(-1) -> base case (n <= 0) triggers, returns 0

Unwinding the stack:
sumDown(-1) = 0
sumDown(1)  = 1 + 0 = 1
sumDown(3)  = 3 + 1 = 4
sumDown(5)  = 5 + 4 = 9`,
    whyIncorrect: {
      a: '15 is the sum of ALL integers from 1 to 5 (1+2+3+4+5). Notice the step is n - 2, skipping even numbers.',
      c: '5 is just the initial argument n, ignoring the recursive accumulation.',
      d: 'Stack overflow does NOT occur because the base case n <= 0 is reached at n = -1.',
    },
  },

  {
    id: 'out-js-2',
    languageId: 'javascript',
    language: 'JavaScript',
    topic: 'Operators',
    difficulty: 'Beginner',
    xp: 20,
    title: 'Coercion & Logical Operators',
    codeSnippet: `const a = "5";
const b = 2;

console.log(a + b);
console.log(a - b);`,
    prompt: 'What will be the output?',
    options: [
      { id: 'a', text: '"52" followed by 3' },
      { id: 'b', text: '7 followed by 3' },
      { id: 'c', text: '"52" followed by "5-2"' },
      { id: 'd', text: 'NaN followed by NaN' },
    ],
    answerId: 'a',
    expectedOutput: `"52"
3`,
    stepByStepExplanation: `Line-by-line analysis:
1. "5" + 2: The + operator coerces number 2 to string "2" (string concatenation) -> "52".
2. "5" - 2: The - operator only exists for numeric subtraction, so string "5" is coerced to number 5 -> 5 - 2 = 3.`,
    whyIncorrect: {
      b: '7 assumes numeric addition for +, but + with a string operand performs string concatenation.',
      c: '- does not concatenate strings in JavaScript; it forces numeric conversion.',
      d: '"5" is a valid numeric string, so "5" - 2 does not evaluate to NaN.',
    },
  },

  {
    id: 'out-js-3',
    languageId: 'javascript',
    language: 'JavaScript',
    topic: 'arrays',
    difficulty: 'Intermediate',
    xp: 25,
    title: 'Array Map & Sparse Array',
    codeSnippet: `const nums = [1, 2, 3];
nums[5] = 10;

console.log(nums.length);
console.log(nums[3]);`,
    prompt: 'What will be the output?',
    options: [
      { id: 'a', text: '4 followed by 10' },
      { id: 'b', text: '6 followed by undefined' },
      { id: 'c', text: '4 followed by undefined' },
      { id: 'd', text: '6 followed by null' },
    ],
    answerId: 'b',
    expectedOutput: `6
undefined`,
    stepByStepExplanation: `Trace:
1. nums starts as [1, 2, 3] (length 3, indices 0..2).
2. Assigning nums[5] = 10 sparse-expands the array to length 6 (indices 0..5).
3. nums.length becomes 6.
4. Index 3 was never assigned, so nums[3] evaluates to undefined.`,
    whyIncorrect: {
      a: 'The array length adjusts to max_index + 1 (5 + 1 = 6), not 4.',
      c: 'Length is 6 because assigning at index 5 pads indices 3 and 4 as empty slots.',
      d: 'Unassigned array indices in JavaScript evaluate to undefined, not null.',
    },
  },

  // ==================== PYTHON ====================
  {
    id: 'out-py-1',
    languageId: 'python',
    language: 'Python',
    topic: 'loops',
    difficulty: 'Beginner',
    xp: 20,
    title: 'For-Else Loop Execution',
    codeSnippet: `for i in range(3):
    if i == 5:
        break
else:
    print("Loop Completed")`,
    prompt: 'What will be the output?',
    options: [
      { id: 'a', text: 'Nothing is printed' },
      { id: 'b', text: '"Loop Completed"' },
      { id: 'c', text: 'SyntaxError: else without if' },
      { id: 'd', text: '"Loop Completed" printed 3 times' },
    ],
    answerId: 'b',
    expectedOutput: 'Loop Completed',
    stepByStepExplanation: `Python For-Else Behavior:
1. range(3) produces i = 0, 1, 2.
2. i == 5 is NEVER true, so the break statement never executes.
3. In Python, a loop's else block executes when the loop finishes naturally without encountering a break.
4. Therefore, "Loop Completed" is printed once.`,
    whyIncorrect: {
      a: 'The loop completes naturally without break, so the else block triggers.',
      c: 'for...else is valid Python syntax introduced to handle search loops.',
      d: 'The else block is associated with the for loop as a whole, not repeated per iteration.',
    },
  },

  {
    id: 'out-py-2',
    languageId: 'python',
    language: 'Python',
    topic: 'strings',
    difficulty: 'Intermediate',
    xp: 25,
    title: 'String Slicing with Negative Step',
    codeSnippet: `text = "CodeSwipe"
print(text[::-2])`,
    prompt: 'What will be the output?',
    options: [
      { id: 'a', text: '"epiwSedoC"' },
      { id: 'b', text: '"eiSdo"' },
      { id: 'c', text: '"CoSw"' },
      { id: 'd', text: '"eSdo"' },
    ],
    answerId: 'b',
    expectedOutput: 'eiSdo',
    stepByStepExplanation: `String Slicing [start:stop:step]:
1. Step is -2: Reverses direction and steps backwards by 2 characters.
2. Original: C(0) o(1) d(2) e(3) S(4) w(5) i(6) p(7) e(8).
3. Reversing with step 2 takes indices 8('e'), 6('i'), 4('S'), 2('d'), 0('C').
4. Resulting string: "eiSdo".`,
    whyIncorrect: {
      a: '::-1 reverses completely with step 1. Step -2 skips every other character.',
      c: 'Positive step ::2 would produce "CoSw".',
      d: 'Misses the first character C at index 0.',
    },
  },

  {
    id: 'out-py-3',
    languageId: 'python',
    language: 'Python',
    topic: 'basic recursion',
    difficulty: 'Advanced',
    xp: 30,
    title: 'Recursive Power Calculation',
    codeSnippet: `def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)

print(power(2, 4))`,
    prompt: 'What will be the output?',
    options: [
      { id: 'a', text: '8' },
      { id: 'b', text: '16' },
      { id: 'c', text: '32' },
      { id: 'd', text: '0' },
    ],
    answerId: 'b',
    expectedOutput: '16',
    stepByStepExplanation: `Trace:
power(2, 4) = 2 * power(2, 3)
power(2, 3) = 2 * power(2, 2)
power(2, 2) = 2 * power(2, 1)
power(2, 1) = 2 * power(2, 0)
power(2, 0) = 1 (base case)

Unwinding: 2 * 2 * 2 * 2 * 1 = 16.`,
    whyIncorrect: {
      a: '8 is 2 * 4 (multiplication), whereas this computes 2⁴ = 16.',
      c: '32 would be 2⁵.',
      d: 'Base case returns 1, so the result is multiplied by 1, not 0.',
    },
  },

  // ==================== C ====================
  {
    id: 'out-c-1',
    languageId: 'c',
    language: 'C',
    topic: 'Variables',
    difficulty: 'Intermediate',
    xp: 25,
    title: 'Static Variable Lifetime',
    codeSnippet: `#include <stdio.h>

void counter() {
    static int count = 5;
    count++;
    printf("%d ", count);
}

int main() {
    counter();
    counter();
    counter();
    return 0;
}`,
    prompt: 'What will be the output?',
    options: [
      { id: 'a', text: '6 6 6' },
      { id: 'b', text: '6 7 8' },
      { id: 'c', text: '5 5 5' },
      { id: 'd', text: 'Compilation Error' },
    ],
    answerId: 'b',
    expectedOutput: '6 7 8',
    stepByStepExplanation: `Static Keyword in C:
1. static int count = 5; initializes count ONCE during program compilation.
2. Call 1: count becomes 6 -> prints 6.
3. Call 2: count is retained as 6, increments to 7 -> prints 7.
4. Call 3: count is retained as 7, increments to 8 -> prints 8.
Output: "6 7 8".`,
    whyIncorrect: {
      a: 'Automatic (non-static) variables re-initialize to 5 on every call, yielding 6 6 6. Static variables persist across calls.',
      c: 'Increments happen before printing (count++).',
      d: 'static int count is valid ANSI C.',
    },
  },

  {
    id: 'out-c-2',
    languageId: 'c',
    language: 'C',
    topic: 'if/else',
    difficulty: 'Beginner',
    xp: 20,
    title: 'Ternary Operator Precedence',
    codeSnippet: `#include <stdio.h>

int main() {
    int x = 10, y = 20;
    int max = (x > y) ? x : y;
    printf("Max: %d", max);
    return 0;
}`,
    prompt: 'What will be the output?',
    options: [
      { id: 'a', text: 'Max: 10' },
      { id: 'b', text: 'Max: 20' },
      { id: 'c', text: 'Max: 0' },
      { id: 'd', text: 'Compiler Warning' },
    ],
    answerId: 'b',
    expectedOutput: 'Max: 20',
    stepByStepExplanation: `Ternary Evaluation:
1. Condition (x > y) is (10 > 20), which evaluates to false (0).
2. The ternary returns the false expression y (20).
3. max gets value 20.
4. Output: "Max: 20".`,
    whyIncorrect: {
      a: '10 is x, which would be chosen if x > y was true.',
      c: 'Neither operand is 0.',
      d: 'The ternary expression is standard C code.',
    },
  },

  // ==================== C++ ====================
  {
    id: 'out-cpp-1',
    languageId: 'cpp',
    language: 'C++',
    topic: 'functions',
    difficulty: 'Intermediate',
    xp: 25,
    title: 'Pass-by-Value vs Pass-by-Reference',
    codeSnippet: `#include <iostream>

void modify(int a, int& b) {
    a += 10;
    b += 10;
}

int main() {
    int x = 5, y = 5;
    modify(x, y);
    std::cout << x << " " << y;
    return 0;
}`,
    prompt: 'What will be the output?',
    options: [
      { id: 'a', text: '15 15' },
      { id: 'b', text: '5 15' },
      { id: 'c', text: '15 5' },
      { id: 'd', text: '5 5' },
    ],
    answerId: 'b',
    expectedOutput: '5 15',
    stepByStepExplanation: `Trace:
1. x is passed by value (int a): a copy is made. a becomes 15 inside modify, but x in main remains 5.
2. y is passed by reference (int& b): b is an alias for y. b += 10 modifies y directly from 5 to 15.
3. main prints x (5) and y (15).`,
    whyIncorrect: {
      a: 'Assumes x was also passed by reference.',
      c: 'Reverses the parameter order (value vs reference).',
      d: 'Assumes neither variable was modified.',
    },
  },

  // ==================== JAVA ====================
  {
    id: 'out-java-1',
    languageId: 'java',
    language: 'Java',
    topic: 'strings',
    difficulty: 'Beginner',
    xp: 20,
    title: 'String Immutability Substring',
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        String str = "CodeSwipe";
        str.substring(4);
        System.out.println(str);
    }
}`,
    prompt: 'What will be the output?',
    options: [
      { id: 'a', text: 'Swipe' },
      { id: 'b', text: 'CodeSwipe' },
      { id: 'c', text: 'Code' },
      { id: 'd', text: 'StringIndexOutOfBoundsException' },
    ],
    answerId: 'b',
    expectedOutput: 'CodeSwipe',
    stepByStepExplanation: `Java String Immutability:
1. Strings in Java are immutable! Calling str.substring(4) returns a NEW string ("Swipe").
2. But the return value is NOT assigned back to str.
3. str continues to reference the original string "CodeSwipe".
4. System.out.println(str) prints "CodeSwipe".`,
    whyIncorrect: {
      a: '"Swipe" is returned by substring(4), but it was never stored (e.g. str = str.substring(4)).',
      c: '"Code" would be str.substring(0, 4).',
      d: 'Index 4 is valid (length is 9).',
    },
  },

  {
    id: 'out-java-2',
    languageId: 'java',
    language: 'Java',
    topic: 'basic recursion',
    difficulty: 'Advanced',
    xp: 35,
    title: 'Recursive Fibonacci Sum',
    codeSnippet: `public class Main {
    static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        System.out.println(fib(6));
    }
}`,
    prompt: 'What will be the output?',
    options: [
      { id: 'a', text: '5' },
      { id: 'b', text: '8' },
      { id: 'c', text: '13' },
      { id: 'd', text: '6' },
    ],
    answerId: 'b',
    expectedOutput: '8',
    stepByStepExplanation: `Fibonacci Sequence Trace (0-indexed):
n=0 -> 0
n=1 -> 1
n=2 -> 1 (0+1)
n=3 -> 2 (1+1)
n=4 -> 3 (1+2)
n=5 -> 5 (2+3)
n=6 -> 8 (3+5)

fib(6) returns 8.`,
    whyIncorrect: {
      a: '5 is fib(5).',
      c: '13 is fib(7).',
      d: '6 is just argument n, not the 6th Fibonacci number.',
    },
  },
];
