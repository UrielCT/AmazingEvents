Feature: SearchBar

Scenario Outline: 
	 Given user open browser-
   And enter into the website-
   When user type a <word> in the SearchBar
   Then The information matches with the <word>
   
   Examples:
   |word|
   |Just Harry|
   |Arabic holidays|
   |Metallica in concert|
  