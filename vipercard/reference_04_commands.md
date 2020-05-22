<!---
this is a generated file, changes will be lost.
-->
[Fundamentals](./reference_01_fundamentals.md) | [Functions](./reference_02_functions.md) | [Events](./reference_03_events.md) | [Commands] | [Properties](./reference_05_properties.md)



## add {number} to [chunk of] {container}

Adds the value of number to the number in a container.


Examples:

```
put 2 into x
add 3 to x
answer x -- will display "5"

put "1,2,3" into x
add 3 to item 2 of x
answer x -- will display "1,5,3"
```





## answer {text}
answer {text} with {option1} or {option2} [or {option3}]

Displays a dialog box.
The button that is pressed (1, 2, or 3) will be assigned to the variable "it".


Examples:

```
answer "abc" -- will display "abc"

answer "are you sure?" with "OK" or "cancel" 
put it into whichChosen
if whichChosen is 1 then
    answer "clicked OK"
else if whichChosen is 2 then
    answer "clicked cancel"
end if
```





## ask {text}
ask {text} with {defaulttext}

Displays a dialog box allowing the user to type in a response.
The text typed will be assigned to the variable "it".
If the user clicks Cancel, the result will be an empty string "".


Examples:

```
ask "what is your favorite color?" with "blue"
put it into favColor
answer "you chose" && favColor
```





## beep

Play the system beep sound.



## choose {toolname} tool

You can use the choose command to programmatically draw shapes and lines.

When a script completes, you'll be taken back to the Browse tool regardless of which tool was chosen within a script.


Examples:

```
choose pencil tool
click at 10,20
-- this draws a black pixel at the coordinates x=10, y=20

choose line tool
drag from 10,20 to 30,40
-- this draws a line starting at the coordinates (10,20) 
-- ending at (30,40)

-- Currently supported tools include:
brush
bucket
pencil
line
rect
oval
roundrect
curve
spray
browse
```





## click at {x}, {y}

Use the click command for programmatically drawing pictures.
Remember to first use the choose command to indicate what to 
draw.


Examples:

```
choose pencil tool
click at 10,20
-- this draws a pixel at the coordinates x=10, y=20
```





## create btn|fld

This feature will arrive in a future version...



## delete char {i} of {container}
delete char {i} to {j} of {container}
delete btn|fld



Examples:

```
put "abcde" into x
delete char 2 of x
answer x -- shows "acde"

put "abcde" into x
delete char 2 to 4 of x
answer x -- shows "ae"

As far as deleting a button or field, this feature will arrive in a 
future version...
```





## dial {number}

The dial command generates touch-tone sounds for the digits in the number, through the speaker. To dial the phone from ViperCard, you must either hold the handset up to the speaker of your computer or use a device that feeds computer audio output to the telephone.

Note: If you include a hypen in the number, place the entire expression in quotation marks. Otherwise, ViperCard performs a subtraction before dialing the number.

The first time the `dial` command is run, the sounds might not be played because they might not have been loaded yet. Use `dial "" ` when your program starts to ensure that the sounds are loaded.


Examples:

```
dial "" -- begin loading the dial tone sounds
wait 4 seconds
dial "555-1234"
```





## disable {button}

Disables a button (sets the "enabled" property to true, so that the
button no longer responds to clicks).



## divide [chunk of] {container} by {number}

Divides the number in a container by a number.


Examples:

```
put 12 into x
divide x by 3
answer x -- will display "4"

put "1,12,3" into x
divide item 2 of x by 3
answer x -- will display "1,4,3"
```





## do {expression}

Take a string, and execute it as if it were a ViperCard script.

Similar to eval() in other languages.


Examples:

```
put "answer " into buildScript
put quote & "abc" & quote after buildScript
do buildScript
```





## drag from {x1}, {y1} to {x2}, {y2}

Use the drag command for programmatically drawing pictures.
Remember to first use the choose command to indicate what to 
draw.


Examples:

```
choose line tool
drag from 10,20 to 30,40
-- this draws a line starting at the coordinates (10,20) 
-- ending at (30,40)
```





## enable {button}

Enables a button (sets the "enabled" property to false, so that the
button is no longer disabled).



## exit

Exits the current function, skipping over any subsequent lines 
of code. Similar to return, but does not return a value.


Examples:

```
on mouseUp
    put cd fld "fld1" into x
    if x is not a number then
        answer "you did not type a number"
        exit mouseUp
    end if
    put x * 2 into cd fld "fld1"
end mouseUp
```





