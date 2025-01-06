---
title: Tests as a Programming Language Learning Tool
description: Learning to use the available testing tools is an excellent first step when getting familiar with a new programming language, allowing you to more quickly determine correctness and add features or refactor, skills which you will benefit from greatly as you become productive with the language you are learning.
published: 2024-03-28T18:02:21+0000
updated: 2024-03-28T22:03:53+0000
tags: ['Code', 'Development', 'Skills: Technical']
---

Most "hello world" programs for getting started with a language will have you log
something to the console/terminal window. Though this can be useful to see what your
program is doing as you dip your toes in, asserting program correctness is going
to get clunky and messy if you rely on this as the program becomes more complex and
you continue to add new features. As a former QA engineer my bias is showing, but
I believe learning to automate tests to verify correctness of code you write is one
of the most valuable skills you can sharpen as a software engineer. It proves things
are working as intended while documenting how they are expected to work, which will
allow you or other engineers to more easily refactor things later, should the need
arise.

Instead of relying on logging when getting started with a new language, I'm going
to propose a more pragmatic approach to getting up to speed: learn to write tests
with the language's provided testing utilities. Learning this will benefit you in
a few ways:

- You'll be thinking in terms of how to write code that is testable. Regardless of
  language, this tends to help you author more modular, easy-to-change code.
- You'll be able to quickly iterate on your code and rerun tests to verify it does
  what you think it does, allowing you to experiment with different approaches without
  getting bogged down with what you should or should not be logging, how to format
  what you're logging, etc.
- You'll know how to structure your project in a way that facilitates being able
  to write and run tests, instead of going through a lot of pain later trying to
  figure out how to tack them on. Bolting on quality assurance at the tail end of
  the SDLC is a big no-no 👎
