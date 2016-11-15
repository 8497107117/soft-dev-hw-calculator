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

- Negative Number

- Basic Arithmetic

	- ``+``
    - ``-``
    - ``*``
    - ``/``

- Further Arithmetic

	- ``%``

- Different radix

	- Hexadecimal
	- Decimal
	- Octal
	- Binary
    
    Click the word will change radix.

- Operator Precedence

	Not like the calculator in windows.

	In windows, ``1+2*3`` will be ``(1+2)*3 = 9``
	But in my calculator it will be ``1+2*3 = 7``

- Backspace ``<-``

	Only can backspace the operand. 
	Can't backspace the operator.

- Clear `C` `CE`

  -``CE : clear current input``
  -``C : clear everything``