## exit repeat

Exit the current loop.
Equivalent to "break" in C.


Examples:

```
repeat with x = 1 to 3
    if x == 2 then
        break
    end if
    answer x
end repeat
-- displays 1
-- and does not display 2 or 3
```





## get {expression}

Evaluates any expression and saves the result to the variable "it".

The 'put' command is typically more useful.


Examples:

```
get 2+3
put it into x
answer x -- shows 5

get the width of cd btn "myBtn"
put it into x
answer x -- shows the width of the specified button
```





## global {variableName}

Indicates that a variable is a global.
1) it can be accessed from any other script
2) the contents are saved even after the function is complete.
The contents are lost when the stack is exited, however, and are not saved to disk.


Examples:

```
global currentData1, currentData2
put "stored 1" into currentData1
put "stored 2" into currentData2
```





## go {number}
go {ordinal}
go {relativePosition}

Go to a different card.


Examples:

```
go to card 1 -- goes to first card
go first -- goes to first card
go last -- goes to last card
go next -- goes to the next card
go prev -- goes to the previous card

The following are supported:
last
middle
any
first
second
third
fourth
fifth
sixth
seventh
eigth
ninth
tenth
next
previous
this
mid
prev

('go back' and 'go forth' are present for backwards compatibility, but are not recommended for use in new code)
```





## hide {button|field}

Hides a button or field.



## if/then

Use to run certain code based on a condition that can be true or false.

In the example


```

put 2 into x
if x > 0 then
    answer "x is greater than 0"
end if
```


First, we'll check the expression `x > 0`. Since it evaluates to true,
the code inside is run. 

You can also include an "else" section that will be run only if the expression evaluated to false.


```
if x > 0 then
    answer "x is greater than 0"
else
    answer "x is not greater than 0"
end if
```


You can chain together many different conditions with "else if". 


```

put 3 into x
if x > 3 then
    answer "x is greater than 3"
else if x < 3 then
    answer "x is less than 3"
else if x is 3 then
    answer "x is 3"
end if
```


Like in other programming languages, as soon as one of the branches
is taken, all of the remaining branches are skipped -- even if the condition is true.


```

if 3+3 is 6 then
    answer "aaa"
else if 2+2 is 4 then
    -- this not run, even though the expression is true
    answer "bbb"
end if

```


For backwards compatibility, we support single-line if statements but do not recommend this style for new code.



## lock screen

This feature will arrive in a future version...



## multiply [chunk of] {container} by {number}

Multiplies the number in a container by a number.


Examples:

```
put 12 into x
multiply x by 3
answer x -- will display "36"

put "1,12,3" into x
multiply item 2 of x by 3
answer x -- will display "1,36,3"
```





## next repeat

Inside a loop, go back to the top of the loop, skipping the next 
line(s) of code. Equivalent to "continue" in C.


Examples:

```
repeat with x = 1 to 3
    if x == 2 then
        next repeat
    end if
    answer x
end repeat
-- displays 1
-- displays 3
-- and does not display 2
```





## pass

Exits the current function and calls a function higher in the
message hierarchy. For example, if a button has the script

```
on mouseUp
    answer "button handling the event"
end mouseUp
and the current card has the script
on mouseUp
    answer "card handling the event"
end mouseUp
```

and the button is clicked,
only the button's code will be run.

If you want both to be run, you can use the pass command.
If a button has the script

```
on mouseUp
    answer "button handling the event"
    pass mouseUp
    -- any code here will be skipped
end mouseUp
```

and the current card has the script

```
on mouseUp
    answer "card handling the event"
end mouseUp
```

and the button is clicked,
both will be run.



## play

Play a sound effect.

For example, to play a chime sound,


```
play "glider_1_Extra" load
wait 4 seconds
play "glider_1_Extra"
```


You should load the sounds you will use in advance,
such as in a game initialize() routine,
so that when you play them, there will not be a delay.

ViperCard can play the following sounds:

`glider_1_Aww
glider_1_Bass
glider_1_BeamIn
glider_1_BlowerOn
glider_1_Bounce
glider_1_Clock
glider_1_Crunch
glider_1_Drip
glider_1_Energize
glider_1_Extra
glider_1_FireBand
glider_1_GetBand
glider_1_GoodMove
glider_1_GreaseFall
glider_1_Guitar
glider_1_Hey!
glider_1_Lightning
glider_1_LightsOn
glider_1_Pop
glider_1_Push
glider_1_Shredder
glider_1_Tick
glider_1_ToastDrop
glider_1_ToastJump
glider_1_Yow!
glider_1_Zap`



