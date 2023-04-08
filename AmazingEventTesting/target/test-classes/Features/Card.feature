Feature: Cards

  Scenario: User wants to select a card in order to better see the information
    Given user open browser.
    And enter into the website.
    When user clicks the button -Ver Mas...-
    Then information is available
