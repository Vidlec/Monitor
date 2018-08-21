import getPort from 'get-port';

export default async port => {
  const assignedPort = await getPort({ port });
  const isPortTaken = port !== assignedPort;
  const message = isPortTaken
    ? `Port ${port} is already in use, listenenig on port ${assignedPort} instead`
    : `Listening in port ${port}`;

  return { port: assignedPort, message };
};
