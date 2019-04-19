# Version Utility 

This services maintains the version logging of all the entitites created.

    Service Id: MS-NDE-VERSION-0016
    Version ID: 004
    Technology Stack: Node, MongoDb, Express JS
    Owner: Abhishek Jain
    identifier: version

# Endpoints 
Following are the end points of this API

1. [Get Entities](#get-entities)  
2. [Get Entity Information](#get-entity-information)  
3. [Create Entity](#create-entity)
4. [Update Entity](#update-entity)
6. [Pending Tasks](#pending-tasks)
7. [Health Check](#verify-deployment)  
8. [Access Logs](#access-logs)


##  Get Entitties
    EndPoint: <domain-name>/entity
    Description: It lists all the active approved entities associated with application
 
### Request
    Request Type: GET
    Headers:
        Content Type: "application/json"
        Authorization: "JWT Token"
        x-api-key: "Application identifier or API Key"



### Basic Usage:

    $.ajax({
        url: <domain-name>/entity,
        type: "GET",
        headers: {
            "Authorization":<JWT-token>,
            "x-api-key":<application-indentifier>
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
                "addedBy": {
                    "id": "96969jbjnbkbkkbuyiyiykmnbnbmnb",
                    "name": "Krishna Yadav"
                },
                "isActive": true,
                "approvedVersion": {
                    "addedBy": {
                        "id": "96969jbjnbkbkkbuyiyiykmnbnbmnb",
                        "name": "Krishna Yadav"
                    },
                    "reviewedBy": {
                        "id": "96969jbjnbkbkkbuyiyiykmnbnbmnb",
                        "name": "Krishna Yadav"
                    },
                    "assets": [
                        {
                            "addedBy": {
                                "id": "96969jbjnbkbkkbuyiyiykmnbnbmnb",
                                "name": "Krishna Yadav"
                            },
                            "assets": [],
                            "_id": "5cb878e593a1c4116125413f",
                            "application": "45963453495784t348eidgdgisgfw394u0",
                            "entity": "5cb878cd93a1c4116125413c",
                            "data": {
                                "abhishek": "jain",
                                "organisation": "WNS"
                            },
                            "dateAdded": "2019-04-18T13:17:25.320Z",
                            "dateUpdated": "2019-04-18T13:17:25.320Z",
                            "__v": 0
                        },
                        {
                            "addedBy": {
                                "id": "96969jbjnbkbkkbuyiyiykmnbnbmnb",
                                "name": "Krishna Yadav"
                            },
                            "assets": [],
                            "_id": "5cb878e593a1c41161254140",
                            "application": "45963453495784t348eidgdgisgfw394u0",
                            "entity": "5cb878cd93a1c4116125413c",
                            "data": {
                                "test": "Fulfil"
                            },
                            "dateAdded": "2019-04-18T13:17:25.320Z",
                            "dateUpdated": "2019-04-18T13:17:25.320Z",
                            "__v": 0
                        }
                    ],
                    "_id": "5cb878e593a1c41161254141",
                    "application": "45963453495784t348eidgdgisgfw394u0",
                    "entity": "5cb878cd93a1c4116125413c",
                    "isDraft": false,
                    "isActive": true,
                    "status": "approve",
                    "dateAdded": "2019-04-18T13:17:25.324Z",
                    "dateUpdated": "2019-04-18T13:31:13.840Z",
                    "__v": 0,
                    "reviewedAt": "2019-04-18T13:31:13.834Z"
                },
                "_id": "5cb878cd93a1c4116125413c",
                "application": "45963453495784t348eidgdgisgfw394u0",
                "dateAdded": "2019-04-18T13:17:01.997Z",
                "updatedAt": "2019-04-18T13:31:13.845Z",
                "__v": 0,
                "head": "5cb878e593a1c41161254141"
            }
        ]
        Headers:
            Content Type: application/json


##  Get Entity Information
    EndPoint: <domain-name>/entity/<entity-id>
    Description: It provides the information of a particular entity associated with application.
 
### Request
    Request Type: GET
    Headers:
        Content Type: "application/json"
        Authorization: "JWT Token"
        x-api-key: "Application Identifier or API key"
    Input Parameters:
        entity-id: String (Required)

### Basic Usage:

    $.ajax({
        url: <domain-name>/asset/5cb878cd93a1c4116125413c,
        type: "GET",
        headers: {
            "Authorization":<JWT-token>,
            "x-api-key":<application-identifier>
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
        [
            {
                "addedBy": {
                    "id": "96969jbjnbkbkkbuyiyiykmnbnbmnb",
                    "name": "Krishna Yadav"
                },
                "isActive": true,
                "approvedVersion": {
                    "addedBy": {
                        "id": "96969jbjnbkbkkbuyiyiykmnbnbmnb",
                        "name": "Krishna Yadav"
                    },
                    "reviewedBy": {
                        "id": "96969jbjnbkbkkbuyiyiykmnbnbmnb",
                        "name": "Krishna Yadav"
                    },
                    "assets": [
                        {
                            "addedBy": {
                                "id": "96969jbjnbkbkkbuyiyiykmnbnbmnb",
                                "name": "Krishna Yadav"
                            },
                            "assets": [],
                            "_id": "5cb878e593a1c4116125413f",
                            "application": "45963453495784t348eidgdgisgfw394u0",
                            "entity": "5cb878cd93a1c4116125413c",
                            "data": {
                                "abhishek": "jain",
                                "organisation": "WNS"
                            },
                            "dateAdded": "2019-04-18T13:17:25.320Z",
                            "dateUpdated": "2019-04-18T13:17:25.320Z",
                            "__v": 0
                        },
                        {
                            "addedBy": {
                                "id": "96969jbjnbkbkkbuyiyiykmnbnbmnb",
                                "name": "Krishna Yadav"
                            },
                            "assets": [],
                            "_id": "5cb878e593a1c41161254140",
                            "application": "45963453495784t348eidgdgisgfw394u0",
                            "entity": "5cb878cd93a1c4116125413c",
                            "data": {
                                "test": "Fulfil"
                            },
                            "dateAdded": "2019-04-18T13:17:25.320Z",
                            "dateUpdated": "2019-04-18T13:17:25.320Z",
                            "__v": 0
                        }
                    ],
                    "_id": "5cb878e593a1c41161254141",
                    "application": "45963453495784t348eidgdgisgfw394u0",
                    "entity": "5cb878cd93a1c4116125413c",
                    "isDraft": false,
                    "isActive": true,
                    "status": "approve",
                    "dateAdded": "2019-04-18T13:17:25.324Z",
                    "dateUpdated": "2019-04-18T13:31:13.840Z",
                    "__v": 0,
                    "reviewedAt": "2019-04-18T13:31:13.834Z"
                },
                "_id": "5cb878cd93a1c4116125413c",
                "application": "45963453495784t348eidgdgisgfw394u0",
                "dateAdded": "2019-04-18T13:17:01.997Z",
                "updatedAt": "2019-04-18T13:31:13.845Z",
                "__v": 0,
                "head": "5cb878e593a1c41161254141"
            }
        ]
        Headers:
            Content Type: application/json


##  Create Entity
    EndPoint: <domain-name>/entity
 
### Request
    Request Type: POST
    Headers:
        Content Type: "application/json"
        Authorization: "JWT Token"
        x-api-key: "Application Identifier or API Key"
    Input Parameters:
        actionType: string (Required) : It can contains "save" and "draft" values only, "save" means to send for review 
        newSections: [
            Object {
                <content>   (Required)
            }
        ] (Required) To be used when there are new sections are added into the  entity

### Basic Usage:

    var data = {
        "newSections": [{
            "key1": "value1"
        },
        {
            "key2": "value2"
        },
        {
            "key3": "value3"
        }]
    }

    $.ajax({
        url: <domain-name>/entity,
        type: "POST",
        data: data,
        headers: {
            "Authorization":<JWT-token>,
            "x-api-key": Application Identifier or API Key
        },
        Content-Type:'application/json',
        success: function(response){},
        error: function(response){}
    });


### Response

#####  HTTP Status (201):
you will receive a json object which contains message "Sucessful"

        Code: 201 
        Message: "Created"
        Result: 
            {
                "message": "Successful",
            }
        Headers:
            Content Type: application/json

##  Update Entity
    EndPoint: <domain-name>/entity/<entity-id>
 
### Request
    Request Type: PUT
    Headers:
        Content Type: "application/json"
        Authorization: "JWT Token"
        x-api-key: "Application Identifier or API Key"
    Input Parameters:
        actionType: string (Required) : It can contains "save" and "draft" values only, "save" means to send for review 
        newSections: [
            Object {
                <content>   (Required)
            }
        ] (Required) To be used when there are new sections are added into the  entity
        sections: [
            Object {
                id: String (Required), // <version-id of the section>
                data: Object {
                    <content> 
                } (Optional) // data to stored with respective section
            }
        ]

### Basic Usage:

    var data = {
        "newSections": [{
            "key1": "value4"
        }],
        "sections: [{
            id: 5cb878e593a1c41161254140,
        }, {
            id: 5cb878e593a1c4116125413f,
            data: {
                "key5": "value10" 
            }  
        }]
    }

    $.ajax({
        url: <domain-name>/entity/5cb878cd93a1c4116125413c,
        type: "PUT",
        data: data,
        headers: {
            "Authorization":<JWT-token>,
            "x-api-key": Application Identifier or API Key
        },
        Content-Type:'application/json',
        success: function(response){},
        error: function(response){}
    });


### Response

#####  HTTP Status (201):
you will receive a json object which contains message "Sucessful"

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
