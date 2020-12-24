# Rocket-Elevators-Mobile


## Week-14, Mobile Application

In order to help the Employees to keep track and update the status of the elevators that are not in service, the developper needed to implement a mobile application, in relation with the REST API, to allow Employees on both Android and iOS to gain access to that feature.

The mobile application was developped in React Native Expo to accelerate the process of deploying it on both platform. 

1. The first step was to validate the access from an Employee only by using a GET request with the API to validate if the email typed by the user is present in the database. In the event of an email not being present in the database, an Alert is prompt to inform the user that the email is not valid.
2. The Second step was to generate a list of all the Elevators Not in Operation (Status : Intervention or Inactive)
3. Allowing an Employee to update the current status to "Active". While previously colored as Red, the status needed to change to Green when set to Valide.


***********************************************************************************************************************
