<!---
this is a generated file, changes will be lost.
-->
[Fundamentals] | [Functions](./reference_02_functions.md) | [Events](./reference_03_events.md) | [Commands](./reference_04_commands.md) | [Properties](./reference_05_properties.md)



## Introduction

Welcome to ViperCard, an open source re-creation and re-imagination of 1987's HyperCard.

If you are new, the example videos will be helpful -- from the Help menu (the icon with a ? in the upper right corner of the screen), select "Examples & Tutorials".



## Fundamentals

All objects, including all buttons, fields, and cards, have an associated set of code called a "script."

Here is an example script:

```
on mouseUp
    answer "hello, world"
end mouseUp
```


If this script is placed in a button, and the Browse tool is chosen
(looks like a hand), the code will be run when the button is clicked.

A line of code beginning with -- is ignored.
This is often used to write explanatory comments.
It can also be used to temporarily "disable" some code.
You can press Cmd+Q in the script editor to quickly
comment-out or uncomment a line.


```
on mouseUp
    -- this line is a comment
    answer "hello, world"
end mouseUp
```



Indentation is not mandatory, but it is recommended for clarity.
The code editor will automatically add indentation
whenever you press Enter.

Statements must appear on separate lines.

The language is not case sensitive. "on mouseup" and 
"on mouseUp" are equivalent.

A long line of code can be continued with a backslash, e.g.


```
answer ("here is how to continue" & \
    "code across two lines")
```


A common data type is a string (a sequence of text).


```
put "abc" into x
```


Double-quotes ("), not single-quotes ('), must be used.
A string with length 0, "", is perfectly valid and used often to 
represent a missing value. You may see this referred to as 
an 'empty string'. You can easily test for an empty string 
with code like:

```
if x is "" then
    answer "empty string"
end if
```


To include a double-quote character in a string, use the quote constant,


```
answer (quote & "a" & quote) -- displays "a"
```


Valid numbers include 123, 123.456, and scientific notation like 
1.23e6 which means 1.23 multiplied by (10 to the 6th power).
Numbers can be in the range [-1e18, 1e18], if a number is 
taken outside this range a runtime error will be thrown.
Division by zero, logarithm of a negative, and so on will also 
cause a runtime error.

`sqrt(0.5)` is a function call meaning to take the square root 
of 0.5. `sqrt` is a built-in function, but we can also write a 
user-defined function. `sum(1, 2)` is a function call that 
adds 1 and 2 and returns 3. A comma separates the 
values sent. Function calls can be nested, for example,
`sum(1, sum(2, 3))`.

Buttons and fields are referred to as "objects".
Cards are also a type of object.
And, the entire project, referred to as a "stack", is an object.

A script can set properties of an object with syntax like:

```
set the width of cd btn "myBtn" to 450
```

One can also refer to an object by id:

```
set the width of cd btn id 1234 to 450
```


See the "set" command documentation for a list of properties 
that can be set.

When you are in the Browse tool and you interact with the page 
by clicking on buttons or pressing keystrokes, this causes 
messages to be fired.

If you click a button, and if that button has a script that happens
to have a function called "on mouseUp" defined, then the code in
that function will be run.



## Expressions

A set of computations such as `1+2+3+4` or 
`sqrt(0.5) + sqrt(0.6)` is an expression. Expressions can contain
any level of nested sub-expressions, for example,


```
sqrt(0.5)
sqrt(0.5 + sqrt(0.6))
sqrt(0.5 + sqrt(0.6 + sqrt(0.7)))
```

are all valid.

Parentheses are used to dictate the order of operations, since

```
3*(4+5)
```

gives a different answer than

```
(3*4)+5
```


Parentheses are also used for grouping an expression.
for example, we needed to get the (n + 1)th line of a 
variable, we would type `(line (n + 1) of x)`

Do not type something like

```
answer (line n + 1 of x) -- this is hard to read.
```

this is unclear, and will often cause syntax errors.


```
answer (line (n + 1) of x) -- this is preferred.
```


In the expression `2 + 3`, the symbol `+` is called an operator.

Here are the operators that can be used.

`2 * 3` (multiplication)



`2 / 3` (division)



`2 ^ 3` (raise to the third power)



`7 div 5` (truncated division)



`7 mod 5` (modulo)



`2 > 3` (greater than)



`2 < 3` (less than)



`2 >= 3` (greater than or equal to)



`2 <= 3` (less than or equal to)



`2  ==  3` (equal to)



`2  !=  3` (not equal to)



`"abc" is "def"` (equal to)



`"abc" is not "def"` (not equal to)



`2 + 3` (addition)



`2 - 3` (subtraction)



`&` and `&&` combine two strings (concatenation).

```
put "a" & "b" into x
answer x -- displays "ab"
put "a" && "b" into x
answer x -- displays "a b"
```


**Logical operators**

The constants 'true' and 'false' are used often.
Internally there is no distinct boolean type, but the strings 
"true" and "false" are interpreted as true and false respectively.

`true and false` (logical and)



`true or false` (logical or)



`not true` (logical not)



Logical operations are not guaranteed to be short-circuiting.
in other words,

```
put (true or myfunction()) into x
```

still will call `myfunction`, when it hypothetically could have 
been skipped.



## Variables

Use a statement like 


```
put 3 into x
```


to put the value "3" into a
variable named "x".

You don't need any line to declare x as a variable.

Variable names and function names are case insensitive.

Variable names cannot begin with a numeral, and can contain 
underscores but no other punctuation. Certain words cannot be 
used as variable names because they are already keywords 
or built-in functions. For example, you cannot have a variable 
named "line" because this is a keyword. You cannot have a 
variable named "result" because this is a built-in function.

If you try to read from a variable before it has been introduced, 
a runtime error will occur. `put notSeenBefore into x` will cause
an error unless there is a statement assigning a value to `notSeenBefore`.

Use "global" to declare a variable as a global.
1) it can be accessed from any other script
2) its contents are saved even after the function is complete.

