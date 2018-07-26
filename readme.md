## Running

#### Development:

`npm run vendor` which creates `vendor.js` then `npm run dev` which build's everything else and serves it through Browsersync with hot reload.

#### Production

`npm run prod` build's everything and applies heavy compressions

# #Monitor

Premise:
Highly scalable monitoring aggregation service. Main focus is are micro-services. Each micro-service should be connected to RabbitMQ message queue. User should be able to turn them on and off independently.

User is provided with variety of gateways for receiving data from the network (SNMP, TCP, EIF, JMX etc…).

User has ability (is required) to write ::rules:: for certain situations.
Using rules, it is possible to /normalise/ data and store it in database in proper form for it to be displayed and manipulated upon.
Rules are written in nodejs compliant ::JavaScript::
User can use selected array of nodejs API methods like fetch and others.

::TODO - Client, databases::

---

## Main server

* Read Config
* Read Rules
* Connected to MQ
  _ Listen for Workers connection and store info about them (name, status etc..)
  _ Provide rules on demand
  _ Ability to send new rules to workers
  _ ??? Ability to start workers (would require some workers manager to handle start/stop of workers) ::Nice to have::
* Provide REST/GQL api for client apps. This should implement various endpoints including CRUD for Users, Alerts, Monitoring, Management, Authentication, etc…
* Should run special DB tasks like deleting old alerts etc… (using database worker)

---

## Gateways

* Should listen on unique port
* Read config || get config from the server. Prefer having config for each gateway separated localy.
* Connected to MQ (sending rules and db tasks)
* ??? Add node ::cluster mode:: to share one port between multiple children ::Nice to have::
* Should have mechanism for filtering incoming data and apply proper rules based on that data. Example: /If data contains some key name or request came from some specific IP dress use specific rules/
* After recieving processed rules, GW should be able to call database worker to perform operations upon database. These operations should be part of a database worker API and its up to gateway to implement whatever it wants. Generally gateway would want only to implement couple of methods like `saveAlert, deleteAlert`
* ??? ::Use GW instead if integrated endpoint on server:: this GW would need to implement many database worker methods, which would need to be added on the latter as well. This would then provide flexibility for the client and server management UI. Allowing it to be used with many different databases granted respective db connector exists for them. ::Nice to have::

---

## Workers

### Rules

TODO
