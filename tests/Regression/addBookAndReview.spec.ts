import { test, expect } from '@playwright/test';

// Could exporting these to a data folder if theyre reused between scripts
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

const capitalizedBook1 = {
  title: book1.title.toLowerCase,
  author: 'V. E. Schwab', 
  genre: 'Fantasy',
  review: [
      {"rating": 4.5,
      "comment": "Love all of her books"
      }
  ] 
}

test.beforeAll(async ({ request }) => {
  // Makes appropriate calls to verify books arent already in the DB
  
});

test.afterAll(async ({ request }) => {
  // Makes appropriate calls to verify books arent already in the DB
});

test.describe('POST new book & review', () => {
  test('Adds book without review', async ({ request }) => {
      const newRequest = await request.post(`/books`, {
        data: book1
      });

      expect(newRequest.ok()).toBeTruthy();

      const response = await newRequest.json()

      expect(response['body']).toEqual('Book added successfully.')
      expect(response['id']).not.toEqual(undefined)
  });

  test('Adds book with review', async ({ request }) => {
    const newRequest = await request.post(`/books`, {
      data: book2
    });

    // Verifies gets 200 & appropriate response 
    expect(newRequest.ok()).toBeTruthy();
    const response = await newRequest.json()

    expect(response['body']).toEqual('Book added successfully.')
    expect(response['id']).not.toEqual(undefined)
  });

  test('Verifies cant add multiple books at once', async ({ request }) => {
    const newRequest = await request.post(`/books`, {
      data: [book1, book2]
    });
    
    // Verifies gets 400 & client error response
    expect(newRequest.ok()).toBeFalsy();
    const response = await newRequest.json()

    expect(response['body']).not.toEqual('Book added successfully.')
    // Would specifically verify the expected error message
    // expect(response['body']).toEqual('data must be of type Object')
  }); 

  test('Verifies cant add duplicate book', async ({ request }) => {
    const newRequest = await request.post(`/books`, {
      data: book1
    });
    
    expect(newRequest.ok()).toBeFalsy();

    const response = await newRequest.json()
    expect(response['body']).not.toEqual('Book added successfully.')
    // Would specifically verify the expected error message
    // expect(response['body']).toEqual(`${book1[title]} already exists in DB`)
  });

  test('Verifies API is capitalization agnostic', async ({ request }) => {
    const newRequest = await request.post(`/books`, {
      data: capitalizedBook1
    });
    
    expect(newRequest.ok()).not.toBeTruthy();

    const response = await newRequest.json()
    expect(response['body']).not.toEqual('Book added successfully.')
    // Would specifically verify the expected error message
    // expect(response['body']).toEqual(`${book1[title]} already exists in DB`)
  });


  test('Verifies cant add book w/o author', async ({ request }) => {
    const newRequest = await request.post(`/books`, {
      data: {
        "title": "The Great Gatsby",
        "genre": "Novel",
      }
    });
    
    // Expect a 400 HTTP error 
    expect(newRequest.ok()).toBeFalsy();

    const response = await newRequest.json()
    expect(response['body']).not.toEqual('Book added successfully.')
    // Would specifically verify the expected error message
    // expect(response['body']).toEqual(`Missing required data`)
  });

  test('Verifies cant add book w/o title', async ({ request }) => {
    const newRequest = await request.post(`/books`, {
      data: {
        "author": "F. Scott Fitzgerald",
        "genre": "Novel",
      }
    });
    
    // Expect a 400 HTTP error 
    expect(newRequest.ok()).toBeFalsy();

    const response = await newRequest.json()
    expect(response['body']).not.toEqual('Book added successfully.')
    // Would specifically verify the expected error message
    // expect(response['body']).toEqual(`Missing required data`)
  });

  test('Verifies cant add book w/o genre', async ({ request }) => {
    const newRequest = await request.post(`/books`, {
      data: {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
      }
    });
    
    // Expect a 400 HTTP error 
    expect(newRequest.ok()).toBeFalsy();

    const response = await newRequest.json()
    expect(response['body']).not.toEqual('Book added successfully.')
    // Would specifically verify the expected error message
    // expect(response['body']).toEqual(`Missing required data`)
  });
})