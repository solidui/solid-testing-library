import { createSignal, catchError } from "solid-js";
import { render } from "..";
import { Routes, Route, useParams } from "@solidjs/router";

describe("location option", () => {
  const App = () => (
    <Routes>
      <Route path="/ids/:id" component={() => <p>Id: {useParams()?.id}</p>} />
      <Route path="/" component={() => <p>Start</p>} />
    </Routes>
  );

  it("can render the main route", () => {
    const { getByText } = render(() => <App />, { location: "/" });
    expect(getByText("Start")).not.toBeFalsy();
  });

  it("can render a route with the id", async () => {
    const { findByText } = render(() => <App />, { location: "/ids/1234" });
    expect(await findByText("Id: 1234")).not.toBeFalsy();
  });

  it("does not use a router without the location option", async () => {
    const NoRouter = () => {
      const [state, setState] = createSignal("loading");
      catchError(
        () => {
          useParams();
          setState("router present");
        },
        () => setState("no router present")
      );
      return <p>{state()}</p>;
    };
    const { findByText } = render(() => <NoRouter />);
    expect(await findByText("no router present")).not.toBeFalsy();
  });
});

