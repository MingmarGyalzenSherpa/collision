export function generateRandom(limit, decimal = true) {
  let num = (Math.random() * limit).toFixed(2);
  num = Number(num);
  if (decimal) return num;
  return Math.ceil(num);
}
