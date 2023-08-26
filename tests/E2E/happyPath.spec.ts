import { test, expect } from '@playwright/test';

const book1 = {
    title: 'Lessons in Chemistry',
    author: 'Bonnie Garmus', 
    genre: 'Literary fiction', 
}

const book2 = {
    title: 'A Darker Shade of Magic',
    author: 'V. E. Schwab', 
    genre: 'Fantasy',
    review: [
        {"rating": 4.5,
        "comment": "Love all of her books"
        }
    ] 
}


test.describe('E2E Add book w/out Review: ', () => {
  // Ensure tests run sequencially 
  // Add BeforeAll & AfterAll

  // These tests are meant to mimic a real users e2e flow.

  test('Adds book without review', async ({ request }) => {

  });

  test('verifies newly added book appears within genre + author search', async ({ request }) => {
  });

  test('verifies newly added book appears within author search', async ({ request }) => {
  });

  test('verifies newly added book appears within genre search', async ({ request }) => {
  });

  test('searches for book by id', async ({ request }) => {
  });

  test('deletes new book', async ({ request }) => {
  });

  test('verifies book has been deleted', async ({ request }) => {
    // verifies search by id 
    // verifies search by author 
    // verifies search by genre
  });

})

test.describe('E2E Add book w/ Review: ', () => {
    // Ensure tests run sequencially 
    // Add BeforeAll & AfterAll

    test('Verifies Book doesnt already exist', async ({ request }) => {
    });

    test('Adds book w/ review', async ({ request }) => {
    });
  
    test('searches book by author and genre', async ({ request }) => {
    });
  
    test('searches book by author', async ({ request }) => {
    });
  
    test('searches book by genre', async ({ request }) => {
    });
  
    test('searches book by ID', async ({ request }) => {
    });
  
    test('verifies cant delete', async ({ request }) => {
    });

    test('verifies book still appears w/ review', async ({ request }) => {
      // search by id
      // search by author
      // search by genre
    });

  })