# Product Backlog

> *Note*: The IDs are encoded as \<Theme ID\>.\<Epic ID\>.\<Story ID\>.\<Acceptance criterion ID\>.

## Themes

|  ID   | Name                |
| :---: | :------------------ |
|   1   | Navigation          |
|   2   | Contact Management  |
|   3   | Group Management    |
|   4   | Memo Management     |


## Epics

|  ID   | Name                |
| :---: | :------------------ |
|  1.1  | User authentication |
|  1.2  | User dashboard      |
|  2.1  | Contact creation    |
|  2.2  | Contact listing     |
|  2.3  | Contact amendment   |
|  2.4  | Contact search      |
|  3.1  | Group creation      |
|  3.2  | Group listing       |
|  3.3  | Group amendment     |
|  4.1  | Memo creation       |
|  4.2  | Memo listing        |
|  4.3  | Memo amendment      |

## User Stories

|  ID   | As a/an ... | I want to ...                       | so that ...                                             | Priority | Story Point |
| :---: | :---------- | :---------------------------------- | :------------------------------------------------------ | :------- | :---------: |
| 1.1.1 | user        | register for an account             | I can start using the app                               | HIGH     |      1      |
| 1.1.2 | user        | log in to my account                | I can access my account data                            | HIGH     |      1      |
| 1.1.3 | user        | log out of my account               | I can restrict access to my account                     | HIGH     |      1      |
| 1.1.4 | client      | ensure application security         | my contacts' information stays confidential             | HIGH     |      8      |
| 1.2.1 | user        | see a dashboard                     | I can see an overview of my contacts, groups, and memos | HIGH     |      3      |
| 1.2.2 | user        | see a contact count                 | I can easily see how many contacts I have               | HIGH     |      3      |
| 1.2.3 | user        | see a group count                   | I can easily see how many groups I have                 | HIGH     |      3      |
| 1.2.4 | user        | see my recentmost memos             | I can see some of my memos' details at a glance         | HIGH     |      2      |
| 1.2.5 | client      | use the color blue within the UI    | looking at the UI for a long time is bearable           | HIGH     |      1      |
| 1.2.6 | user        | search a contact from the dashboard | I can quickly retrieve a specific contact's details     | LOW      |      8      |
| 2.1.1 | user        | create new contacts                 | I can keep track of new people's details                | HIGH     |      3      |
| 2.1.2 | user        | assign new contacts to groups       | I can categorise my new contacts                        | HIGH     |      5      |
| 2.2.1 | user        | list down my contacts               | I can see all my contacts' representative details       | HIGH     |      2      |
| 2.2.2 | user        | view a contact's details            | I can view all the details associated with a contact    | HIGH     |      2      |
| 2.3.1 | user        | edit an existing contact's details  | I can keep my contacts' information up-to-date          | HIGH     |      8      |
| 2.3.2 | user        | assign existing contacts to a group | I can categorise my existing contacts                   | HIGH     |      5      |
| 2.3.3 | user        | upload a contact photo              | I can associate my contacts with a photo                | MEDIUM   |      8      |
| 2.3.4 | user        | delete an existing contact          | I can remove contacts that are no longer needed         | HIGH     |      5      |
| 2.4.1 | user        | search a contact by name            | I can quickly retrieve a specific contact's details     | HIGH     |      8      |
| 2.4.2 | user        | search a contact by other fields    | I can match some details to a contact                   | LOW      |      8      |
| 3.1.1 | user        | create new groups                   | I can create new categories for my contacts             | HIGH     |      3      |
| 3.1.2 | user        | assign contacts to a new group      | I can assign my contacts to a newly-created group       | HIGH     |      5      |
| 3.2.1 | user        | list down my groups                 | I can see the contact categories that I have            | HIGH     |      2      |
| 3.2.2 | user        | view a group's details              | I can easily view the group name and its members        | HIGH     |      2      |
| 3.3.1 | user        | edit an existing group's details    | I can keep my groups' information up-to-date            | HIGH     |      8      |
| 3.3.2 | user        | edit contacts of an existing group  | I can keep the categorisation of contacts up-to-date    | HIGH     |      8      |
| 3.3.3 | user        | delete an existing group            | I can remove groups that are no longer needed           | HIGH     |      5      |
| 4.1.1 | user        | create new memos                    | I can store notes about events                          | HIGH     |      3      |
| 4.2.1 | user        | list down my memos                  | I can see some details about my memos at a glance       | HIGH     |      2      |
| 4.2.2 | user        | view a memo's details               | I can view the details associated with a memo           | HIGH     |      2      |
| 4.3.1 | user        | edit an existing memo's details     | I can keep my memos updated                             | HIGH     |      8      |
| 4.3.2 | user        | delete an existing memo             | I can remove memos that are no longer needed            | HIGH     |      5      |

