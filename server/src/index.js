import express from 'express';
import cassandra from 'cassandra-driver';

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
});

client
  .connect()
  .then(() => {
    console.log(
      'Connected to cluster with %d host(s): %j',
      client.hosts.length,
      client.hosts.keys(),
    );
    console.log('Keyspaces: %j', Object.keys(client.metadata.keyspaces));
    console.log('Shutting down');
    return client.shutdown();
  })
  .catch(err => {
    console.error('There was an error when connecting', err);
    return client.shutdown();
  });

const app = express();

app.get('/', (req, res) => res.send('Hello World!!!'));

app.listen(3002, () => console.log('Example app listening on port 3002!'));
