<!---
this is a generated file, changes will be lost.
-->
[Fundamentals](./reference_01_fundamentals.md) | [Functions] | [Events](./reference_03_events.md) | [Commands](./reference_04_commands.md) | [Properties](./reference_05_properties.md)



## abs(x)

Absolute value.

Examples:

```
put abs(-0.5) into x
put abs(0.5) into x
```





## atan(x)

Arctangent, in radians.

Examples:

```
put atan(0.5) into x
```





## charToNum(x)

From ascii-like number to a character.
Note that characters in a field are displayed in Mac OS Roman
encoding.

Note that the newline character is always \n (10).

Examples:

```
put charToNum(97) into x
```





## clickh()

In a mousedown or mouseup handler, get click x coordinate.

Examples:

```
put clickh() into x
```





## clickloc()

In a mousedown or mouseup handler, get click x,y coordinates.


Examples:

```
put clickloc() into x
```





## clickv()

In a mousedown or mouseup handler, get click y coordinate.


Examples:

```
put clickv() into x
```





## commandKey()

In an afterkeydown or afterkeyup handler, check if this modifier 
key is pressed.

Examples:

```
put commandKey() into x

put cmdkey() into x -- same as above.
```





## contains



Examples:

```
if "abc" contains "b" then
    answer "yes"
end if
```





## cos(x)



Examples:

```
put cos(0.5) into x
```





## diskSpace()

(Deprecated and hard-coded).

Examples:

```
put diskSpace() into x
```





## exp(x)

e to the power of x.

Examples:

```
put exp(0.5) into x
```





## exp1(x)

(e to the power of x) minus 1.


Examples:

```
put exp1(0.5) into x
```





## exp2(x)

2 to the power of x.


Examples:

```
put exp2(0.5) into x
```





## heapSpace()

(Deprecated and hard-coded).

Examples:

```
put heapSpace() into x
```





## is a

Check the type of an expression.


Examples:

```
if x is a number then
    answer "a"
end if
if x is a integer then
    answer "b"
end if
if x is a logical then
    answer "c"
end if
if x is a point then
    answer "d"
end if
if x is a rect then
    answer "e"
end if
```





## is in



Examples:

```
if "b" is in "abc" then
    answer "yes"
end if
```





## is within

Same as "is in".


Examples:

```
if "b" is in "abc" then
    answer "yes"
end if
```





## keyChar()

In an afterkeydown or afterkeyup handler, check the character.
Is affected by shift.

Examples:

```
put keyChar() into x
on afterKeyDown
    if keyChar() is "i" and not shiftKey() and \
            optionKey() and not commandKey() then
        answer "you pressed option-i"
    else if keyChar() is "U" and shiftKey() and \
            not optionKey() and not commandKey() then
        answer "you pressed shift-u"
    end if
end afterKeyDown
```





## keyRepeated()

In an afterkeydown handler, did this event come from the user holding the key down?

Examples:

```
if not keyRepeated() then
    add 1 to uniqueKeyPresses
end if
```





## length(s)

Returns the length of a string, in characters.
Also supports alternate syntax 'the length of "abc"'.


Examples:

```
answer length("abc") -- displays 3
answer the length of "" -- displays 0
answer the length of "abc" -- displays 3
```





## ln(x)



Examples:

```
put ln(0.5) into x
```





## ln1(x)

Natural logarithm of (x + 1)

Examples:

```
put ln1(0.5) into x
```





## log2(x)



Examples:

```
put log2(0.5) into x
```





## max(...)

Supports any number of arguments.
You can also provide a comma-delimited string.

Examples:

```
put max(1,2,3) into x
put max("45,49,40") into x -- returns 49
```





## me

Refers to the object that owns the current script.

Similar to, but distinct from 'target'.


Examples:

```
put the id of me into theTarget

set the width of me to 100
```





## min()

Supports any number of arguments.
You can also provide a comma-delimited string.

Examples:

```
put min(1,2,3) into x
put min("45,49,40") into x -- returns 40
```





## mouse()

Is the mouse button currently down.

Examples:

```
put mouse() into x
```





## mouseclick()

Are we currently handling a mousedown or mouseup event.


Examples:

```
put mouseclick() into x
```





## mouseh()

The x coordinate of mouse location.

Examples:

```
put mouseh() into x
```





## mouseloc()

The coordinates of mouse location.


Examples:

```
put mouseloc() into x
```





## mousev()

The y coordinate of mouse location.


Examples:

```
put mousev() into x
```





## numToChar(x)

From a character to an ascii-like number.
Note that characters in a field are displayed in Mac OS Roman
encoding.

Note that the newline character is always \n (10).

Examples:

```
put numToChar("a") into x
```





## number

Can be used to either count number of objects, or to count
lines/items in a string.


