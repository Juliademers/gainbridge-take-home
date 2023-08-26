import { test, expect } from '@playwright/test';

test.describe('DELETE book: ', () => {

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

  test.beforeAll(async ({ request }) => {
    // Adds required books and sets generated IDs in object

    // Book 1
    const firstRequest = await request.post(`/books`, {
      data: book1
    });
    expect(firstRequest.ok()).toBeTruthy();
    const firstResponse = await firstRequest.json()
    expect(firstResponse['body']).toEqual('Book added successfully.')
    book1['id'] = firstResponse['id']

    // Book 2
    const secondRequest = await request.post(`/books`, {
      data: book2
    });
    expect(secondRequest.ok()).toBeTruthy();
    const secondResponse = await secondRequest.json()
    expect(secondResponse['body']).toEqual('Book added successfully.')
    book2['id'] = secondResponse['id']
  });
  
  test.afterAll(async ({ request }) => {
    // Would verify the book1 & book2 were infact deleted
    // Would need to have another API call which can delete books w/ reviews
  });

  test('verifies deleting book w/o review', async ({ request }) => {
    const newRequest = await request.delete(`/books/${book1.id}`);
    
    // Expects 200 HTTP code
    expect(newRequest.ok()).toBeTruthy();
    const response = await newRequest.json()
    expect(response['body']).toEqual(`${book1.title} successfully deleted`)
  });

  test('verifies I cant delete book with review', async ({ request }) => {
    const newRequest = await request.delete(`/books/${book2.id}`);
    
    // Expects 400 HTTP code
    expect(newRequest.ok()).toBeTruthy();
    const response = await newRequest.json()
    expect(response['body']).toEqual(`Books with reviews cant be deleted`)
  });

  test('verifies required input parameter', async ({ request }) => {
    const newRequest = await request.delete(`/books/`);
    
    // Expects 400 HTTP code
    expect(newRequest.ok()).not.toBeTruthy();
    const response = await newRequest.json()
    expect(response['body']).toEqual(`Book ID is required`)
  });

  test('verifies non existant book', async ({ request }) => {
    const fakeId1 = 'weifuhewrifuhewr' // Ids must be numbers
    const fakeId2 = -1 // no negative Ids
    const fakeId3 = 10^900 // number too large

    const fakeIds = [fakeId1, fakeId2, fakeId3]

    for (let fake of fakeIds ) {
      const newRequest = await request.delete(`/books/`);
    
      // Expects 400 HTTP code
      expect(newRequest.ok()).not.toBeTruthy();
      const response = await newRequest.json()
      expect(response['body']).toEqual(`Book ID does not exist`)
    }
  });
})