- You'll be writing more code in the language you're learning to implement the tests
  themselves, which will help you build up some muscle memory and build familiarity
  with standard libraries and such. (I know, AI is gonna take over the world and
  you can just tell it what you want written... go try and run some Rust written
  by ChatGPT and get back to me on that. Furthermore, be aware that [code from developers
  with access to AI assistance may be significantly less secure than code from those
  without it](https://arxiv.org/abs/2211.03622), so you still need to know your
  shit.)

## Test Harness Demos

With all of the above in mind, I'd like to share some tips on how to scaffold out
a simple project that can be used to learn a language this way (or just run experiments
quickly in a language you already know). For now I'll focus on TypeScript, Go and
Rust, but may add other language examples to this page later. The same simple functionality
will be implemented for each language: a function that accepts an array of integers
and detects if there is a duplicate. If you follow along with these examples, I encourage
you to break things on purpose (comment out lines, return incorrect values, etc.)
and rerun the tests to see how the output changes.

I'll go on a short tangent here to describe what prompted me to learn new languages
this way, so if you're not a fan of story time you can skip ahead to the language-specific
examples. OK, story time:

I was recently affected by some restructuring at my previous company, and found myself
in the unenviable position of a software engineer competing for remote work at the
national level. Though I'm confident in my abilities, potential employers have no
reason to be until I've proven it somehow. Thus, I am beginning the "LeetCode grind"
to prepare for whiteboard interviews and am also learning a couple of new languages
to provide more value as a backend engineer. As part of these studies, I wanted to
be able to write and run code locally on my machine to work on practice problems
and verify my code's correctness with unit tests. That way when I go to work on actual
projects, I'm not just familiar with the language but also up to speed on how to
read/write/run tests and equipped to write reliable software that can be shipped
frequently without regressions.

### Language Example: TypeScript

For TypeScript, I opted to use the [Bun](https://bun.sh/) runtime instead of Node,
given Bun's out-of-the-box support for TypeScript. I didn't want to spend any time
fighting to get TS configs working to be able to run scripts in Node, but do prefer
strongly typed code to raw JS. That said, one caveat here is that if you're relying
on Node standard libs that are in some way different from Bun's, you may need to
fight that battle to get a project going.

It's pretty easy to scaffold a project once you've got the runtime installed:

```shell
mkdir <PROJECT_NAME>
cd <PROJECT_NAME>
bun init
```

From there, you can add `.test.ts` files where tests will be written. In this example,
I've added a file at `src/arrays/containsDuplicate.test.ts`

```typescript
// Import testing tools provided by the Bun runtime
import { describe, expect, test } from 'bun:test';

/**
 * Write a function we expect will do something. In this case, we will
 *   provide an array of numbers, and expect to receive a boolean that
 *   evaluates to `true` if any duplicates are found.
 */
function containsDuplicate(nums: number[]): boolean {
  const seen: Record<number, true> = {};

  for (const n of nums) {
    if (seen[n]) {
      return true;
    }

    seen[n] = true;
  }

  return false;
}

// Write some tests!
describe('arrays: containsDuplicate', () => {
  test('has duplicate', () => {
    expect(containsDuplicate([1, 2, 3, 1])).toBe(true);
  });

  test('has duplicates', () => {
    expect(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])).toBe(true);
  });

  test('does not have duplicates', () => {
    expect(containsDuplicate([1, 2, 3, 4])).toBe(false);
  });
});
```

Normally, your functions under test would not live in the same file as the tests
themselves, as is the case with `containsDuplicate` above. You'd write the function
in another module and import it instead. In this demo, the function is declared in
the same file to keep things simple.

Now, with tests written, you can run them:

```shell
bun test
```

You can learn more about options such as filtering, watch mode, etc. for this command
in [Bun's documentation](https://bun.sh/docs/cli/test). Without changing anything
from the above code, here's what you should see:

```shell
bun test v1.0.35 (940448d6)

src/arrays/containsDuplicate.test.ts:
✓ arrays: containsDuplicate > has duplicate [0.30ms]
✓ arrays: containsDuplicate > has duplicates [0.05ms]
✓ arrays: containsDuplicate > does not have duplicates [0.03ms]

 3 pass
 0 fail
 3 expect() calls
Ran 3 tests across 1 files. [59.00ms]
```

Nice! Notice how we don't have any `console.log` statements, but can easily verify
which inputs our function correctly handles, and are in a good position to be able
to refactor if desired.

### Language Example: Go

<div class="alert alert-info">
  <p class="text-end">Edit</p>
  <p>Shortly after publishing my post, I came across a very thorough tutorial, <a href="https://quii.gitbook.io/learn-go-with-tests" target="_blank">Learn Go with Tests</a>. It's much more in depth than what I cover here, so if you're hungry for more Go in particular I recommend checking it out.</p>
</div>

I'm very new to Go, so if you spot anything wacky in my setup I am open to being
rebuked! Here's how I got it up and running. Assuming you have Go installed on your
machine, initialize a project:

```shell
mkdir <PROJECT_NAME>
cd <PROJECT_NAME>
go mod init github.com/<GITHUB_USERNAME>/<REPO_NAME>
```

In case it's not clear, if you're not using GitHub to host your repo, you'd use a
different module path. If you're going to keep the code on your machine locally with
no intention of pushing it anywhere, you can always just use a dummy path like `example.com/my-module`.

With the module initialized, you can now add a package. You can learn more about
[how to use the Go testing package in their docs](https://pkg.go.dev/testing). In
this example, I've created a file at `arrays/contains_duplicate_test.go`, with the
following contents:

```go
// Name this file as a package
package contains_duplicate_test

// Import testing tools provided by the testing package
import (
 "testing"
)

/**
 * Write a function we expect will do something. In this case, we will
 *   provide an array of numbers, and expect to receive a boolean that
 *   evaluates to `true` if any duplicates are found.
 */
func ContainsDuplicate(nums []int) bool {
 mapped := make(map[int]bool)

 for _, n := range nums {
  if mapped[n] {
   return true
  }

  mapped[n] = true
 }

 return false
}

// Write some tests!
func TestHasDuplicate(t *testing.T) {
 got := ContainsDuplicate([]int{1, 2, 3, 1})
 if !got {
  t.Error("should be true:", got)
 }
}

func TestHasDuplicates(t *testing.T) {
 got := ContainsDuplicate([]int{1, 1, 1, 3, 3, 4, 3, 2, 4, 2})
 if !got {
  t.Error("should be true:", got)
 }
}

func TestDoesNotHaveDuplicates(t *testing.T) {
 got := ContainsDuplicate([]int{1, 2, 3, 4})
 if got {
  t.Error("should be false:", got)
 }
}
```

Normally, your functions under test would not live in the same file as the tests
themselves, as is the case with `ContainsDuplicate` above. You'd write the function
in another file and import it instead. In this demo, the function is declared in
the same file to keep things simple.

Now, with tests written, you can run them:

```shell
go test ./arrays/contains_duplicate_test.go
```

You can learn more about options for this command in [Go's documentation](https://pkg.go.dev/cmd/go#hdr-Test_packages)
or by running `go test help`. Without changing anything from the above code, here's
what you should see:

```shell
ok      command-line-arguments  0.767s
```

Right on! Notice how we don't have any `fmt.Println` statements but can still verify
our code works, and are in a good position to be able to refactor if desired.

### Language Example: Rust

I've been dabbling in Rust for a while now but am not proficient yet, so if you spot
anything wacky in my setup I am open to being admonished!

As an aside: Rust is the language I have enjoyed learning most aside from TS. Part
of what thrills me about it is that it has challenged me in ways that other languages
I've used before (e.g. JS, TS, Ruby, Python, PHP) have not, because it forces one
to think much more deeply about how data is being managed in memory and what the
implications are for accessing variables and values at runtime. It's such a nifty
language! I hope that someday in the near future I'll get to actually build some
useful things with it.

Here's how I got it up and running. Assuming you have Rust/Cargo installed on your
machine, initialize a lib crate:

```shell
mkdir <PROJECT_NAME>
cd <PROJECT_NAME>
cargo init --lib
```

In this example I wanted to be able to write code as if it were functions available
from a library, not an actual program that runs, so I included the `--lib` argument.
You may decide to structure your test harness project(s) differently.

At this point, Cargo has conveniently added an example of how a test case would be
written in the `src/lib.rs` file. I went ahead and cleared out all the contents of
`lib.rs`, since it's easier for the sake of this language learning exercise to write
tests under the `tests` folder.

With the crate initialized, you can now add test modules. In this example, I've created
a few files:

- `tests/tests.rs` which will import the `arrays` testing module
- `tests/arrays/mod.rs` which will import all test modules from the `arrays` folder
- `tests/arrays/contains_duplicate.rs` which is where our demo test will be written

Here's what goes into each file.

#### `tests/tests.rs`

```rust
mod arrays;
```

#### `tests/arrays/mod.rs`

```rust
mod contains_duplicate;
```

#### `tests/arrays/contains_duplicate.rs`

```rust
/**
 * Write a function we expect will do something. In this case, we will
 *   provide an array of numbers, and expect to receive a boolean that
 *   evaluates to `true` if any duplicates are found.
 */
fn contains_duplicate(arr: &[i32]) -> bool {
    let mut seen = std::collections::HashSet::new();

    for &num in arr {
        if !seen.insert(num) {
            return true;
        }
    }

    false
}

// Write some tests!
#[test]
fn contains_duplicate_when_duplicate_present() {
    assert!(contains_duplicate(&[1, 2, 3, 1]))
}

#[test]
fn contains_duplicate_when_duplicates_present() {
    assert!(contains_duplicate(&[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]))
}

#[test]
fn contains_duplicate_when_no_duplicates_present() {
    assert!(!contains_duplicate(&[1, 2, 3, 4]))
}
```

Normally, your functions under test would not live in modules in the `tests` folder
as is the case with `contains_duplicate` above. You'd write the functions in the
`lib` and import it into these test files instead. In the demo, the function is declared
in the same file to keep things simple.

The Rust example a little bit more involved than writing tests in other languages,
so let's review some of what's going on here before running the tests.

In order to be able to run individual test files from the command line, [we're authoring
them as "integration tests" that are external to the library, which allows Cargo
to compile each test file as an individual crate](https://doc.rust-lang.org/book/ch11-03-test-organization.html#integration-tests).
For the purposes of this tutorial, we just have a monolithic "crate" specified by
`tests/tests.rs`. That crate is importing the `arrays` module, and thus any tests
that are written into the `arrays` module. Similarly, the `arrays` module is importing
modules that are in the `arrays` directory.

For now we only have the `arrays` module and its child `contains_duplicate` module.
If we added more `.rs` files under `tests/arrays`, we'd need to declare those modules
as included in the `tests/arrays/mod.rs` if we want them to run in the test suite.
Similarly if we added a new submodule folder such as `tests/strings`, we'd need a
`test/strings/mod.rs` file and to declare that module as included in the `tests/tests.rs`
file.

Perhaps as I begin moving along on my learning journey I'll find or write a nifty
little script to handle the tedium of declaring each new file as included in its
parent module, but hopefully all of this at least makes sense for now.

With all of that out of the way, we're ready to run tests. To run tests for the `arrays::contains_duplicate`
module:

```shell
cargo test arrays::contains_duplicate
```

You can learn more about options for this command in [Rust's documentation](https://doc.rust-lang.org/cargo/commands/cargo-test.html)
or by running `cargo test --help`. Without changing anything from the above code,
here's what you should see:

```shell
   Compiling leetcode_rust v0.1.0 (/Users/jb/Repos/rust/leetcode_rust)
    Finished test [unoptimized + debuginfo] target(s) in 0.61s
     Running unittests src/lib.rs (target/debug/deps/leetcode_rust-b2231803eb8049e1)

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

     Running tests/tests.rs (target/debug/deps/tests-4efc5d223fa6cb0c)

running 3 tests
test arrays::contains_duplicate::contains_duplicate_when_duplicates_present ... ok
test arrays::contains_duplicate::contains_duplicate_when_duplicate_present ... ok
test arrays::contains_duplicate::contains_duplicate_when_no_duplicates_present ... ok

test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

Wowza! 🤩 That may have been a little more effort than in the other languages covered
so far, but how incredibly rewarding! Notice how we don't have any `println` statements
but can still verify our code works, and are in a good position to be able to refactor
if desired.

### Language Example: Python

<div class="alert alert-info">
  <p class="text-end">Edit</p>
  <p>The Python example was added a few hours after this post was initially published.</p>
</div>

I have not used Python extensively for several years so my code is bound to be atrocious,
rebuke away!

Setting up the Python project is dead simple, assuming you already have Python installed:

```shell
mkdir <PROJECT_NAME>
cd <PROJECT_NAME>
mkdir -p tests/arrays
touch tests/arrays/contains_duplicate.py
```

In `tests/arrays/contains_duplicate.py`, add the following content:

```python
import unittest

def contains_duplicate(nums):
  seen = {}

  for n in nums:
    if seen.get(n):
      return True

    seen[n] = True

  return False

class TestContainsDuplicate(unittest.TestCase):
  def test_has_duplicate(self):
    self.assertTrue(contains_duplicate([1, 2, 3, 1]))

  def test_has_duplicates(self):
    self.assertTrue(contains_duplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]))

  def test_does_not_have_duplicates(self):
    self.assertFalse(contains_duplicate([1, 2, 3, 4]))

if __name__ == '__main__':
  unittest.main()
```

As mentioned in other language examples, your functions under test would not normally
live in the same file as the tests themselves, as is the case with `contains_duplicate`
above. You'd write the function in another file and import it instead. In this demo,
the function is declared in the same file to keep things simple.

To run test files, just execute them with python, as so:

```shell
python tests/arrays/contains_duplicate.py
```

Easy peasy! Notice how we don't have any `print` statements but can still verify
our code works, and are in a good position to be able to refactor if desired.

## Wrapping Up

I have enjoyed dipping my toes into new languages while solving coding challenges,
and am glad to know how to run tests in each new language I'm learning. I hope you
have learned something new and are confident to begin writing tests as part of your
adoption of any of the languages I've covered here. Thanks for reading!
