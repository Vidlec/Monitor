export default function() {
  return `id${Math.random()
    .toString(16)
    .slice(2)}`;
}
