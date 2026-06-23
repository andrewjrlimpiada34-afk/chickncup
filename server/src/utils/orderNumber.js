export default function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-8);
  return `CNC-${timestamp}`;
}
