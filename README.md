# Gainbridge Test plan

## Overview 
I built this testing repo used the generic init playwright repo commands, and follow their suggested test layout. All tests exist within the test folder, git hub actions within the Yaml file, and general configs within the playwright.config file. 

## Suites
While I only had time to build out the example tests within the regression suite, I did also add test skeletons for what could be an E2E suite. 

The regression suite in theory would be be a series of files/POMs containing the respective API specific tests and functions. The regression suite is comprised of tests which dive deeper into each API's expected functionality, and verifies limits & edge cases. 

In theory, the E2E would be comprised of tests which had to happen sequentially and mimic actual user's end to end actions. 

In theory we would also have a load testing suite which would track how the application handles large amounts of traffic or requests. 

## CI/CD
While I did not have time to implement github actions or set specifications on when tests should run I believe it would be important to add the following test executions: 

Local test execution: 
Its helpful to have a framework which developers can run locally, in order to verify their work before a PR is raised. 

Before PR Merge:
In the yaml file its possible to make declarations that before any PR can be merged all existing / related automated tests need to pass. Subsuites of tests can be declared using tagging/grep or regular expressions to match branch names with their respective suites. All tests within the respective suite must pass before github will allow the PR to be merged. 

Manually kicked off jobs: 
Before any development branch is merged into a higher level environment (ie dev -> stage) a member of the automation team would manually kick off tests, and verify all potential failures before signing off. 

Scheduled jobs:
In addition to the other jobs, its generally a good idea to have schedule daily/weekly jobs which ensure the tests are consistently working.

## Environment Variables 
Although I did not have the time in this excercise its best practice to pull any environment specific data, or reused date (ie base urls / authorization into the config file)
