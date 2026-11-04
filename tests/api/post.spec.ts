import { test, expect } from '@playwright/test';
import { NEW_POST } from '../../test-data/posts';

test('API-001 - Get the list of posts', { tag: '@smoke' }, async ({ request }) => {
    // Steps
    const response = await request.get('/posts');

    // Expect
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(posts).toHaveLength(100);
});

test('API-002 - Get one post', { tag: '@regression' }, async ({ request }) => {
    // Steps
    const response = await request.get('/posts/1');

    // Expect
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post.title).toBeTruthy();
});

test('API-003 - Create a post', { tag: '@regression' }, async ({ request }) => {
    // Steps
    const response = await request.post('/posts', { data: NEW_POST });

    // Expect
    expect(response.status()).toBe(201);
    const post = await response.json();
    expect(post.id).toBeDefined();
    expect(post).toMatchObject(NEW_POST);
});

test('API-004 - Get a post that does not exist', { tag: '@regression' }, async ({ request }) => {
    // Steps
    const response = await request.get('/posts/9999');

    // Expect
    expect(response.status()).toBe(404);
});
