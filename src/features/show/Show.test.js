import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/store";
import { Show } from "./Show";

it("Link matches snapshot", () => {
  const view = render(
    <Provider store={store}>
      <Show />
    </Provider>
  );
  expect(view).toMatchSnapshot();
});