## Acceptance Criteria

|   ID    |               Given that the ...                |                        When the ...                        |                                                    Then the ...                                                       |
| :-----: | :---------------------------------------------- | :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| 1.1.1.1 | user does not have an account                   | user tries to log in                                       | user is presented with an option to register                                                                          |
| 1.1.2.1 | user has a registered account                   | user logs in using the correct credentials                 | user is authenticated and led to the dashboard                                                                        |
| 1.1.2.2 | user has a registered account                   | user logs in using the wrong credentials                   | user is notified that their credentials are invalid and asked to try again                                            |
| 1.1.3.1 | user is logged in                               | user tries to log out                                      | user is deauthenticated, notified of their successful logout, and led back to the login page                          |
| 1.2.1.1 | user is logged in                               | user accesses their dashboard                              | user is shown information about their contact and group count, and recentmost memos with their representative details |
| 1.2.2.1 | user is on the dashboard page                   | user clicks on their contact count                         | user is taken to the contacts page |
| 1.2.3.1 | user is on the dashboard page                   | user clicks on their group count                           | user is taken to the groups page   |
| 1.2.4.1 | user has no existing memos                      | user is on the dashboard page                              | user is prompted to create a new memo |
| 1.2.4.2 | user has some existing memos                    | user is on the dashboard page                              | user is shown his recentmost memos along with their representative details                                            |
| 1.2.4.3 | user is on the dashboard page                   | user clicks on a recent memo                               | user is shown the complete details of the memo                                                                        |
| 1.2.5.1 | frontend design has been finalised              | client uses the application                                | client sees the color blue being used in a majority of the UI elements                                                |
| 1.2.5.2 | frontend design has been finalised              | client uses the application for an extended period of time | client is not fatigued by the UI                                                                                      |
| 1.2.6.1 | user is on the dashboard page                   | user enters a query in the search bar                      | user is shown contacts whose name fuzzy-matches the query                                                             |
| 2.1.1.1 | user is on the contacts page                    | user clicks on the 'Add Contact' button                    | user is taken to the contact creation form                                                                            |
| 2.1.1.2 | user is on the contact creation form            | user clicks on the 'Save Contact' button                   | user is taken back to the contacts page and notified of their successful creation                                     |
| 2.1.2.1 | user is on the contact creation form            | user selects an existing group                             | new contact is set to be assigned to said group on creation finalisation                                              |
| 2.2.1.1 | user has no existing contacts                   | user is on the contacts page                               | user is prompted to add a new contact                                                                                 |
| 2.2.1.2 | user has some existing contacts                 | user is on the contacts page                               | user's contacts are listed down along with their representative details                                               |
| 2.2.2.1 | user is on the contacts page                    | user clicks on a contact                                   | user is shown the complete details of said contact                                                                    |
| 2.3.1.1 | user is on a contact's details page             | user clicks on the 'Edit' button                           | user is taken to a populated contact amendment form                                                                   |
| 2.3.1.2 | user is currently amending a contact's details  | user changes the value of some contact detail field        | amended contact details is set to be saved on contact amendment finalisation                                          |
| 2.3.1.3 | user is currently amending a contact's details  | user clicks on the 'Save' button                           | user is taken back to the contacts page and notified of their successful amendment                                    |
| 2.3.2.1 | user is currently amending a contact's details  | user assigns an existing group to the contact              | contact is set to be assigned to said group on contact amendment finalisation                                         |
| 2.3.3.1 | user is currently amending a contact's details  | user uploads a contact photo                               | photo is set to be assigned to said contact on contact amendment finalisation                                         |
| 2.3.4.1 | user is currently amending a contact's details  | user clicks the 'Delete Contact' button                    | user is asked for confirmation, taken back to the contacts page, and notified of their successful deletion            |
| 2.4.1.1 | user is on the contacts page                    | user enters a query string in the search bar               | user is shown contacts whose name fuzzy-matches the query                                                             |
| 2.4.2.1 | user is on the contacts page                    | user selects search key in the search bar                  | user's next query string is going to be searched within said key                                                      |
| 3.1.1.1 | user is on the groups page                      | user clicks on the 'Create Group' button                   | user is taken to the group creation form                                                                              |
| 3.1.1.2 | user is on the group creation form              | user clicks on the 'Save Group' button                     | user is taken back to the groups page and notified of their successful creation                                       | 
| 3.1.2.1 | user is on the group creation form              | user selects existing ungrouped contacts                   | selected contacts is set to be assigned to the new group on creation finalisation                                     |
| 3.2.1.1 | user has no existing groups                     | user is on the groups page                                 | user is prompted to create a new group                                                                                |
| 3.2.1.2 | user has some existing groups                   | user is on the groups page                                 | user's groups are listed down along with their representative details                                                 |
| 3.2.2.1 | user is on the groups page                      | user clicks on a group                                     | user is shown the complete details of said group                                                                      |
| 3.3.1.1 | user is on a group's details page               | user clicks on the 'Edit' button                           | user is taken to a populated group amendment form                                                                     |
| 3.3.1.2 | user is currently amending a group's details    | user changes the value of some group detail field          | amended group details is set to be saved on group amendment finalisation                                              |
| 3.3.1.3 | user is currently amending a group's details    | user clicks on the 'Save' button                           | user is taken back to the groups page and notified of their successful amendment                                      |
| 3.3.2.1 | user is currently amending a group's details    | user clicks on the 'Add Members' button                    | user is taken to the unassigned contact selection page                                                                |
| 3.3.2.2 | user is currently selecting unassigned contacts | user clicks on the 'Add Selected' button                   | selected users are shown on the group amendment form                                                                  |
| 3.3.2.3 | user is currently amending a group's details    | user clicks on the 'Remove' button beside each contact     | removed contact is set to be removed from said group on group amendment finalisation                                  |
| 3.3.2.4 | user is currently amending a group's details    | user clicks on the 'Save Group' button                     | selected users are assigned to said group                                                                             |
| 3.3.3.1 | user is currently amending a group's details    | user clicks on the 'Delete Group' button                   | user is asked for confirmation, taken back to the groups page, and notified of their successful deletion              |
| 4.1.1.1 | user is on the memos page                       | user clicks on the 'Create Memo' button                    | user is taken to the memo creation form                                                                               |
| 4.1.1.2 | user is on the memo creation form               | user clicks on the 'Save Memo' button                      | user is taken back to the memos page and notified of their successful creation                                        |
| 4.2.1.1 | user has no existing memos                      | user is on the memos page                                  | user is prompted to create a new memo                                                                                 |
| 4.2.1.2 | user has some existing memos                    | user is on the memos page                                  | user's memos are listed down along with their representative details                                                  |
| 4.3.1.1 | user is on a memo's details page                | user clicks the 'Edit Memo' button                         | user is taken to a populated memo amendment form                                                                      |
| 4.3.1.2 | user is currently editing a memo's details      | user changes the value of some memo detail field           | amended memo details is set to be saved on  memo amendment finalisation                                               |
| 4.3.1.3 | user is currently editing a memo's detials      | user clicks the 'Save Memo' button                         | user is taken back to the memos page and ontified of their successful amendment                                       |
| 4.3.2.1 | user is currently editing a memo's detials      | user clicks the 'Delete Memo' button                       | user is asked for confirmation, taken back to the memo page, and notified of their successful deletion                |