For example,


```
global coordX, coordY
put 1 into coordX
put 2 into coordY
```


A runtime error can be thrown if a variable has the wrong 
type, e.g.

```
put "abc" into x
put 4 into y
put x + y into z
```

The addition operator requires numbers, and so creates a 
runtime error when getting the string `"abc"`.

The functions

```
strToNumber
```

and

```
numberToStr
```

can be used to move back and forth.

Logical types must be either true or false.

```
put (true and false) into x -- valid
put (true and 1) into x -- runtime error, expected true or false
```


Numeric comparison understands equivalent representations, 
for example:

```
put (456 is "456.00") into x -- true
put (456 is "00456.00") into x -- true
```


A "point" data type is two numbers separated by a comma. 
This can save typing.

```
set the left of cd btn "myBtn" to 10
set the top of cd btn "myBtn" to 20
```

is equivalent to
`set the topleft of cd btn "myBtn" to "10, 20"`



## Structure

**Scripts**

A script contains zero or more functions.
No code or declarations can exist outside of a function.


**Functions**

Functions look like this
    `on mouseup 
        answer "hello world"
    end mouseup`
or this
    `function myAddition p1, p2
        return p1 + p2
    end myAddition`

Nested functions are not currently supported.

**Loops**

```
repeat with x = 1 to 3
    ...other code here...
end repeat
```


Refer to `repeat` under "commands" for more information.

**If conditions**

```
if x > 1 then
    ...other code here...
else
    ...other code here...
end if
```

Refer to `if` under "commands" for more information.


**Statements**

Every statement has exactly one command.
For example, 
    `put sqrt(0.5) into x`
is a valid statement.
You cannot have a line that is just
    `sqrt(0.5)`
with no command, this is a syntax error.
    
Statements occur on separate lines, there's no way to cram 
more than one statement onto a line.
    
**Expressions**

A set of computations such as `1+2+3+4` or 
`sqrt(0.5) + sqrt(0.6)` is an expression. Most places that 
have a value can be given an expression, for example,
`go card 2
go card (x + 1)

put "abc" into cd fld "myFld"
put "abc" into cd fld (nameOfMyField & "Fld")

put "a" into line 4 of myList
put "a" into line (x+1) of myList

set the left of cd btn "myBtn" to x
set the left of cd btn (nameOfBtn) to (45 + 50 * cos(theta))
`



## Lists/arrays

Here's a common way to create a list:


```
put "" into myList
repeat with x = 1 to 5
    put 0 into line x of myList
end repeat
```


How to append a number to the list:


```
put newline & 20 after myList
```


How to add 10 to each element of the list:


```
repeat with x = 1 to the number of lines in myList
    put (line x of myList) + 10 into line x of myList
end repeat

```


`myList` is a normal variable, it can be passed as an 
argument and so on.



## Custom funcs

Here is an example of how to define and call a custom function.

```
function myAddition p1, p2
    return p1 + p2
end myAddition
on mouseUp
    put myAddition(1,2) into x
end mouseUp
```


A current limitation is that custom functions can only be called 
from the "put" command or the "return" command.
For example, if there is a custom function myAddition,
    `put myAddition(4,5) into x`
is supported,
    `return myAddition(4,5)`
is supported,
but
    `set the width of cd btn "btn1" to myAddition(4,5)`
is not yet supported.

Recursion is supported.

You can define variadic functions (that accept any number of 
values), see the documentation for the paramCount() function.

