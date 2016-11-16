# Softdev hw calculator

	Softdev 2016 in NCTU hw : calculator

# Run

- Install NodeJS
	- ``Linux : apt-get install node``
	- ``Mac : brew install node``
- Install AngularJS & Webpack
	- ``npm install angular``
	- ``npm install webpack``
- Run build
	- ``npm run build``

# How it work?

- Basic Arithmetic

	- ``+`` : plus
    - ``-`` : minus
    - ``*`` : multiple
    - ``/`` : divide

- Further Arithmetic

	- ``Mod`` : remainder

- Different base

	- Hexadecimal
	- Decimal
	- Octal
	- Binary
    
    Click the word will change base.

- Operator Precedence

	Not like the calculator in windows.

	In windows, ``1+2*3`` will be ``(1+2)*3 = 9``
	But in my calculator it will be ``1+2*3 = 7``

- Negative Number

	Negative number, like -10, stored in calculator is '-10'
	And showed in view is 'FFF6' 

- Backspace ``<-``

	Only can backspace the operand. 
	Can't backspace the operator.

	Negative number that you see 'FFF6' is '-10,
	so it will change to '-1'. Not 'FFF'.

- Clear `C` `CE`

  -``CE : clear current input``
  -``C : clear everything``
