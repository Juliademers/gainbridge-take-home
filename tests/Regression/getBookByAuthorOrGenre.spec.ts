import { test, expect } from '@playwright/test';

const bookAuthor = 'Steven King'
const specificGenre = 'Literary Fiction'
const parentGenre = 'Fiction'

test.describe('GET filter by: ', () => {
  // No beforeAll or AfterAll required 

  test('Filtering by nothing returns all books', async ({ request }) => {
    const newRequest = await request.get(`/books?genre={}&author={}`);
    
    // Expects 200 HTTP code
    expect(newRequest.ok()).toBeTruthy();
    const response = await newRequest.json()
    // Would have seperate query to verify total book count matches respnse length
    const bookCount = await request.get('bookCount')
    expect(response['body'].length).toEqual(bookCount)
  });

  test('Can Filter only by Author', async ({ request }) => {
    const newRequest = await request.get(`/books?genre={}&author=${bookAuthor}`);
    
    // Expects 200 HTTP code
    expect(newRequest.ok()).toBeTruthy();
    const response = await newRequest.json()

    // Looping through all objects in the returned array
    for (let book of response) {
      expect(book.author).toEqual(bookAuthor)
    }
  });

  test('Can Filter only by Genre', async ({ request }) => {
    const newRequest = await request.get(`/books?genre=${specificGenre}&author={}`);
    
    // Expects 200 HTTP code
    expect(newRequest.ok()).toBeTruthy();
    const response = await newRequest.json()

    // Looping through all objects in the returned array
    for (let book of response) {
      expect(book.genre).toEqual(specificGenre)
    }
  });

  test('Can filter by Author and Genre', async ({ request }) => {
    const newRequest = await request.get(`/books?genre=${specificGenre}&author=${bookAuthor}`);
    
    // Expects 200 HTTP code
    expect(newRequest.ok()).toBeTruthy();
    const response = await newRequest.json()

    // Looping through all objects in the returned array
    for (let book of response) {
      expect(book.genre).toEqual(specificGenre)
      expect(book.author).toEqual(bookAuthor)
    }
  });


  test('Negative tests', async ({ request }) => {
    // Due to lack of time ill simply wright sudo code

    // expect filtering by non existant author returns empty array
    // expect filtering by non existant genre returns empty array
    // verify if we can filter by parent genres (ie Fiction => Literary Fiction & Historical Fiction)
  });
})