## put {expression} into {container}

Evaluates any expression and saves the result to a variable or 
container.


Examples:

```
put 2+3 into x
answer x -- shows 5

put "hello" into cd fld "message"

put "aa,bb,cc" into x
put "11" into item 2 of x
answer x -- shows "aa,11,cc"

put "abc" into x
put "q" into char 2 of x
answer x -- shows "aqc"

put "appended text" after x
put "prepended text" before x

-- if the message box is open, you can display the contents of a variable into the message box,
-- this is similar to "print" or "writeline" in other languages.
put 2+3 into x
put x into the msg box
```





## repeat

Use to create a loop.


Examples:

```
repeat with x = 1 to 5
    answer "x is now" & x
end repeat

repeat with x = 5 down to 1
    answer "x is now" & x
end repeat

repeat 3 times
    answer "hi"
end repeat

repeat forever
    answer "this is an infinite loop"
end repeat

put 0 into counter
repeat forever
    answer "but not this"
    add 1 to counter
    if counter > 3 then
        exit repeat
    end if
end repeat

put 0 into counter
repeat until counter > 3
    add 1 to counter
end repeat

put 0 into counter
repeat while counter <= 3
    add 1 to counter
end repeat
```





## replace {string} with {string} in {container}

Replace all occurrences of a string.


Examples:

```put "a-b-c" into x
replace "-" with "_" in x
answer x -- shows a_b_c


-- you can also use replace in a field.
put "-" into search
put "_" into replacement
replace search with replacement in cd fld "myFld"
```





## return {expression}

return a value from the current function.
Note: no lines of code after the return statement will be run.


Examples:

```
function myAddition p1, p2
    return p1 + p2
    answer "this line will never be reached"
end myAddition
on mouseUp
    put myAddition(1,2) into x
end mouseUp
```





## send {expression} to {object}

Take a string, and execute it as if it were a ViperCard script in the context of an object.

Messages in ViperCard automatically travel upwards from button to card, background, and then stack.

But by using the 'send' command, you can send a message to any target -- from a card down to a button, from one card to a different card, and so on. One case where this is helpful is if you have a large amount of code in one script: subroutines can be moved to other objects and called via send.


Examples:

```
-- sending a message to a different card
send "prepareNextCard" to card "otherCard"

-- simulate a button click
send "mouseUp" to cd btn "myButton"

-- if you have hundreds of lines of code in one script, this
-- can feel disorganized. with "send" you can store code
-- in other objects, for example, moving
-- mathematical computation to a different card or button.
-- in the script of cd btn "mathUtils" of card "otherCard", write
on myCompute a, b
    return a * a + b
end myCompute

-- from another script
send "myCompute 3, 4" to cd btn "mathUtils" of card "otherCard"
put the result into x
```





## set the {property} of {button|field} to {value}
set the {property} to {value}
set the {chunkproperty} of {chunk} of {field} to {value}

Use the set command to change a property.

Some example properties:


```
set the width of cd btn "myButton" to 100
set the topLeft of cd btn "myButton" to 24, 25
put the long name of btn "myButton" into x
set the textsize of char 2 to 4 of cd fld "myFld" to 18 
set the itemdelimiter to "|"
```


See the "Properties" section of documentation for more.



## show {button|field}

Shows a button or field.



## sort [lines|items|chars] of {container}
sort descending [lines|items|chars] of {container}
sort [lines|items|chars] of {container} [numeric|text|international]

Sort styles:
For text sorting (default), compares text, not case sensitive.
For numeric sorting, interpret as numbers, e.g. 10 sorts after 2.
For international sorting, compares text using current locale.


Examples:

```
put "aa,cc,bb" into x
sort items of x
answer x -- displays "aa,bb,cc"
```





## subtract [chunk of] {container} from {number}

Subtracts a number from the number in a container.


Examples:

```
put 12 into x
subtract 3 from x
answer x -- will display "9"

put "1,12,3" into x
subtract 3 from item 2 of x
answer x -- will display "1,9,3"
```





## unlock screen

This feature will arrive in a future version...



## wait {number} [seconds|milliseconds|ms|ticks]

Pauses the script.


Examples:

```
wait 500 ms -- pauses for half a second.

(A paused script can be terminated by clicking the Stop icon in the
navigation palette, or by changing to the button or field tool.)
```



