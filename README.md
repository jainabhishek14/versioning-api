# Version Utility 

This services maintains the version logging of all the assets created.

    Service Id: MS-NDE-VERSION-0016
    Version ID: 003
    Technology Stack: Node, MongoDb, Express JS
    Owner: Abhishek Jain
    identifier: version

# Endpoints 
Following are the end points of this API

1. [Get Versions](#get-versions)  
2. [Get Asset Information](#get-asset-information)  
3. [Create Version](#create-version)  
6. [Pending Tasks](#pending-tasks)
7. [Health Check](#verify-deployment)  
8. [Access Logs](#access-logs)


##  Get Versions
    EndPoint: <domain-name>/application/<applicationID>/entity/<entityID>
 
### Request
    Request Type: GET
    Headers:
        Content Type: "application/json"
        Authorization: "JWT Token"
    Input Parameters:
        applicationID: String (Required)
        entityID: String (Required)



### Basic Usage:

    $.ajax({
        url: <domain-name>/application/<applicationID>/entity/<entityID>,
        type: "GET",
        headers: {
            "Authorization":<JWT-token>
        },
        Content-Type:'application/json',
        success: function(response){},
        error:.function(response){}
    });

### Response

#####  HTTP Status (200):
you will receive a json array of objects as below.  

        Code: 200 
        Message: "OK"
        Result: 
            [
                {
                    "_id": "5c8265c55203f5b9e8dd24b2",
                    "assets": [],
                    "application": "9676868887",
                    "entity": "68698558589587",
                    "data": {
                        "key": "value2"
                    },
                    "parent": "5c8265b95203f5b9e8dd24b0",
                    "dateAdded": "2019-03-08T12:53:25.120Z",
                    "dateUpdated": "2019-03-08T12:53:25.120Z",
                    "__v": 0,
                    "parentHierarchy": [
                        {
                            "_id": "5c825c205203f5b9e8dd24ac",
                            "assets": [],
                            "application": "9676868887",
                            "entity": "68698558589587",
                            "data": {
                                "key": "value1"
                            },
                            "dateAdded": "2019-03-08T12:12:16.041Z",
                            "dateUpdated": "2019-03-08T12:12:16.041Z",
                            "__v": 0
                        },
                        {
                            "_id": "5c8265a55203f5b9e8dd24ae",
                            "assets": [],
                            "application": "9676868887",
                            "entity": "68698558589587",
                            "data": {
                                "key": "value2"
                            },
                            "parent": "5c825c205203f5b9e8dd24ac",
                            "dateAdded": "2019-03-08T12:52:53.413Z",
                            "dateUpdated": "2019-03-08T12:52:53.413Z",
                            "__v": 0
                        },
                        {
                            "_id": "5c8265b95203f5b9e8dd24b0",
                            "assets": [],
                            "application": "9676868887",
                            "entity": "68698558589587",
                            "data": {
                                "key": "value2"
                            },
                            "parent": "5c8265a55203f5b9e8dd24ae",
                            "dateAdded": "2019-03-08T12:53:13.878Z",
                            "dateUpdated": "2019-03-08T12:53:13.878Z",
                            "__v": 0
                        }
                    ]
                },
                {
                    "_id": "5c8265b95203f5b9e8dd24b0",
                    "assets": [],
                    "application": "9676868887",
                    "entity": "68698558589587",
                    "data": {
                        "key": "value2"
                    },
                    "parent": "5c8265a55203f5b9e8dd24ae",
                    "dateAdded": "2019-03-08T12:53:13.878Z",
                    "dateUpdated": "2019-03-08T12:53:13.878Z",
                    "__v": 0,
                    "parentHierarchy": [
                        {
                            "_id": "5c825c205203f5b9e8dd24ac",
                            "assets": [],
                            "application": "9676868887",
                            "entity": "68698558589587",
                            "data": {
                                "key": "value1"
                            },
                            "dateAdded": "2019-03-08T12:12:16.041Z",
                            "dateUpdated": "2019-03-08T12:12:16.041Z",
                            "__v": 0
                        },
                        {
                            "_id": "5c8265a55203f5b9e8dd24ae",
                            "assets": [],
                            "application": "9676868887",
                            "entity": "68698558589587",
                            "data": {
                                "key": "value2"
                            },
                            "parent": "5c825c205203f5b9e8dd24ac",
                            "dateAdded": "2019-03-08T12:52:53.413Z",
                            "dateUpdated": "2019-03-08T12:52:53.413Z",
                            "__v": 0
                        }
                    ]
                },
                {
                    "_id": "5c8265a55203f5b9e8dd24ae",
                    "assets": [],
                    "application": "9676868887",
                    "entity": "68698558589587",
                    "data": {
                        "key": "value2"
                    },
                    "parent": "5c825c205203f5b9e8dd24ac",
                    "dateAdded": "2019-03-08T12:52:53.413Z",
                    "dateUpdated": "2019-03-08T12:52:53.413Z",
                    "__v": 0,
                    "parentHierarchy": [
                        {
                            "_id": "5c825c205203f5b9e8dd24ac",
                            "assets": [],
                            "application": "9676868887",
                            "entity": "68698558589587",
                            "data": {
                                "key": "value1"
                            },
                            "dateAdded": "2019-03-08T12:12:16.041Z",
                            "dateUpdated": "2019-03-08T12:12:16.041Z",
                            "__v": 0
                        }
                    ]
                },
                {
                    "_id": "5c825c205203f5b9e8dd24ac",
                    "assets": [],
                    "application": "9676868887",
                    "entity": "68698558589587",
                    "data": {
                        "key": "value1"
                    },
                    "dateAdded": "2019-03-08T12:12:16.041Z",
                    "dateUpdated": "2019-03-08T12:12:16.041Z",
                    "__v": 0,
                    "parentHierarchy": []
                }
            ]
        Headers:
            Content Type: application/json


##  Get Asset Information
    EndPoint: <domain-name>/asset/<asset-id>
 
### Request
    Request Type: GET
    Headers:
        Content Type: "application/json"
        Authorization: "JWT Token"
    Input Parameters:
        asset-id: String (Required)

### Basic Usage:

    $.ajax({
        url: <domain-name>/asset/5c864848f7effe0be7d050d6,
        type: "GET",
        headers: {
            "Authorization":<JWT-token>
        },
        Content-Type:'application/json',
        success: function(response){},
        error:.function(response){}
    });


### Response

#####  HTTP Status (200):
you will receive a json object as below

        Code: 200 
        Message: "OK"
        Result:
        {
            "assets": [
                "5c863fc73a2fa104e108ec6d",
                "5c863fc73a2fa104e108ec6d"
            ],
            "_id": "5c864848f7effe0be7d050d6",
            "application": "9676868887",
            "entity": "68698558589587",
            "dateAdded": "2019-03-11T11:36:40.494Z",
            "dateUpdated": "2019-03-11T11:36:40.494Z",
            "__v": 0
        }
        Headers:
            Content Type: application/json


##  Create Version
    EndPoint: <domain-name>/application/<applicationID>/entity/<entityID>
 
### Request
    Request Type: POST
    Headers:
        Content Type: "application/json"
        Authorization: "JWT Token"
    Input Parameters:
        applicationID: String (Required)
        entityID: String (Required)
        previousVersion: String (Optional)
        sections: [
            Object {
                data: Object (Required),
                isUpdated: boolean (Optional)
                previousVersion: String (Optional, if isUpdated = false else Required)
            }
        ] (Required)



### Basic Usage:

    var data = {
        "sections": [{
            "data": {
                "key1": "value1"
            },
            "isUpdated": false,
            "previousVersion": "5c863fc73a2fa104e108ec6d"
        },
        {
            "data": {
                "key2": "value2"
            },
            "isUpdated": true
        },
        {
            "data": {
                "key3": "value3"
            },
            "isUpdated": false,
            "previousVersion": "5c863fc73a2fa104e108ec6d"
        }]
    }

    $.ajax({
        url: <domain-name>/application/<applicationID>/entity/<entityID>,,
        type: "POST",
        data: data,
        headers: {
            "Authorization":<JWT-token>
        },
        Content-Type:'application/json',
        success: function(response){},
        error: function(response){}
    });


### Response

#####  HTTP Status (201):
you will receive a json object which contains message "Suucessful"

        Code: 201 
        Message: "Created"
        Result: 
            {
                "message": "Successful",
            }
        Headers:
            Content Type: application/json

### Responses

#####  HTTP Status (204):
you will receive a response with status code 204 which means success and no content

        Code: 204 
        Message: "Action Successful"

#### Error Responses

#####  HTTP Status (400):
You are not providing valid parameters.

        Code: 400
        Message: Bad Request.
        Headers:
            Content Type: application/json


#####  HTTP Status (401):
You are not authorised to perform an action

        Code: 401
        Message: Unauthorised request.
        Headers:
            Content Type: application/json


#####  HTTP Status (701):
JWT token not provided with request

        Code: 701
        Message: Token required.
        Headers:
            Content Type: application/json

#####  HTTP Status (702):
Token is not valid

        Code: 702
        Headers:
            Content Type: application/json

#####  HTTP Status (703):
Signature token not matched.

        Code: 703
        Message: Invalid token.        
        Headers:
            Content Type: application/json

#####  HTTP Status (803):
Database query error

        Code: 803
        Message: Database query error.        
        Headers:
            Content Type: application/json
        Response: 
            {
                "message" : "News validation failed: addedBy: Author is missing, datePublished: Published Date is missing, description: News Description is missing, client: Client is missing, updatedBy: Updation Author is missing"
            }


## Pending Tasks
1. Add Validation on minimum one subdocument required (Ex: Sections)
2. Get Logs Endpoint


# Dependency on Other Service
1. `Authentication` Service for token Validation


# Deployment
## Prerequisites
- node `^10.0`
- mongodb `^4.0`
- npm `^6.2.0`

## Dependent Environment Variables
- DB_URI
- PORT
- AUTH_URI
- NODE_ENV
- SERVICE_ID
- VERSION_ID

## Installation
    
1. Run: `npm install`
2. Run: `cp .env.production .env`
2. Run: `npm start`


## Verify Deployment
    EndPoint: <domain-name>/health
 
### Request
    Request Type: GET
    Headers:
        Content Type: "application/json"
        Authorization: "JWT Token"

### Basic Usage:

    $.ajax({
        url: <domain-name>/health,
        type: "GET",
        headers: {
            "Authorization":<JWT-token>
        },
        Content-Type:'application/json',
        success: function(response){},
        error:.function(response){}
    });

### Response:

        Code: 200
        Message: OK
        Result: 
            {
                "_id": "5b7fa7b7f3a9b24f1301dd60",
                "ipAddr": "::1",
                "date_added": "2018-08-24T06:37:43.938Z",
                "__v": 0
            }
        Headers:
            Content Type: application/json

# Access Logs  
