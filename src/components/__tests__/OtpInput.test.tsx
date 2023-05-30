import { render, screen, fireEvent } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import OtpInput, { Props } from "../OtpInput";

describe("<OtpInput />", () => {
  const renderComponent = (props: Props) => render(<OtpInput {...props} />);

  /////////////////////////////////////////////////
  it("should accept value & valueLength props", () => {
    const value = faker.number.int({ min: 0, max: 99999999 }).toString();
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

  ////////////////////////////////////////////////////
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
      const digit = faker.number.int({ min: 0, max: 9 }).toString();

      fireEvent.change(input, { target: { value: digit } });

      let arry = [];
      for (let i = 0; i < valueLength; i++) {
        if (i == index) {
          arry.push(digit);
        } else {
          arry.push(" ");
        }
      }
      // Expectations
      if (arry[0] !== " ") {
        expect(onChange).toBeCalledTimes(1);
        expect(onChange).toBeCalledWith(arry.join(""));

        const inputFocused = inputElems[index + 1] || input;
        expect(inputFocused).toHaveFocus();
      } else {
        expect(onChange).not.toBeCalled();
      }

      onChange.mockReset();
    });
  });

  /////////////////////////////////////////////////
  it("should NOT allow typing of non-digits", () => {
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

    inputElems.forEach((input) => {
      const nondigit = faker.string.alpha();

      fireEvent.change(input, { target: { value: nondigit } });
      // Expectation
      expect(onChange).not.toBeCalled();

      onChange.mockReset();
    });
  });

  /////////////////////////////////////////////////////
  it("should allow deleting of digits (focus on previous element)", () => {
    const value = faker.number.int({ min: 10, max: 99999999 }).toString();
    const valueLength = value.length;
    const lastIndex = valueLength - 1;
    const onChange = jest.fn();

    // Render component to=> the testing virtual dom
    renderComponent({
      value,
      valueLength,
      onChange,
      onError: jest.fn(),
    });

    const inputElems = screen.queryAllByRole("textbox");

    for (let index = lastIndex; index > -1; index--) {
      const input = inputElems[index];
      const target = { value: "" };

      fireEvent.change(input, { target });
      fireEvent.keyDown(input, { target, key: "Backspace" });

      const valueArry = value.split("");
      valueArry[index] = " ";
      const expectedValue = valueArry.join("");

      // Expectations
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith(expectedValue);

      const inputFocused = inputElems[index - 1] || input;
      expect(inputFocused).toHaveFocus();

      onChange.mockReset();
    }
  });

  /////////////////////////////////////////////////////
  it("should allow deleting of digits (Disallow focus on previous element)", () => {
    const value = faker.number.int({ min: 10, max: 99999999 }).toString();
    const valueArry = value.split("");
    const valueLength = value.length;
    const lastIndex = valueLength - 1;
    const onChange = jest.fn();

    // Render component to=> the testing virtual dom
    renderComponent({
      value,
      valueLength,
      onChange,
      onError: jest.fn(),
    });

    const inputElems = screen.queryAllByRole("textbox");

    for (let index = lastIndex; index > 0; index--) {
      const input = inputElems[index];

      fireEvent.keyDown(input, {
        key: "Backspace",
        target: { value: valueArry[index] },
      });

      const prevInputElem = inputElems[index - 1];
      expect(prevInputElem).not.toHaveFocus();
    }
  });

  //////////////////////////////////////////////////
  it("should allow pasting of value (same or more than valueLength)", () => {
    const value = faker.number.int({ min: 99999999 }).toString();
    const valueLength = faker.number.int({ min: 2, max: 8 });
    const onChange = jest.fn();
    const onError = jest.fn();

    // Render component to=> the testing virtual dom
    renderComponent({
      value: "",
      valueLength,
      onChange,
      onError,
    });

    const inputElems = screen.queryAllByRole("textbox");
    const rand = faker.number.int({ min: 0, max: valueLength - 1 });
    const randInput = inputElems[rand];

    fireEvent.change(randInput, { target: { value } });

    // Expectations
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(value);

    expect(randInput).not.toHaveFocus();
  });

  //////////////////////////////////////////////////
  it("should not allow pasting of value less than valueLength", () => {
    const valueLength = faker.number.int({ min: 4, max: 8 });
    const onChange = jest.fn();
    const onError = jest.fn();

    let arry = [];
    for (let i = 0; i < valueLength - 2; i++) {
      let rand = faker.number.int({ min: 0, max: 9 });
      arry.push(rand);
    }

    let value = arry.join("");
    // Render component to=> the testing virtual dom
    renderComponent({
      value: "",
      valueLength,
      onChange,
      onError,
    });

    const inputElems = screen.queryAllByRole("textbox");
    const rand = faker.number.int({ min: 0, max: valueLength - 1 });
    const randInput = inputElems[rand];

    fireEvent.change(randInput, { target: { value } });
    // Expectations
    expect(onError).toBeCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(
      `What you pasted isn't ${valueLength} digits long`
    );
  });

  ////////////////////////////////////////////////////////
  it("should focus to next element on right/down key press", () => {
    // Render component to=> the testing virtual dom
    renderComponent({
      value: "",
      valueLength: faker.number.int({ min: 3, max: 8 }),
      onChange: jest.fn(),
      onError: jest.fn(),
    });

    const inputElems = screen.queryAllByRole("textbox");
    const firstInput = inputElems[0];

    fireEvent.keyDown(firstInput, { key: "ArrowRight" });
    expect(inputElems[1]).toHaveFocus();

    fireEvent.keyDown(inputElems[1], { key: "ArrowDown" });
    expect(inputElems[2]).toHaveFocus();
  });

  ////////////////////////////////////////////////////////
  it("should focus to next element on left/up key press", () => {
    // Render component to=> the testing virtual dom
    const valueLength = faker.number.int({ min: 3, max: 8 });
    renderComponent({
      value: "",
      valueLength,
      onChange: jest.fn(),
      onError: jest.fn(),
    });

    const inputElems = screen.queryAllByRole("textbox");
    const lastInput = inputElems[valueLength - 1];
    const secondToLast = inputElems[valueLength - 2];
    const thirdToLast = inputElems[valueLength - 3];

    fireEvent.keyDown(lastInput, { key: "ArrowLeft" });
    expect(secondToLast).toHaveFocus();

    fireEvent.keyDown(secondToLast, { key: "ArrowUp" });
    expect(thirdToLast).toHaveFocus();
  });
});
