test("Primeiro teste", () => {
  const number = null;
  expect(number).toBeNull();
});

test("Trabalhando com objetos", () => {
  const obj = { name: "Larissa", idade: 25 };
  expect(obj).toHaveProperty("name");
});
