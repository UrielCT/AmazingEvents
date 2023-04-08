Feature: WebSite Filter

  Scenario Outline: User wants to filter the information
    Given user open browser1
    And enter into the website1
    When click in a filter <option>
    Then show the information that matches with the filter

    Examples: 
      | option  |
      | Food    |
      | Museum  |
      | Concert |
      | Race    |
      | Books   |
      | Cinema  |
      | Party   |
