import { fireEvent } from "@testing-library/vue";
import { renderWithVuetify } from "../utils";
import App from "@/App.vue";

test("renders a search input", async () => {
  // The renderWithVuetify method is a wrapper over the render testing-library function
  // returns a collection of utilities to query your component.
  const { getByRole, getByDisplayValue } = renderWithVuetify(App);

  // getByRole returns the first matching node for the provided role, and
  // throws an error if no elements match or if more than one match is found.
  const input = getByRole("searchbox");

  // Update our input element.
  await fireEvent.update(input, "search text");

  getByDisplayValue("search text");
});
