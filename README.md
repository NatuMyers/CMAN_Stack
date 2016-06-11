# CMAN_Stack 🛋🛋🛋🛋🛋
CouchDB+Materialize+Angular+Node.js

![alt tag](http://ashishware.com/images/CouchDB_illustration.png)
 
## COUCH = API + DB in one go.
 
var express = require('express')
var app = express()
app.use(express.static(__dirname))
app.listen(3000)

## Scafold dependencies
npm init; npm install express --save; npm install angular --save; npm install angular-route --save; npm install angular-resource --save; npm install angular-materialize --save

## Set Up App
npm install --save couchapp

## Install CouchDB if Needed
(On Mac):
brew install autoconf
brew install autoconf-archive
brew install automake
brew install libtool
brew install erlang
brew install icu4c
brew install spidermonkey
brew install curl; brew link icu4c; brew link erlang; brew install couchdb; brew install erlang --no-docs; brew install [--devel|--head] couchdb

## Run it as a Daemon

Running as a Daemon
You can use the launchctl command to control the CouchDB daemon.

You can load the configuration by running:

sudo launchctl load \
     /usr/local/Library/LaunchDaemons/org.apache.couchdb.plist
     
You can stop the CouchDB daemon by running:

sudo launchctl unload \
     /usr/local/Library/LaunchDaemons/org.apache.couchdb.plist
     
You can start CouchDB by running:

sudo launchctl start org.apache.couchdb

You can restart CouchDB by running:

sudo launchctl stop org.apache.couchdb

You can edit the launchd configuration by running:

open /usr/local/Library/LaunchDaemons/org.apache.couchdb.plist

To start the daemon on boot, copy the configuration file to:

/Library/LaunchDaemons


### Check out your API and Add data

couchdb & # start a CouchDB

http://127.0.0.1:5984/ Is a link to your API

curl -X PUT http://127.0.0.1:5984/emails # create the database emails


## Insert a Record

curl -X POST http://127.0.0.1:5984/expenses -H "Content-Type: application/json" -d '{"email": "foo@bar.com"}'


### Set up Clientside app (AngularJs)

## Config couchDB for that

Now if we try to connect to our database with angular, it’s going to throw a cross domain error. To get around this issue I need to enable CORS from CouchDB. If you are running Couch on the default port you can get to the config file by going to http://127.0.0.1:5984/_utils/config.html. Under the httpd section I will set ‘enable_cors’ to ‘true’, then I will ‘Add a new section’ and supply the following data

    section: cors
    option: origins
    value: *

In a production environment I would probably tie CORS down to whatever domains I expect to receive requests from, but we are building a prototype and not a production app. Now we're good to connect to angular.

In whatever directory you want to set up your public website, create an app.js file for your Angular App.

mkdir clientside
nano app.clientside.js


Now to integrate our email resource with Angular's MVC framework, you must add the resource that communicates to the api, then add emails it to "Factory" (M), then add a "Controller" (C), then add it to your html view (V).


M: paste this in your Angular app.js file:

    // add to my app.angular.js file
    
    //resource
    .factory('Emails', function($resource) {
     
        var Methods = {
                'getAll': {
                    'method':'GET',
                    'url':'http://localhost:5984/emails/_all_docs',
                    'params': {
                        'include_docs':true
                    },
                    'isArray':true,
                    'transformResponse':function(data) {
                        var returnOb = angular.fromJson(data);
                        return returnOb.rows;
                    }
              }
        };
     
        var Email = $resource('http://localhost:5984/emails/:id',{'id':'@id'},Methods);
        return Email;
    })
    
    /*
    This factory returns a resource object which will have all of the standard API methods I need to CRUD my beer object.
    One of the things to take note of is the the method I am adding ‘getAll’ which uses CouchDB’s built in _all_docs method
    to retrieve a listing of all beers. I also am setting the param ‘include_docs’ to true. This will tell CouchDB that I
    also want the documents along with each record, otherwise it will return just an array of the document IDs (not really
    useful for a listing page!)

    */
    
    .factory('Email', function() {
        return {
            '_id':null,
            'setId' : function() { 
                this._id = encodeURIComponent((this.brand + '_' + this.name).replace(' ', '_'));
            },
            'entries' : []
        };
    })

C: Now paste this:

    // add to my app.angular.js file
    routerApp.controller('EmailController', function($scope, Email) {
        Email.getAll(function(ob) {
            $scope.emails = ob;
        });
    })


V: emails.html should be a view that's wraped by index.html, so 

    nano emails.html

