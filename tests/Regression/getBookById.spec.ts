import { test, expect } from '@playwright/test';

const bookWith0review = 1
const bookWith1review = 2
const bookWith1000reviews = 4

const USER = 'github-username';

test.describe('GET reviews: ', () => {

  test('Verifies book with no reviews', async ({ request }) => {
    const newRequest = await request.get(`/books/${bookWith0review}`);
    
    // Expects 200 HTTP code
    expect(newRequest.ok()).toBeTruthy();
    const response = await newRequest.json()
    // Expects to receive empty string
    expect(response.review).toEqual([])
  });

  test('Verifies book with one review', async ({ request }) => {
    const newRequest = await request.get(`/books/${bookWith1review}`);
    
    // Expects 200 HTTP code
    expect(newRequest.ok()).toBeTruthy();
    const response = await newRequest.json()
    // Expects to receive empty string
    expect(response.review.length).toEqual(1)
    // could also iterate through all the reviews and verify they all include ratings & comments
  });

  test('Verifies book with many reviews', async ({ request }) => {
    const newRequest = await request.get(`/books/${bookWith1000reviews}`);
    
    // Expects 200 HTTP code
    expect(newRequest.ok()).toBeTruthy();
    const response = await newRequest.json()
    // Expects to receive empty string
    expect(response.review.length).toEqual(100)
    // could also verify at what point are reviews paginated or trimmed if applicable
  });

  test('Negative tests', async ({ request }) => {
    // Due to lack of time ill simply wright sudo code

    // expect entering no id will cause error for required field
    // expect entering invalid id (letters, symbols or negatives)will cause error for required field
  });
})
