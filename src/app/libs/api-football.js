const API_KEY = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_FOOTBALL_BASE;

export async function getLiveMatches() {
  try {
    const response = await fetch(`${BASE_URL}/fixtures?live=all`, {
      headers: {
        'x-apisports-key': API_KEY,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return null;
  }
}

export async function getMatchDetails(fixtureId) {
  try {
    const response = await fetch(`${BASE_URL}/fixtures/statistics?fixture=${fixtureId}`, {
      headers: { 'x-apisports-key': API_KEY },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching match details:', error);
    return null;
  }
}
