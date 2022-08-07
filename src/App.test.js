import { render, screen, fireEvent, cleanup } from "@testing-library/react";
//LOCAL IMPORTS
import App from "./App";
import ChallengeForm from "./Components/App/challengeForm";
import ChallengeCard from "./Components/App/card";

afterEach(cleanup);

test("should render without crashing", () => {
  render(<App />);
});

test("renders welcome page", () => {
  render(<App />);
  const titleElement = screen.getByText(/Hack Ideas/i);
  expect(titleElement).toBeInTheDocument();
});

test("checking the login button", () => {
  render(<App />);
  const button = screen.getByText(/LOGIN/i);
  fireEvent.click(button);
});

test("renders new challenge form", () => {
  render(<ChallengeForm />);
  const titleElement = screen.getByText(/Add New Challenge/i);
  expect(titleElement).toBeInTheDocument();
});

const setupChallengeTitle = () => {
  const utils = render(<ChallengeForm />);
  const input = utils.getByTestId("challenge-title-input");
  return {
    input,
    ...utils,
  };
};

test("Title Text filed should take string as value", () => {
  const { input } = setupChallengeTitle();
  fireEvent.change(input, { target: { value: "hack ideas" } });
  expect(input.value).toBe("hack ideas");
});

const setupChallengeDesc = () => {
  const utils = render(<ChallengeForm />);
  const input = utils.getByTestId("challenge-desc-input");
  return {
    input,
    ...utils,
  };
};

test("Title Text filed should take string as value", () => {
  const { input } = setupChallengeDesc();
  fireEvent.change(input, { target: { value: "hack ideas description" } });
  expect(input.value).toBe("hack ideas description");
});

test("checking the Create Challenge button", () => {
  render(<ChallengeForm />);
  const button = screen.getByText(/CREATE/i);
  fireEvent.click(button);
});

describe("<ChallengeCard />", () => {
  let data;
  beforeEach(() => {
    data = {
      id: 1,
      title: "Develop a Creative Blog",
      description:
        "To build a creative blog, you would need to build a dynamic, smart website which would require you to have top-notch skills in using HTML, CSS, JavaScript, etc.",
      created_date: "2022-03-10T00:00:00.000Z",
      challenge_tags: [
        {
          title: "HTML",
          id: 3,
        },
      ],
      upvotes: 0,
    };
  });
  it("should initially render challenge card in landing page with data", () => {
    render(<ChallengeCard challenge={data} />);
  });
});