Examples:

```
answer the number of chars in "1,2,3"
answer the number of items in "1,2,3"
answer the number of words in "1,2,3"
answer the number of lines in "1,2,3"
answer the number of cards
answer the number of card buttons
answer the number of card fields
```





## numberToStr(x)

Convert number to string.

Examples:

```
put numberToStr(0.5) into x
```





## offset(needle, haystack)

Search for a string within a string, and return the position where found.
If not found, returns 0.
(one-based indexing).

Examples:

```
put offset("b", "abc") into x
-- x is now 2.
```





## optionKey()

In an afterkeydown or afterkeyup handler, check if this modifier 
key is pressed.

Examples:

```
put optionKey() into x
```





## param(n)

Get the nth value passed into the current procedure. Can be used
to build a function that takes any number of arguments, 
see example.


Examples:

```
on mySumOfNumbers
    put 0 into total
    repeat with x = 1 to paramCount()
        put total + param(x) into total
    end repeat
    answer "total is" && total
end mySumOfNumbers

on mouseUp
    mySumOfNumbers 1, 2, 3
end mouseUp
```





## paramCount()

Get the number of values passed into the current procedure.
Can be used to build a function that takes any number of 
arguments, see example.


Examples:

```
on mySumOfNumbers
    put 0 into total
    repeat with x = 1 to paramCount()
        put total + param(x) into total
    end repeat
    answer "total is" && total
end mySumOfNumbers

on mouseUp
    mySumOfNumbers 1, 2, 3
end mouseUp
```





## params()

Get all of the values passed into the current procedure.

Examples:

```
put params() into x
```





## random(n)

n must be an integer.
Returns random value between 1 and n.

Examples:

```
put random(20) into roll
```





## result()

The return value of the last called function or procedure.

Examples:

```
on myProc
    return "a"
end myProc
on mouseUp
    myProc
    answer result()
end mouseUp
```





## round(x)

Returns integer nearest to number. Odd integers plus 0.5 
round up, even integers plus 0.5 round down.

Examples:

```
put round(1.7) into x
```





## screenRect()



Examples:

```
put screenRect() into x
```





## seconds()

Seconds since January 1, 1904.

Examples:

```
put seconds() into x
```





## selectedChunk()

Current selection, looks something like 'char 2 to 4 of cd fld id 
1234'.


Examples:

```
put selectedChunk() into x
```





## selectedField()

The field that contains current selected text, looks something 
like 'cd fld id 1234'.


Examples:

```
put selectedField() into x
```





## selectedLine()

The number of the line of the current selected text.

Examples:

```
put selectedLine() into x
```





## selectedText()

The value of the current selected text.


Examples:

```
put selectedText() into x
```





## shiftKey()

In an afterkeydown or afterkeyup handler, check if this modifier 
key is pressed.

Examples:

```
put shiftKey() into x
```





## sin(x)



Examples:

```
put sin(0.5) into x
```





## sqrt(x)



Examples:

```
put sqrt(0.5) into x
```





## stackSpace()

(Deprecated and hard-coded).

Examples:

```
put stackSpace() into x
```





## strToNumber(x)

Parse string to number.
Supports scientific notation.
If cannot be parsed, returns "false"

Examples:

```
put strToNumber("12") into x
put strToNumber("-12") into x
put strToNumber("1e6") into x
```





## sum()

Supports any number of arguments.
You can also provide a comma-delimited string.

Examples:

```
put sum(1,2,3) into x
put sum("1,2,3") into x -- returns 6
```





## systemVersion()

(Deprecated and hard-coded).
To get the current software version, use
put the version into x
or
put the long version into x
instead.


Examples:

```
put systemVersion() into x
```





## tan(x)



Examples:

```
put tan(0.5) into x
```





## target

Refers to the object that was most recently acted on.
Here's one reason why this can be useful:
If you have many buttons that all basically perform the same 
action, you could have an 'on mouseup' handler in the card script
instead of a separate script within each button. This script in the
card could check the target to see which, if any, of the buttons
were clicked.

Similar to, but distinct from 'me'.


Examples:

```
put the id of target into theTarget

set the width of the target to 100
```





## there is a

Check for the existence of an object


Examples:

```
if there is a cd btn id 12345 then
    answer "found"
end if
```





## ticks()

Ticks (60th of a second) since January 1, 1904.

Examples:

```
put ticks() into x
```





## tool()

The current tool, as set by the `choose` command. (The `choose` command can be used to draw lines and shapes).


Examples:

```
choose pencil tool
answer tool() -- shows "pencil"
```





## trunc(x)

Get integer part of a number.
i.e. for positive numbers, always round down to the nearest 
integer.


Examples:

```
put trunc(0.5) into x
```



