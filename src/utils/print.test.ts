import { print } from "./print";
import { fp } from "./fp";

it("should print on all configurations", () => {
  const consoleLogSpy = jest
    .spyOn(global.console, "log")
    .mockImplementation(fp.identity);

  fp.values(print).forEach((fn, i) => {
    const message = "message in a bottle";
    fn(message);
    expect(consoleLogSpy.mock.calls[i][0]).toContain(message);
  });

  consoleLogSpy.mockRestore();
});