No error is thrown if the incorrect number of arguments is given. 
Missing arguments are given the empty string ("").

```
myAddition(7, 8, 9) -- the extra argument 9 is ignored
myAddition(7, 8) -- p1 is assigned 7, p2 is assigned 8
myAddition(7) -- p1 is assigned 7, p2 is assigned ""
myAddition() -- p1 is assigned "", p2 is assigned ""
```


The message hierarchy:
Messages bubble upwards from an object, to the parent card, 
to the stack, until they are handled.
If you click on a button:
    A mouseUp message is created
    Script of the button is examined. 
    If there is an 'on mouseUp' handler,
        Run the code in the mouseUp handler.
        If the handler completes, stop running code, we're done.
        If the handler calls 'pass mouseUp', continue:
    Script of the current card is examined.
    If there is an 'on mouseUp' handler,
        Run the code in the mouseUp handler.
        If the handler completes, stop running code, we're done.
        If the handler calls 'pass mouseUp', continue:
    Script of the current stack is examined.
    If there is an 'on mouseUp' handler,
        Run the code in the mouseUp handler.

Similarly, if you are typing text in a field, and type the letter 'a':
    A afterKeyUp message is created
    Script of the current field is examined.
    If there is an 'on afterKeyUp' handler,
        Run the code in the afterKeyUp handler.
        If the handler completes, stop running code, we're done.
        If the handler calls 'pass afterKeyUp', continue:
    Script of the current card is examined.
    If there is an 'on afterKeyUp' handler,
        Run the code in the afterKeyUp handler.
        If the handler completes, stop running code, we're done.
        If the handler calls 'pass afterKeyUp', continue:
    Script of the current stack is examined.
    If there is an 'on afterKeyUp' handler,
        Run the code in the mouseUp handler.

See documentation of the 'pass' command for an example.

Calls to custom commands and procedures also bubble upwards 
in the same way. A function in the stack's script can be called 
from any handler on a card, field, or button. A function in the 
card's script can be called from any handler in a field or button.
So, it is useful to put commonly used utility code in a stack 
script so that it can be called from anywhere.



## Chunks

We call a reference to a part of a container a "chunk". These 
examples demonstrate what can be done with chunk expressions:


```
answer char 2 of "abcd" -- displays "b"
answer char 2 to 3 of "abcd" -- displays "bc"
answer item 2 of "a,b,c,d" -- displays "b"
answer item 2 to 3 of "a,b,c,d" -- displays "b,c"
answer word 2 of "a b c d" -- displays "b"
answer word 2 to 3 of "a b c d" -- displays "b c"
put "a" & newline & "b" & newline & "c" & newline into lines
answer line 2 of lines -- displays "b"
answer line 2 to 3 of lines -- displays "b" & newline & "c"

answer first char of "abcd" -- displays "a"
answer second char of "abcd" -- displays "b"
answer any char of "abcd" -- displays a random choice
answer middle char of "abcd" 
answer last char of "abcd" 

put "x" into char 2 of "abcd"
put "x" into char 2 to 3 of "abcd"
put "x" into item 2 of "a,b,c,d"
put "x" into item 2 to 3 of "a,b,c,d"
put "x" into word 2 of "a b c d"
put "x" into word 2 to 3 of "a b c d"
```


chunks can be nested arbitrarily, as in

```
(char 2 of (char 2 to 3 of "abcd"))
```

or

```
(char (line 4 of myList) of "abcd")
```


the itemdelimeter is "," by default but can be changed.
this can be helpful for simple parsing.
`put "abc|def|ghi" into x
set the itemdelimiter to "|"
answer item 2 of x -- displays "def"`



## Constants

Use `newline` to refer to a new line character.
Let's say you wanted two lines of text in a field, you would use 
the following:

```
put "first line" & newline & "second line" into cd fld "myFld"
```


(You shouldn't have to be concerned with newline platform 
differences: the constants return, cr, linefeed are present for 
backwards compatibility, but they are are all mapped to \n ascii 
10 internally. If you are running windows, when you copy text 
we'll automatically convert to \r\n newlines so if you paste 
into notepad, it looks right.)

The following constants are defined:
`
pi
newline
tab
empty
quote
one
two
three
four
five
six
seven
eight
nine
ten
colon
comma
true
false
up
down
space
return
cr
formfeed
linefeed`



## Message Box

Open the Message Box by choosing 'Message Box' from the Go menu, or by pressing Cmd+M.

The message box can be used to quickly try out snippets of code. For example, if you want to evaluate some math, you can open the message box, type `put 12*34`, and press Enter. The result will be shown below.

As another example, if you have two buttons, and you want to align the left sides of the buttons, you can type `set the left of cd btn 2 to the left of cd btn 1`, and press Enter, and the action will be performed.

