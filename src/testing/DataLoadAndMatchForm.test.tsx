import '@testing-library/jest-dom';
import { describe, expect, it } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithBrowserRouter } from "./setup/renderFunctions";
import DataLoadAndMatchForm from "@/components/DataLoadAndMatchForm";

describe("Render test", () => {
  it("Render test", () => {
    renderWithBrowserRouter(<DataLoadAndMatchForm />);

    // const title = screen.getByText(/Step 1/);
    // expect(title).toBeInTheDocument();
  });
  // it('renders mock data', async () => {

  //     renderWithQueryClientMemoryRouter(
  //       <AdminCategory />,
  //       '/api/product/cat/count/12345',
  //       '/api/product/cat/count/:id'
  //     )

  //     await waitFor(() => {
  //       const product = screen.getByText(/Creator Expert 10280 Flower Bouquet/)
  //       expect(product).toBeInTheDocument()
  //     })
  // })
  // it('server error 400', async () => {

  //     renderWithQueryClientMemoryRouter(
  //       <AdminCategory />,
  //       '/api/product/cat/count/sadcase',
  //       '/api/product/cat/count/:id'
  //     )

  //     await waitFor(() => {
  //       const message = screen.getByText(/Server error/)
  //       expect(message).toBeInTheDocument()
  //     })
  // })
});