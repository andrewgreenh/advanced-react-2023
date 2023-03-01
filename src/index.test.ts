function add(a: number, b: number) {
  return a + b;
}

describe("index", () => {
  it("should show initial setup", () => {
    // arrange

    // act
    const actualResult = add(2, 5);
    // assert
    expect(actualResult).toBe(8);
  });
});

export {};
