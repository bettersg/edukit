import { rest } from 'msw';

const handlers = [
  rest.get('http://localhost:3000', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ text: 'Hello world!' }));
  }),
];

export { handlers };
