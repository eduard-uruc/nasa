import { render, screen } from "@testing-library/react";
import { SearchForm } from "./SearchForm";
import { Provider } from "react-redux";
import store from "../../app/store";
describe("Search form component", () => {
  it("has disabled attribute", () => {
    const { getByText } = render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );
    expect(screen.getByText("Submit")).toHaveAttribute("disabled");
  });
});
