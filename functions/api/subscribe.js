/**
 * AgentScope Landing Page API
 * Handles email subscriptions
 */

export async function onRequest(context) {
  const { request } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { email } = await request.json();

    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get D1 database from environment
    const db = context.env.DB;

    if (db) {
      // Insert into D1
      await db.prepare('INSERT INTO subscribers (email, created_at) VALUES (?, ?)').bind(email, new Date().toISOString()).run();
    } else {
      // Fallback: log to console (for local dev)
      console.log('New subscriber:', email);
    }

    return new Response(JSON.stringify({ success: true, message: 'Subscribed successfully!' }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
