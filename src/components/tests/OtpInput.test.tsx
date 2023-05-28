import { render } from "@testing-library/react";
import OtpInput, { Props } from "../OtpInput";

describe("<OtpInput />", () => {
  const renderComponent = (props: Props) => render(<OtpInput {...props} />);

  it("should accept value & valueLength props", () => {});
});
