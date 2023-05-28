import { useMemo } from "react";
import { RE_DIGIT } from "@/utilities/digits_only";

export type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
  onError: (message: string) => void;
};

//////////////////////////////////////////////////////////////////////////////
export default function OtpInput({
  value,
  valueLength,
  onChange,
  onError,
}: Props) {
  const valueItems = useMemo(() => {
    // Construct array from value
    // Array should have length equal to valueLength
    // items in array should pass a regular expression test
    const valueArry = value.split("");
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArry[i];

      if (RE_DIGIT.test(char)) items.push(char);
      else items.push("");
    }

    return items;
  }, [value, valueLength]); // end of memo

  ///////////////////////////////////////
  function focusToNextElem(target: HTMLInputElement) {
    const nextElemSib = target.nextElementSibling as HTMLInputElement | null;
    if (nextElemSib) {
      nextElemSib.focus();
    }
  }

  function focusToPrevElem(target: HTMLInputElement) {
    const prevElemSib =
      target.previousElementSibling as HTMLInputElement | null;
    if (prevElemSib) {
      prevElemSib.focus();
    }
  }

  function handleInputOnChange(
    { target }: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);
    // If not a digit, do nothing
    if (!isTargetValueDigit && targetValue !== "") return;
    // else
    // redefine targeValue if its empty string
    targetValue = isTargetValueDigit ? targetValue : " ";

    if (targetValue.length === 1) {
      onError("");

      const newValue =
        value.substring(0, index) + targetValue + value.substring(index + 1);
      // Set new value
      onChange(newValue);
      // No need to focus to next input, when target value is empty string i.e when we are deleting
      if (!isTargetValueDigit) return;
      // change the focus of the inputs
      focusToNextElem(target);
    } else {
      // handle pasting of value more than 1 digits
      if (targetValue.length !== valueLength) {
        onError(`What you pasted isn't ${valueLength} digits long`);
      } else if (targetValue.length === valueLength) {
        onError("");

        onChange(targetValue);

        target.blur();
      }
    }
  }

  ///////////////////////////////////////
  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;

    // handle ArrowRight, ArrowLeft, ArrowUp ArrowDown
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      return focusToNextElem(target);
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevElem(target);
    }
    // Keep the selection range position
    target.setSelectionRange(0, target.value.length);
    // If e.key is not backspace or target.value is not empty, do nothing
    if (e.key !== "Backspace" || target.value !== "") return;
    // change the focus of the inputs
    focusToPrevElem(target);
  }

  ///////////////////////////////////////
  function handleOnFocus({ target }: React.FocusEvent<HTMLInputElement>) {
    target.setSelectionRange(0, target.value.length);
  }

  //////////////////////////////////////
  return (
    <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3">
      {valueItems.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          value={digit}
          onChange={(e) => handleInputOnChange(e, index)}
          onKeyDown={handleOnKeyDown}
          onFocus={handleOnFocus}
          className="h-[60px] w-[60px] rounded-md bg-gray-100 text-center text-4xl font-semibold text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-100"
        />
      ))}
    </div>
  );
}
