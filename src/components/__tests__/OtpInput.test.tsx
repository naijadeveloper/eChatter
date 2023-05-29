import { render, screen, fireEvent } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import OtpInput, { Props } from "../OtpInput";

describe("<OtpInput />", () => {
  const renderComponent = (props: Props) => render(<OtpInput {...props} />);

  it("should accept value & valueLength props", () => {
    const value = faker.number.int({ min: 0, max: 30 }).toString();
    const valueArry = value.split("");
    const valueLength = value.length;

    // Render component to=> the testing virtual dom
    renderComponent({
      value,
      valueLength,
      onChange: jest.fn(),
      onError: jest.fn(),
    });

    //1) Get all inputs on screen of testing dom
    const inputElems = screen.queryAllByRole("textbox");
    // Expectation
    expect(inputElems).toHaveLength(valueLength);

    //2) Loop through input elements
    inputElems.forEach((input, index) => {
      // Expectation
      expect(input).toHaveValue(valueArry[index]);
    });
  });

  it("should allow typing of digits", () => {
    const valueLength = faker.number.int({ min: 2, max: 8 });
    const onChange = jest.fn();

    // Render component to=> the testing virtual dom
    renderComponent({
      value: "",
      valueLength,
      onChange,
      onError: jest.fn(),
    });

    const inputElems = screen.queryAllByRole("textbox");
    inputElems.forEach((input, index) => {
      const digit = faker.number.int({ min: 0, max: 9 });

      fireEvent.change(input, { target: { value: digit } });
      // Expectations
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith(digit);
    });
  });
});