You can use the Up and Down arrow keys to see previously typed commands.

You can use a semicolon to combine many lines, for example `put 2 into x; put x * 3`

You can use the message box to check or change the contents of a global variable. In fact, any variable mentioned in the message box will be assumed to be a global, so you can write `put 4 into myGlobal` without first needing to declare `global myGlobal`.

In your script, you can add debugging statements that trace a value and show it in the message box, as long as the message box is currently open.


```

put 45 * 56 into x
-- if the msg box is open, will show the value of x
-- otherwise, the line is ignored
put x into the msg box
-- code will continue running

```


The shortened form,


```

put 45 * 56 into x
-- if the msg box is open, will show the value of x
put x
```


is also supported, but isn't encouraged because it is harder to read.



## Tips & Shortcuts

General tips

-   Double-click the eraser tool to clear paint on the current card
-   If your script is caught in an infinite loop, click the Stop button (black rectangle) to stop the script
-   See more error details, when in the Script Editor, by clicking on the error excerpt

Keyboard shortcuts when editing text,

-   Cmd+C to copy
-   Cmd+X to cut
-   Cmd+V to paste
-   Cmd+A to select all
-   Cmd+Backspace to delete entire word
-   PageUp / PageDown to scroll one page
-   Shift+PageUp / Shift+PageDown to select one page
-   Home to move to start of line
-   Shift+Home to select to start of line
-   Cmd+Home to move to the start
-   Cmd+Shift+Home to select to the start
-   Left Arrow to move to the left
-   Shift+Left Arrow to select to the left
-   Cmd+Left Arrow to move left one word
-   Cmd+Shift+Left Arrow to select left one word
-   Cmd+Arrow Up to scroll up
-   Cmd+Arrow Down to scroll down
-   Cmd+D to duplicate the current line
-   Cmd+L to delete the current line
-   Cmd+Q to quickly comment-out or uncomment the current line
-   Cmd+Q when many lines are selected to comment-out all of them
-   Tab key, to automatically indent code

Some of the main differences between ViperCard and HyperCard:
-  ViperCard is open source software that can run in any modern web browser
-  you can export stacks as a modern json format
-  art-stamps feature for adding clip art
-  new animation features like save-to-gif
-  in ViperCard you have to hit Save to save changes
-  in ViperCard you have an extensive undo history and can even undo changes made by a script

Scripting differences between ViperCard and HyperCard:
- You can write `exit to ViperCard` instead of `exit to HyperCard`
- You must specify `cd` or `bg` when referring to a button or field
- Newline char is \n and not \r
- Added: afterkeydown, replace command, owner property
- Currently: message chain for key events is different, on afterkeydown to indicate cannot prevent default action.
- Currently: wait until the mouseclick is not supported
- Scripts only run when browse tool is active; you can exit an infinite loop by changing the tool
- Unset variables do not default to containing their name
- hilite and checkmark are separate properties
- Set the label vs set the name
- Can't have a variable named id, length, short, long, first, second
- A custom handler "on myCode" and custom function "function myCode" are equivalent, both use return and set "the result"
- The `choose` command sets the emulated current tool, not the actual tool, and is limited to certain paint operations
- You have to write 'sin(x)', not 'the sin of x'. you have to write 'the clickLoc()', not 'the clickLoc'.



## Credits

ViperCard
https://github.com/moltenform/vipercard
Copyright (C) 2018 Ben Fisher

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. 

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

ViperCard uses the following libraries:

Chevrotain
    https://github.com/SAP/chevrotain
    Apache License 2.0

FileSaver.js
    https://github.com/eligrey/FileSaver.js
    MIT License

Golly
    https://github.com/dannygarcia/golly
    MIT License
    
JSGIF
    https://github.com/antimatter15/jsgif
    MIT License
    
js-lru
    https://github.com/rsms/js-lru
    MIT License
    
Clipboard.js
    https://github.com/zenorocha/clipboard.js
    MIT License
    
base64js
    https://github.com/beatgammit/base64-js
    MIT License

types-text-encoding 
    https://www.npmjs.com/package/@types/text-encoding
    MIT License
    
Bresenham easy.filter
    http://members.chello.at/easyfilter/bresenham.html
    written permission of author

description of Mac OS Roman character set
    https://en.wikipedia.org/wiki/Mac_OS_Roman
    http://creativecommons.org/licenses/by-sa/3.0/
    Creative Commons Attribution-ShareAlike

and a small excerpt from the SciTE code editor,
ported from C++ to TypeScript by Ben Fisher
SciTE
    https://www.scintilla.org/SciTE.html
    https://www.scintilla.org/License.txt

