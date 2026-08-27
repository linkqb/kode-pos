export const GET = () => new Response(JSON.stringify({ ok: true, service: 'kode-pos-pages' }), {
  headers: { 'content-type': 'application/json; charset=utf-8' },
});
